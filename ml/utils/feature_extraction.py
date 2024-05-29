import dpkt
import time
import pandas as pd
import json
from scapy.all import *
from tqdm import tqdm

from utils.communication_features import Communication_wifi, Communication_zigbee
from utils.connectivity_features import Connectivity_features_basic, Connectivity_features_time, Connectivity_features_flags_bytes
from utils.dynamic_features import Dynamic_features
from utils.layered_features import L3, L4, L2, L1
from utils.supporting_functions import get_protocol_name, get_flow_info, get_flag_values, compare_flow_flags, get_src_dst_packets, calculate_incoming_connections, calculate_packets_counts_per_ips_proto, calculate_packets_count_per_ports_proto


iana_map = { 
    "0": "HOPOPT", "1": "ICMP", "2": "IGMP", "3": "GGP", "4": "IPv4", "5": "ST", 
    "6": "TCP", "7": "CBT", "8": "EGP", "9": "IGP", "10": "BBN-RCC-MON", "11": "NVP-II", 
    "12": "PUP", "13": "ARGUS (deprecated)", "14": "EMCON", "15": "XNET", "16": "CHAOS", 
    "17": "UDP", "18": "MUX", "19": "DCN-MEAS", "20": "HMP", "21": "PRM", "22": "XNS-IDP", 
    "23": "TRUNK-1", "24": "TRUNK-2", "25": "LEAF-1", "26": "LEAF-2", "27": "RDP", 
    "28": "IRTP", "29": "ISO-TP4", "30": "NETBLT", "31": "MFE-NSP", "32": "MERIT-INP", 
    "33": "DCCP", "34": "3PC", "35": "IDPR", "36": "XTP", "37": "DDP", "38": "IDPR-CMTP", 
    "39": "TP++", "40": "IL", "41": "IPv6", "42": "SDRP", "43": "IPv6-Route", 
    "44": "IPv6-Frag", "45": "IDRP", "46": "RSVP", "47": "GRE", "48": "DSR", "49": "BNA", 
    "50": "ESP", "51": "AH", "52": "I-NLSP", "53": "SWIPE (deprecated)", "54": "NARP", 
    "55": "MOBILE", "56": "TLSP", "57": "SKIP", "58": "IPv6-ICMP", "59": "IPv6-NoNxt", 
    "60": "IPv6-Opts", "62": "CFTP", "64": "SAT-EXPAK", "65": "KRYPTOLAN", "66": "RVD", 
    "67": "IPPC", "69": "SAT-MON", "70": "VISA", "71": "IPCV", "72": "CPNX", "73": "CPHB", 
    "74": "WSN", "75": "PVP", "76": "BR-SAT-MON", "77": "SUN-ND", "78": "WB-MON", 
    "79": "WB-EXPAK", "80": "ISO-IP", "81": "VMTP", "82": "SECURE-VMTP", "83": "VINES", 
    "84": "IPTM", "85": "NSFNET-IGP", "86": "DGP", "87": "TCF", "88": "EIGRP", 
    "89": "OSPFIGP", "90": "Sprite-RPC", "91": "LARP", "92": "MTP", "93": "AX.25", 
    "94": "IPIP", "95": "MICP (deprecated)","96": "SCC-SP", "97": "ETHERIP", "98": "ENCAP", 
    "100": "GMTP", "101": "IFMP", "102": "PNNI", "103": "PIM", "104": "ARIS", "105": "SCPS", 
    "106": "QNX", "107": "A/N", "108": "IPComp", "109": "SNP", "110": "Compaq-Peer", 
    "111": "IPX-in-IP", "112": "VRRP", "113": "PGM", "114": "", "115": "L2TP", "116": "DDX",  
    "117": "IATP", "118": "STP", "119": "SRP", "120": "UTI", "121": "SMP", 
    "122": "SM (deprecated)", "123": "PTP","124": "ISIS over IPv4", "125": "FIRE", 
    "126": "CRTP", "127": "CRUDP", "128": "SSCOPMCE", "129": "IPLT", "130": "SPS", 
    "131": "PIPE", "132": "SCTP",  "133": "FC", "134": "RSVP-E2E-IGNORE", 
    "135": "Mobility Header", "136": "UDPLite", "137": "MPLS-in-IP", "138": "manet", 
    "139": "HIP", "140": "Shim6", "141": "WESP", "142": "ROHC", "143": "Ethernet", 
    "144": "AGGFRAG", "145": "NSH"
}

