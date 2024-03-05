import { Container, Subitle, Title } from './styles';

type HighLightProps = {
  title: string;
  subtitle: string;
};

export function HighLight({ title, subtitle }: HighLightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subitle>{subtitle}</Subitle>
    </Container>
  );
}
