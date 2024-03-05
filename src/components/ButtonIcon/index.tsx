import { TouchableOpacityProps } from 'react-native';
import { ButtonIconStyleProps, Container, Icon } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

type ButtonIconProps = TouchableOpacityProps & {
  iconName: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconStyleProps;
};

export function ButtonIcon({
  iconName,
  type = 'PRIMARY',
  ...rest
}: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} type={type} />
    </Container>
  );
}
