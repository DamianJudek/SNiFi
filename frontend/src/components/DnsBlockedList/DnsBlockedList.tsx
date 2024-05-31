import { useEffect, useState } from "react";
import { getDnsList } from "../../api";
import useAlert from "../../hooks/useAlert";
import DnsTable from "../DnsTable/DnsTable";
import { BlockedDns } from "../DnsTable/DnsTable.interface";
import { Container, Title } from "./DnsBlockedList.styled";

const DnsBlockedList = () => {
  const [list, setList] = useState<BlockedDns[]>([]);
  const [showAlert, Alert] = useAlert({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDnsBlockedList = () => {
    setIsLoading(true);
    getDnsList()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data.data);
      })
      .catch((err) => {
        console.error("Error fetching dns blocked list", err);
        showAlert("Error fetching dns blocked list", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const id = setInterval(fetchDnsBlockedList, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(fetchDnsBlockedList, []);

  return (
    <Container>
      <Title>DNS blocked list</Title>
      <DnsTable blockedList={list} isLoading={isLoading} />
      {Alert}
    </Container>
  );
};

export default DnsBlockedList;
