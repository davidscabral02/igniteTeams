import { Header } from '@components/Header';
import { Container } from './styles';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
  const [groups, setGroups] = useState(['Aqui']);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('newGroups');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      Alert.alert('Groups', 'It was not possible to load your groups');
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="A lista de grupos está vazia" />
        )}
      />

      <Button
        title="Criar nova turma"
        type="PRIMARY"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
