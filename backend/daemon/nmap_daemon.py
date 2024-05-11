import ipaddress
import socket

import netifaces
from nmap import nmap


def subnet_quickscan():
    default_gateway = netifaces.gateways()['default']
    default_gateway_ip = default_gateway[netifaces.AF_INET][0]
    ip_range = f'192.168.0.1/24'

    nm = nmap.PortScanner()
    return nm.scan(ip_range, arguments="-sn")#, sudo=True)


if __name__ == "__main__":
    print("Scanning for hosts...")
    print(subnet_quickscan())
    print("Scan complete")
