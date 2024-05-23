import { LinearLoaderProps } from "./Loader.interface";
import {
  CircularContainer,
  StyledCircularLoader,
  LinearContainer,
  Progress,
  StyledLinearLoader,
} from "./Loader.styled";

export const CircularLoader = () => {
  return (
    <CircularContainer>
      <StyledCircularLoader />
    </CircularContainer>
  );
};

export const LinearLoader = ({ progress }: LinearLoaderProps) => {
  const value = Math.round(parseFloat(progress));

  return (
    <LinearContainer>
      <StyledLinearLoader variant="determinate" value={value} />
      <Progress>{`${value}%`}</Progress>
    </LinearContainer>
  );
};

export default CircularLoader;
