import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { HighLight } from '@components/HighLight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState('');

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New Group', 'Invalid group name');
      }

      await groupCreate(group);

      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Group', error.message);
      } else {
        Alert.alert('New Group', 'It was not possible to create new group');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HighLight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input
          value={group}
          onChangeText={setGroup}
          placeholder="Nome da turma"
          style={{ marginBottom: 20 }}
        />
        <Button title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  );
}
