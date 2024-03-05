import { RefObject } from 'react';
import { Container } from './styles';
import { useTheme } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  inputRef?: RefObject<TextInput>;
};
export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
