import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Icon, Name } from './styles';

type PlayerProps = {
  name: string;
  onRemove: () => void;
};

export function PlayerCard({ name, onRemove }: PlayerProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon iconName="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
}
