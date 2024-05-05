import { ReactNode } from "react";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.black};
  min-width: 100vw;
  min-height: 100vh;
`;

const Layout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout;
