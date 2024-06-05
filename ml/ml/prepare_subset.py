import os
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_DIRECTORY = os.path.join(BASE_DIR, "data/production/csv/")
PREPROCESSED_DIRECTORY = os.path.join(BASE_DIR, "data/preprocessed/csv/")
PERCENT_ROWS = 0.1

csv_files = [k for k in os.listdir(DATASET_DIRECTORY) if k.endswith('.csv')]
csv_files.sort()

binary_labels = {
    'DDoS-RSTFINFlood': 'Attack', 'DDoS-PSHACK_Flood': 'Attack', 'DDoS-SYN_Flood': 'Attack', 
    'DDoS-UDP_Flood': 'Attack', 'DDoS-TCP_Flood': 'Attack', 'DDoS-ICMP_Flood': 'Attack', 
    'DDoS-SynonymousIP_Flood': 'Attack', 'DDoS-ACK_Fragmentation': 'Attack', 
    'DDoS-UDP_Fragmentation': 'Attack', 'DDoS-ICMP_Fragmentation': 'Attack', 
    'DDoS-SlowLoris': 'Attack', 'DDoS-HTTP_Flood': 'Attack', 'DoS-UDP_Flood': 'Attack', 
    'DoS-SYN_Flood': 'Attack', 'DoS-TCP_Flood': 'Attack', 'DoS-HTTP_Flood': 'Attack', 
    'Mirai-greeth_flood': 'Attack', 'Mirai-greip_flood': 'Attack', 'Mirai-udpplain': 'Attack', 
    'Recon-PingSweep': 'Attack', 'Recon-OSScan': 'Attack', 'Recon-PortScan': 'Attack', 
    'VulnerabilityScan': 'Attack', 'Recon-HostDiscovery': 'Attack', 'DNS_Spoofing': 'Attack', 
    'MITM-ArpSpoofing': 'Attack', 'BenignTraffic': 'Benign', 'BrowserHijacking': 'Attack', 
    'Backdoor_Malware': 'Attack', 'XSS': 'Attack', 'Uploading_Attack': 'Attack', 
    'SqlInjection': 'Attack', 'CommandInjection': 'Attack', 'DictionaryBruteForce': 'Attack'
}

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

dtypes = {
    'flow_duration': np.float64,
    'header_length': np.float64,
    'protocol_type': str,
    'duration': np.float64,
    'rate': np.float64,
    'srate': np.float64,
    'drate': np.float64,
    'fin_flag_number': np.float64,
    'syn_flag_number': np.float64,
    'rst_flag_number': np.float64,
    'psh_flag_number': np.float64,
    'ack_flag_number': np.float64,
    'ece_flag_number': np.float64,
    'cwr_flag_number': np.float64,
    'ack_count': np.float64,
    'syn_count': np.float64,
    'fin_count': np.float64,
    'urg_count': np.float64,
    'rst_count': np.float64,
    'http': np.float64,
    'https': np.float64,
    'dns': np.float64,
    'telnet': np.float64,
    'smtp': np.float64,
    'ssh': np.float64,
    'irc':np.float64,
    'tcp': np.float64,
    'udp': np.float64,
    'dhcp': np.float64,
    'arp': np.float64,
    'icmp': np.float64,
    'ipv': np.float64,
    'llc': np.float64,
    'tot_sum': np.float64,
    'min': np.float64,
    'max': np.float64,
    'avg': np.float64,
    'std': np.float64,
    'tot_size': np.float64,
    'iat': np.float64,
    'number': np.float64,
    'magnitue': np.float64,
    'radius': np.float64,
    'covariance': np.float64,
    'variance': np.float64,
    'weight': np.float64,
    'label': str
}

def sample_rows(df, percent_rows, is_validation=False):
    labels = df['label'].unique()
    dfs_condensed = []
    percentages_ordered = [0.001, 0.005, 0.01, 0.05, 0.1]
    validation_index = None
    if is_validation and percent_rows == 0.01:
        validation_index = len(percentages_ordered)
    
    df_shuffled = df.sample(frac=1, random_state=42).reset_index(drop=True)

    print("\n--- Sampling Rows ---")
    print("Class distribution before sampling:")
    for label in labels:
        mask = df_shuffled['label'] == label
        df_by_label = df_shuffled[mask]
        cumulative_indices = [int(sum(percentages_ordered[:i]) * len(df_by_label)) for i in range(len(percentages_ordered)+1)]

        if validation_index is not None:
            start_idx = cumulative_indices[-1]
            end_idx = start_idx + int(0.01 * len(df_by_label))
        else:
            start_idx = int(len(df_by_label) * percent_rows * sum(percentages_ordered[:percentages_ordered.index(min(percentages_ordered, key=lambda x:abs(x-percent_rows)))+1]))
            end_idx = start_idx + int(len(df_by_label) * percent_rows)

        print(f"  Class {label}: {len(df_by_label)} examples, sampling from {start_idx} to {end_idx}")

        sample = df_by_label.iloc[start_idx:end_idx]
        dfs_condensed.append(sample)
    
    sampled_df = pd.concat(dfs_condensed, ignore_index=True).sample(frac=1, random_state=42)
    print(f"Total samples after sampling: {len(sampled_df)}")
    print("Class distribution after sampling:")
    for label in labels:
        print(f"  Class {label}: {len(sampled_df[sampled_df['label'] == label])} examples")
    
    return sampled_df

