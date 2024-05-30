import numpy as np
import itertools
from scipy import stats


class Dynamic_features:
    def dynamic_calculation(self,ethsize):
        sum_packets = sum(ethsize)
        min_packets = min(ethsize)
        max_packets = max(ethsize)
        mean_packets = sum_packets / len(ethsize)
        std_packets = np.std(ethsize)

        return sum_packets,min_packets,max_packets,mean_packets,std_packets

    def dynamic_count(self,protcols_count):   # calculates the number feature
        packets = 0
        for k in protcols_count.keys():
            packets = packets + protcols_count[k]

        return packets

    def dynamic_two_streams(self, incoming, outgoing):
        if not incoming:
            incoming = [0]
        if not outgoing:
            outgoing = [0]
        inco_ave = sum(incoming) / len(incoming)
        out_ave = sum(outgoing) / len(outgoing)
        inco_std = (sum([(x - inco_ave)**2 for x in incoming]) / len(incoming))**0.5
        out_std = (sum([(x - out_ave)**2 for x in outgoing]) / len(outgoing))**0.5
        magnite = (sum([x**2 for x in incoming]) + sum([x**2 for x in outgoing]))**0.5
        radius = (sum([(x - inco_ave)**2 for x in incoming]) + sum([(x - out_ave)**2 for x in outgoing]))**0.5
        covariance = sum([(incoming[i] - inco_ave) * (outgoing[i] - out_ave) for i in range(len(incoming))]) / len(incoming)
        correlation = covariance / (inco_std * out_std) if inco_std and out_std else 0
        var_ratio = inco_std / out_std if out_std else 0
        weight = magnite / len(incoming)
        return magnite, radius, correlation, covariance, var_ratio, weight