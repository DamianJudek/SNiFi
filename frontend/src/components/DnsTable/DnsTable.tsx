import TableBody from "@mui/material/TableBody";
import { DnsTableProps } from "./DnsTable.interface";
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableCell,
  StyledTableRow,
  NoRowsInfo,
} from "./DnsTable.styled";
import CircularLoader from "../Loader/Loader";

const displayDate = (date: string) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

export default function DnsTable({ blockedList, isLoading }: DnsTableProps) {
  return (
    <StyledTableContainer>
      <StyledTable
        sx={{ minWidth: 650 }}
        aria-label="Blocked DNS queries table"
      >
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableCell>Domain</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Filter Id</StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {blockedList.map((query) => (
            <StyledTableRow
              key={`${query?.question?.name} - ${query.time}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {query?.question?.name ?? "<domain not resolved>"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {displayDate(query.time)}
              </StyledTableCell>
              <StyledTableCell align="right">{query.filterId}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
      {isLoading && blockedList.length <= 0 && <CircularLoader />}
      {!isLoading && blockedList.length === 0 && (
        <NoRowsInfo>No blocked domains</NoRowsInfo>
      )}
    </StyledTableContainer>
  );
}
