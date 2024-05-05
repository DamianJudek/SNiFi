import { css } from "styled-components";

export const H1 = css`
  font-family: ${({ theme }) => theme.font.inter};
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.palette.white};
  font-size: 40px;
  margin: 0 0 20px 0;
`;

export const H2 = css`
  width: 100%;
  font-family: ${({ theme }) => theme.font.inter};
  color: ${({ theme }) => theme.palette.darkWhite};
  font-size: 35px;
  text-align: center;
  margin: 0 0 20px 0;
`;

export const H3 = css`
  width: 100%;
  font-family: ${({ theme }) => theme.font.inter};
  color: ${({ theme }) => theme.palette.darkWhite};
  font-size: 24px;
  text-align: center;
  margin: 0 0 20px 0;
`;

export const Label = css`
  font-family: ${({ theme }) => theme.font.roboto};
  color: ${({ theme }) => theme.palette.white};
  font-size: 16px;
`;

export const LabelBold = css`
  font-family: ${({ theme }) => theme.font.roboto};
  color: ${({ theme }) => theme.palette.white};
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: 14px;
`;

export const SmallInfo = css`
  font-family: ${({ theme }) => theme.font.roboto};
  color: ${({ theme }) => theme.palette.darkWhite};
  font-weight: ${({ theme }) => theme.weight.light};
  font-size: 12px;
`;
