import styled from "styled-components";

export const Wrapper = styled.div`
  i:hover {
    color: ${({ theme }) => theme.palette.darkBlue};
    cursor: pointer;
  }

  .MuiBadge-badge {
    background-color: ${({ theme }) => theme.palette.darkBlue};
    top: -5px;
    right: -5px;
  }
`;
