import ipaddress

from icmplib import ping, SocketPermissionError


def scan(range: str):
    # must be in this format: 192.168.0.0/24
    hosts = ipaddress.ip_network(range, strict=False).hosts()

    results = []

    try:
        for host in hosts:
            host_str = str(host)

            print("Scanning: ", host_str, end=" ")

            response = ping(host_str, count=1, timeout=0.5)

            print("Alive: ", response.is_alive)
            if response.is_alive:
                results.append(host_str)
    except SocketPermissionError as e:
        raise DiscoveryError("Discovery failed: " + str(e))

    return results


class DiscoveryError(Exception):
    pass


if __name__ == "__main__":
    results = scan("192.168.0.1/24")
    print(results)
    print("Up hosts:", len(results))
