import os

import netifaces


def get_default_gateway_ip():
    if os.environ['SPOOF_GATEWAY_IP']:
        return os.environ['SPOOF_GATEWAY_IP']
    try:
        return netifaces.gateways()['default'][netifaces.AF_INET][0]
    except KeyError:
        return netifaces.gateways()[netifaces.AF_INET][0][0]


if __name__ == '__main__':
    print(get_default_gateway_ip())
