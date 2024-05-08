import Icon from "../Icon/Icon";
import { PaletteKeys } from "../../styles/theme/palette";
import { Pill, Text } from "./IconBadge.styled";

interface IconBadgeProps {
  children: string;
  color: PaletteKeys;
  iconName: string;
}

const IconBadge = ({ children, color, iconName }: IconBadgeProps) => {
  return (
    <Pill $color={color}>
      <Icon name={iconName} />
      <Text>{children}</Text>
    </Pill>
  );
};

export default IconBadge;