def iana_convert(df):
    df["Protocol Type"] = df["Protocol Type"].apply(lambda num : iana_map[ str(int(num)) ])
    return df

def convert_dtype(df):
    print("\n--- Converting Data Types ---")
    for col, typ in dtypes.items():
        if col in df.columns:
            print(f"  Converting column '{col}' to {typ}")
            df[col] = df[col].astype(typ)
    
    print("  Standardizing column names")
    df.columns = df.columns.str.lower().str.replace(' ', '_')
    
    return df

def apply_binary_labels(df, binary_labels):
    print("\n--- Applying Binary Labels ---")
    df['label'] = df['label'].map(binary_labels)
    return df

def write_helper(df, filename, first_file):
    mode = 'w' if first_file else 'a'
    header = first_file
    print(f"  Writing to file '{filename}' (mode={mode}, header={header})")
    df.to_csv(filename, index=False, mode=mode, header=header)

def combine_csv(csv_files, percent, binary_labels=None, is_validation=False):
    first_file = True
    if is_validation:
        output_path_original = os.path.join(PREPROCESSED_DIRECTORY, f'{percent}percent_validation_original_labels.csv')
        output_path_binary = os.path.join(PREPROCESSED_DIRECTORY, f'{percent}percent_validation_binary_labels.csv') if binary_labels else None
    else:
        output_path_original = os.path.join(PREPROCESSED_DIRECTORY, f'{percent}percent_original_labels.csv')
        output_path_binary = os.path.join(PREPROCESSED_DIRECTORY, f'{percent}percent_binary_labels.csv') if binary_labels else None

    print("\n--- Combining CSV Files ---")
    total_samples_original = 0
    total_samples_binary = 0
    for csv in csv_files:
        print(f"\nProcessing file: {csv}")

        df = pd.read_csv(os.path.join(DATASET_DIRECTORY, csv))
        
        df = convert_dtype(iana_convert(sample_rows(df, percent_rows=percent, is_validation=is_validation)))

        print("Saving original labels")
        total_samples_original += len(df)
        write_helper(df, output_path_original, first_file)

        if binary_labels:
            print("Applying and saving binary labels")
            df_binary = apply_binary_labels(df, binary_labels)
            total_samples_binary += len(df_binary)
            write_helper(df_binary, output_path_binary, first_file)

        first_file = False
    
    print(f"\n--- Summary ---")
    print(f"Total samples in original labels dataset: {total_samples_original}")
    print(f"Total samples in binary labels dataset: {total_samples_binary}")

if __name__ == "__main__":
    combine_csv(csv_files, PERCENT_ROWS, binary_labels=binary_labels, is_validation=False)
    # combine_csv(csv_files, PERCENT_ROWS, binary_labels=binary_labels, is_validation=True)
    
    df_original = pd.read_csv(os.path.join(PREPROCESSED_DIRECTORY, f'{PERCENT_ROWS}percent_original_labels.csv'))
    df_binary = pd.read_csv(os.path.join(PREPROCESSED_DIRECTORY, f'{PERCENT_ROWS}percent_binary_labels.csv'))
    # df_validation_original = pd.read_csv(os.path.join(PREPROCESSED_DIRECTORY, f'{PERCENT_ROWS}percent_validation_original_labels.csv'))
    # df_validation_binary = pd.read_csv(os.path.join(PREPROCESSED_DIRECTORY, f'{PERCENT_ROWS}percent_validation_binary_labels.csv'))
    
    print("\n--- Verification ---")
    print("\nOriginal Labels Distribution:")
    print(df_original['label'].value_counts())
    
    print("\nBinary Labels Distribution:")
    print(df_binary['label'].value_counts())

    # print("\nValidation Original Labels Distribution:")
    # print(df_validation_original['label'].value_counts())
    
    # print("\nValidation Binary Labels Distribution:")
    # print(df_validation_binary['label'].value_counts())