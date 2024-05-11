import styled from "styled-components";

const StyledIcon = styled.i`
  font-size: 25px;
  color: ${({ theme }) => theme.palette.lightGray};
`;

type IconProps = {
  name: string;
};

const Icon = ({ name }: IconProps) => {
  return <StyledIcon className={`icon-${name}`} />;
};

export default Icon;
