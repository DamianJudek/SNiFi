import { ReactNode } from "react";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.black};
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout;
