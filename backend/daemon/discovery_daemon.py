import ipaddress
import logging
import os
import time
import arpreq

from icmplib import ping, SocketPermissionError
from nmap import nmap, PortScannerTimeout
from scapy.layers.l2 import getmacbyip

logger = logging.getLogger(__name__)


def discovery_scan(addr_range: str, progress_callback=None, progress_interval=5):
    # must be in this format: 192.168.0.0/24
    network = ipaddress.ip_network(addr_range, strict=False)
    hosts = network.hosts()
    hosts_count = network.num_addresses - 2

    results = []
    progress = 0
    last_progress_time = 0
    try:
        for host in hosts:
            ip_addr = str(host)
            if progress_callback and time.time() - last_progress_time > progress_interval:
                progress_callback(round(progress / hosts_count * 100, 2))
                last_progress_time = time.time()
            logger.info("Checking ip: " + ip_addr)

            response = ping(ip_addr, count=1, timeout=1.5)

            if response.is_alive:
                mac_addr = _get_mac_addr(ip_addr) or _nmap_scan_mac(ip_addr)

                if mac_addr is not None:
                    results.append(
                        {
                            'ip': ip_addr,
                            'mac': mac_addr
                        }
                    )

            progress += 1
    except SocketPermissionError as e:
        raise DiscoveryError("Discovery failed: " + str(e))

    return results


def _get_mac_addr(ip: str):
    if os.environ['SPOOF_MAC_ADDRESSES']:
        logger.info("Spoofing MAC addresses is enabled, skipping MAC address discovery for " + ip)
        mac = ip.replace(".", "")
        mac = mac.ljust(12, "f")
        mac = ":".join(mac[i:i+2] for i in range(0, len(mac), 2))
        logger.info("Spoofed MAC address: " + mac)
        return mac

    mac = getmacbyip(ip)
    if mac != "ff:ff:ff:ff:ff:ff":
        return mac
    mac = arpreq.arpreq(ip)
    if mac != "ff:ff:ff:ff:ff:ff":
        return mac
    return None


def _nmap_scan_mac(ip: str):
    nm = nmap.PortScanner()
    try:
        scan = nm.scan(ip, arguments="-Pn", timeout=20)
    except PortScannerTimeout:
        return None

    if int(scan['nmap']['scanstats']['uphosts']) == 0:
        return None

    try:
        result = list(list(scan['scan'].values())[0]['vendor'].items())
    except Exception as e:
        print(e)
        print(scan)
        return None
    return result[0][0]


def _get_vendor(mac: str):
    if mac is None:
        return None
    mac = mac[:8]
    mac = mac.replace(":", "")
    with open("/usr/share/nmap/nmap-mac-prefixes") as f:
        for line in f:
            if mac in line:
                return line.split(" ")[1].replace("\n", "")


class DiscoveryError(Exception):
    pass


if __name__ == "__main__":
    result = discovery_scan("192.168.0.1/24", progress_callback=lambda x: print("Progress: ", x, "%", sep=""))
    for host in result:
        print(host)
    print("Up hosts:", len(result))
