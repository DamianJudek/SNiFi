import netifaces


def get_default_gateway_ip():
    return netifaces.gateways()['default'][netifaces.AF_INET][0]
