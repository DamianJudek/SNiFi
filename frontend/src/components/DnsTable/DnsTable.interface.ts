export type BlockedDns = {
  question: {
    name: string;
  };
  time: string;
  filterId: number;
};

export type DnsTableProps = {
  blockedList: BlockedDns[];
  isLoading: boolean;
};
