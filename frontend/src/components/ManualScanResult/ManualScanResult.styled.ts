import styled from "styled-components";
import { H3, LabelBold, Label } from "../../styles/typography";

type ContainerProps = {
  $isAttack: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px dashed
    ${({ theme, $isAttack }) =>
      $isAttack ? theme.palette.red : theme.palette.green};
`;

export const Header = styled.h3<ContainerProps>`
  ${H3};
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme, $isAttack }) =>
    $isAttack ? theme.palette.red : theme.palette.green};
  margin: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

export const Name = styled.p`
  ${LabelBold};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: 22px;
`;

export const Value = styled.span`
  ${Label};
  font-weight: ${({ theme }) => theme.weight.light};
  font-size: 22px;
`;

export const Button = styled.button`
  ${LabelBold};
  padding: 0;
  margin-top: auto;
  border: none;
  color: ${({ theme }) => theme.palette.blue};
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.lightBlue};
  }
`;