class Feature_extraction():
    columns = [
        "flow_duration", "Header_Length", "Protocol Type", "Duration", "Rate", "Srate", "Drate",
        "fin_flag_number", "syn_flag_number", "rst_flag_number", "psh_flag_number", "ack_flag_number",
        "ece_flag_number", "cwr_flag_number", "ack_count", "syn_count", "fin_count", "urg_count", "rst_count",
        "HTTP", "HTTPS", "DNS", "Telnet", "SMTP", "SSH", "IRC", "TCP", "UDP", "DHCP", "ARP", "ICMP", "IPv", "LLC",
        "Tot sum", "Min", "Max", "AVG", "Std", "Tot size", "IAT", "Number", "Magnitue", "Radius", "Covariance", "Variance", "Weight"
    ]

    def pcap_evaluation(self, pcap_file, csv_file_name):
        global ethsize, src_ports, dst_ports, src_ips, dst_ips, ips , tcpflows, udpflows, src_packet_count, dst_packet_count, src_ip_byte, dst_ip_byte
        global protcols_count, tcp_flow_flgs, incoming_packets_src, incoming_packets_dst, packets_per_protocol, average_per_proto_src
        global average_per_proto_dst, average_per_proto_src_port, average_per_proto_dst_port

        base_row = {c:[] for c in self.columns}
        start = time.time()

        ethsize = []
        src_ports = {}  # saving the number of source port used
        dst_ports = {}  # saving the number of destination port used
        tcpflows = {}  # saving the whole tcpflows
        udpflows = {}  # saving the whole udpflows
        src_packet_count = {}  # saving the number of packets per source IP
        dst_packet_count = {}  # saving the number of packets per destination IP
        dst_port_packet_count = {}  # saving the number of packets per destination port
        src_ip_byte, dst_ip_byte = {}, {}
        tcp_flow_flags = {}  # saving the number of flags for each flow
        packets_per_protocol = {}   # saving the number of packets per protocol
        average_per_proto_src = {}  # saving the number of packets per protocol and src_ip
        average_per_proto_dst = {}  # saving the number of packets per protocol and dst_ip
        average_per_proto_src_port, average_per_proto_dst_port = {}, {}    # saving the number of packets per protocol and src_port and dst_port
        ips = set()  # saving unique IPs
        number_of_packets_per_trabsaction = 0  # saving the number of packets per transaction
        rate, srate, drate = 0, 0, 0
        max_duration, min_duration, sum_duration, average_duration, std_duration = 0, 0, 0, 0, 0   # duration-related features of aggerated records
        total_du = 0
        first_pac_time = 0
        last_pac_time = 0
        incoming_pack = []
        outgoing_pack = []

        f = open(pcap_file, 'rb')
        pcap = dpkt.pcap.Reader(f)
        ## Using SCAPY for Zigbee and Bluetooth ##
        scapy_pak = rdpcap(pcap_file)
        count = 0  # counting the packets
        count_rows = 0

        for ts, buf in pcap:
            if type(scapy_pak[count]) == scapy.layers.bluetooth:
                pass
            elif type(scapy_pak[count]) == scapy.layers.zigbee.ZigbeeNWKCommandPayload:
                zigbee = Communication_zigbee(scapy_pak[count])

            try:
                eth = dpkt.ethernet.Ethernet(buf)
                count += 1
            except:
                count += 1
                continue  # If packet format is not readable by dpkt, discard the packet

            ethernet_frame_size = len(eth)
            ethernet_frame_type = eth.type
            total_du += ts

            # Initialization #
            src_port, src_ip, dst_port, duration = 0, 0, 0, 0
            dst_ip, proto_type, protocol_name = 0, 0, ""
            flow_duration, flow_byte = 0, 0
            src_byte_count, dst_byte_count = 0, 0
            src_pkts, dst_pkts = 0, 0
            connection_status = 0
            number = 0
            IAT = 0
            src_to_dst_pkt, dst_to_src_pkt = 0, 0  # count of packets from src to des and vice-versa
            src_to_dst_byte, dst_to_src_byte = 0, 0  # Total bytes of packets from src to dst and vice-versa
            # Flags
            flag_values = []  # numerical values of packet(TCP) flags
            ack_count, syn_count, fin_count, urg_count, rst_count = 0, 0, 0, 0, 0
            # Layered flags
            udp, tcp, http, https, arp, smtp, irc, ssh, dns, ipv, icmp, igmp, mqtt, coap = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            telnet, dhcp, llc, mac, rarp = 0, 0, 0, 0, 0
            sum_packets, min_packets, max_packets, mean_packets, std_packets = 0, 0, 0, 0, 0
            magnite, radius, correlation, covariance, var_ratio, weight = 0, 0, 0, 0, 0, 0
            idle_time, active_time = 0, 0
            type_info, sub_type_info, ds_status, src_mac, dst_mac, sequence, pack_id, fragments, wifi_dur = 0, 0, 0, 0, 0, 0, 0, 0, 0

            if eth.type == dpkt.ethernet.ETH_TYPE_IP or eth.type == dpkt.ethernet.ETH_TYPE_ARP:
                ethsize.append(ethernet_frame_size)
                srcs = {}
                dsts = {}

                if len(ethsize) % 20 == 0:
                    dy = Dynamic_features()    # Dynamic_features based on size of packets
                    sum_packets, min_packets, max_packets, mean_packets, std_packets = dy.dynamic_calculation(ethsize)
                    magnite, radius, correlation, covariance, var_ratio, weight = dy.dynamic_two_streams(incoming_pack, outgoing_pack)

                    ethsize = []
                    srcs = {}
                    dsts = []
                    incoming_pack = []
                    outgoing_pack = []
                    first_pac_time = 0
                    last_pac_time = ts
                    IAT = last_pac_time - first_pac_time
                    first_pac_time = last_pac_time

                else:
                    dy = Dynamic_features()
                    sum_packets, min_packets, max_packets, mean_packets, std_packets = dy.dynamic_calculation(ethsize)
                    last_pac_time = ts
                    IAT = last_pac_time - first_pac_time
                    first_pac_time = last_pac_time

                    con_basic = Connectivity_features_basic(eth.data)
                    dst = con_basic.get_destination_ip()
                    src = con_basic.get_destination_ip()

                    if src in dsts:
                        outgoing_pack.append(ethernet_frame_size)
                    else:
                        dsts[src] = 1
                        outgoing_pack.append(ethernet_frame_size)

                    if dst in srcs:
                        incoming_pack.append(ethernet_frame_size)
                    else:
                        srcs[dst] = 1
                        incoming_pack.append(ethernet_frame_size)

                    magnite, radius, correlation, covariance, var_ratio, weight = dy.dynamic_two_streams(incoming_pack, outgoing_pack)

                if eth.type == dpkt.ethernet.ETH_TYPE_IP:     # IP packets
                    ipv = 1
                    ip = eth.data
                    con_basic = Connectivity_features_basic(ip)

                    # Dynamic_packets
                    dy = Dynamic_features()

                    # Connectivity_basic_features
                    src_ip = con_basic.get_source_ip()
                    proto_type = con_basic.get_protocol_type()
                    dst_ip = con_basic.get_destination_ip()

                    ips.add(dst_ip)
                    ips.add(src_ip)

                    # Connectivity_time_features
                    con_time = Connectivity_features_time(ip)
                    duration = con_time.duration()
                    potential_packet = ip.data

                    # Connectivity_features_flags_bytes
                    conn_flags_bytes = Connectivity_features_flags_bytes(ip)
                    src_byte_count, dst_byte_count = conn_flags_bytes.count(src_ip_byte, dst_ip_byte)

                    # L_three_layered_features
                    l_three = L3(potential_packet)
                    udp = l_three.udp()
                    tcp = l_three.tcp()

                    protocol_name = get_protocol_name(proto_type)
                    if protocol_name in iana_map:
                        protocol_name = iana_map[protocol_name]

                    if protocol_name == "ICMP":
                        icmp = 1
                    elif protocol_name == "IGMP":
                        igmp = 1

                    # L1_features
                    l_one = L1(potential_packet)
                    llc = l_one.LLC()
                    mac = l_one.MAC()

                    # Extra features of Bot-IoT and Ton-IoT
                    # Average rate features
                    calculate_packets_counts_per_ips_proto(average_per_proto_src, protocol_name, src_ip, average_per_proto_dst, dst_ip)
                    calculate_packets_count_per_ports_proto(average_per_proto_src_port, average_per_proto_dst_port, protocol_name, src_port, dst_port)

                    if src_ip not in src_packet_count.keys():
                        src_packet_count[src_ip] = 1
                    else:
                        src_packet_count[src_ip] = src_packet_count[src_ip] + 1

                    if dst_ip not in dst_packet_count.keys():
                        dst_packet_count[dst_ip] = 1
                    else:
                        dst_packet_count[dst_ip] = dst_packet_count[dst_ip] + 1

                    src_pkts, dst_pkts = src_packet_count[src_ip], dst_packet_count[dst_ip]
                    l_four_both = L4(src_port, dst_port)
                    coap = l_four_both.coap()
                    smtp = l_four_both.smtp()

                    # Features related to UDP
                    if type(potential_packet) == dpkt.udp.UDP:
                        src_port = con_basic.get_source_port()
                        dst_port = con_basic.get_destination_port()
                        l_four = L4(src_port, dst_port)
                        l_two = L2(src_port, dst_port)
                        dhcp = l_two.dhcp()
                        dns = l_four.dns()

                        if dst_port in dst_port_packet_count.keys():
                            dst_packet_count[dst_port] = dst_port_packet_count[dst_port] + 1
                        else:
                            dst_packet_count[dst_port] = 1

                        flow = sorted([(src_ip, src_port), (dst_ip, dst_port)])
                        flow = (flow[0], flow[1])
                        flow_data = {
                            'byte_count': len(eth),
                            'ts': ts
                        }

                        if udpflows.get(flow):
                            udpflows[flow].append(flow_data)
                        else:
                            udpflows[flow] = [flow_data]

                        packets = udpflows[flow]
                        number_of_packets_per_trabsaction = len(packets)
                        flow_byte, flow_duration, max_duration, min_duration, sum_duration, average_duration, std_duration, idle_time, active_time = get_flow_info(udpflows, flow)
                        src_to_dst_pkt, dst_to_src_pkt, src_to_dst_byte, dst_to_src_byte = get_src_dst_packets(udpflows, flow)

                    # Features related to TCP
                    elif type(potential_packet) == dpkt.tcp.TCP:
                        src_port = con_basic.get_source_port()
                        dst_port = con_basic.get_destination_port()

                        if dst_port in dst_port_packet_count.keys():
                            dst_packet_count[dst_port] = dst_port_packet_count[dst_port] + 1
                        else:
                            dst_packet_count[dst_port] = 1

                        flag_values = get_flag_values(ip.data)
                        l_four = L4(src_port, dst_port)
                        http = l_four.http()
                        https = l_four.https()
                        ssh = l_four.ssh()
                        irc = l_four.IRC()
                        smtp = l_four.smtp()
                        mqtt = l_four.mqtt()
                        telnet = l_four.telnet()

                        try:
                            http_info = dpkt.http.Response(ip.data)
                            connection_status = http_info.status
                        except:
                            connection_status = 0

                        flow = sorted([(src_ip, src_port), (dst_ip, dst_port)])
                        flow = (flow[0], flow[1])
                        flow_data = {
                            'byte_count': len(eth),
                            'ts': ts
                        }

                        if tcpflows.get(flow):
                            tcpflows[flow].append(flow_data)
                            ack_count, syn_count, fin_count, urg_count, rst_count = tcp_flow_flags[flow]
                            ack_count, syn_count, fin_count, urg_count, rst_count = compare_flow_flags(flag_values, ack_count, syn_count, fin_count, urg_count, rst_count)
                            tcp_flow_flags[flow] = [ack_count, syn_count, fin_count, urg_count, rst_count]
                        else:
                            tcpflows[flow] = [flow_data]
                            ack_count, syn_count, fin_count, urg_count, rst_count = compare_flow_flags(flag_values, ack_count, syn_count, fin_count, urg_count, rst_count)
                            tcp_flow_flags[flow] = [ack_count, syn_count, fin_count, urg_count, rst_count]

                        packets = tcpflows[flow]
                        number_of_packets_per_trabsaction = len(packets)
                        flow_byte, flow_duration, max_duration, min_duration, sum_duration, average_duration, std_duration, idle_time, active_time = get_flow_info(tcpflows, flow)
                        src_to_dst_pkt, dst_to_src_pkt, src_to_dst_byte, dst_to_src_byte = get_src_dst_packets(tcpflows, flow)

                    if flow_duration != 0:
                        rate = number_of_packets_per_trabsaction / flow_duration
                        srate = src_to_dst_pkt / flow_duration
                        drate = dst_to_src_pkt / flow_duration

                    if dst_port_packet_count.get(dst_port):
                        dst_port_packet_count[dst_port] = dst_port_packet_count[dst_port] + 1
                    else:
                        dst_port_packet_count[dst_port] = 1

                elif eth.type == dpkt.ethernet.ETH_TYPE_ARP:   # ARP packets
                    protocol_name = "ARP"
                    arp = 1

                    if packets_per_protocol.get(protocol_name):
                        packets_per_protocol[protocol_name] = packets_per_protocol[protocol_name] + 1
                    else:
                        packets_per_protocol[protocol_name] = 1

                    calculate_packets_counts_per_ips_proto(average_per_proto_src, protocol_name, src_ip, average_per_proto_dst, dst_ip)

                elif eth.type == dpkt.ieee80211:   # Wifi packets
                    wifi_info = Communication_wifi(eth.data)
                    type_info, sub_type_info, ds_status, src_mac, dst_mac, sequence, pack_id, fragments, wifi_dur = wifi_info.calculating()

                elif eth.type == dpkt.ethernet.ETH_TYPE_REVARP:  # RARP packets
                    rarp = 1   # Reverse of ARP

                if len(flag_values) == 0:
                    flag_values = [0] * 8

                new_row = {
                    "flow_duration": flow_duration,
                    "Header_Length": flow_byte,
                    "Protocol Type": proto_type,
                    "Duration": duration,
                    "Rate": rate,
                    "Srate": srate,
                    "Drate": drate,
                    "fin_flag_number": flag_values[0],
                    "syn_flag_number": flag_values[1],
                    "rst_flag_number": flag_values[2],
                    "psh_flag_number": flag_values[3],
                    "ack_flag_number": flag_values[4],
                    "ece_flag_number": flag_values[5],
                    "cwr_flag_number": flag_values[6],
                    "ack_count": ack_count,
                    "syn_count": syn_count,
                    "fin_count": fin_count,
                    "urg_count": urg_count,
                    "rst_count": rst_count,
                    "HTTP": http,
                    "HTTPS": https,
                    "DNS": dns,
                    "Telnet": telnet,
                    "SMTP": smtp,
                    "SSH": ssh,
                    "IRC": irc,
                    "TCP": tcp,
                    "UDP": udp,
                    "DHCP": dhcp,
                    "ARP": arp,
                    "ICMP": icmp,
                    "IPv": ipv,
                    "LLC": llc,
                    "Tot sum": sum_packets,
                    "Min": min_packets,
                    "Max": max_packets,
                    "AVG": mean_packets,
                    "Std": std_packets,
                    "Tot size": ethernet_frame_size,
                    "IAT": IAT,
                    "Number": len(ethsize),
                    "Magnitue": magnite,
                    "Radius": radius,
                    "Covariance": covariance,
                    "Variance": var_ratio,
                    "Weight": weight
                }

                for c in base_row.keys():
                    base_row[c].append(new_row[c])

                count_rows += 1

        processed_df = pd.DataFrame(base_row)

        numeric_cols = processed_df.select_dtypes(include='number').columns
        processed_df[numeric_cols] = processed_df[numeric_cols].apply(pd.to_numeric, errors='coerce')

        last_row = 0
        n_rows = 10
        df_summary_list = []

        while last_row < len(processed_df):
            sliced_df = processed_df[last_row:last_row+n_rows]
            sliced_numeric_df = sliced_df[numeric_cols].mean().to_frame().T
            df_summary_list.append(sliced_numeric_df)
            last_row += n_rows

        processed_df = pd.concat(df_summary_list).reset_index(drop=True)
        processed_df.to_csv(csv_file_name+".csv", index=False)

        return True
