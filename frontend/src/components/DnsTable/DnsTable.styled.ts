import styled from "styled-components";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Paragraph } from "../../styles/typography";

export const StyledTableContainer = styled(TableContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.lightBlack};
  border-radius: 5px;
  overflow-y: auto;
  max-height: 700px;
`;

export const StyledTable = styled(Table)``;

export const StyledTableHead = styled(TableHead)`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.palette.lightBlack};
`;

export const StyledTableHeadRow = styled(TableRow)``;

export const StyledTableCell = styled(TableCell)`
  color: ${({ theme }) => theme.palette.white} !important;
`;

export const StyledTableRow = styled(TableRow)``;

export const NoRowsInfo = styled.p`
  ${Paragraph};
  padding: 50px;
`;
