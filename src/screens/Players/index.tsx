import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { Button } from '@components/Button';
import { HighLight } from '@components/HighLight';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { ButtonIcon } from '@components/ButtonIcon';

import { Container, Form, HeaderList, NumOfPlayers } from './styles';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const route = useRoute();
  const navigation = useNavigation();

  const { group } = route.params as RouteParams;

  const [team, setTeam] = useState('Team A');
  const [isLoading, setIsLoading] = useState(true);
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New Player', 'Invalid player name');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Player', error.message);
      } else {
        Alert.alert('New Player', 'It was not possible to add new player');
        console.log(error);
      }
    }
  }

  async function playerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remove Player', 'It was not possible to remove player');
    }
  }

  async function handlePlayerRemove(playerName: string) {
    return Alert.alert(
      'Remove Player',
      `Are you sure that you want to remove ${playerName}, from ${team}?`,
      [
        {
          text: 'Yes',
          isPreferred: true,
          onPress: () => {
            playerRemove(playerName);
          },
        },
        { text: 'No', style: 'cancel' },
      ]
    );
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Delete Group', 'It was not possible to delete group');
    }
  }

  async function handleGroupRemove() {
    return Alert.alert(
      'Delete Group',
      `Are you sure that you want to delete ${group}?`,
      [
        {
          text: 'Yes',
          isPreferred: true,
          onPress: () => {
            groupRemove();
          },
        },
        { text: 'No', style: 'cancel' },
      ]
    );
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        'Players',
        'It was not possible to load players from this team '
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <HighLight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          iconName="add"
          type="PRIMARY"
          onPress={() => handleAddPlayer()}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumOfPlayers>{players.length}</NumOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handlePlayerRemove(item.name);
              }}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="This group is empty!" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[players.length === 0 && { flex: 1 }]}
        />
      )}

      <Button
        title="Delete group"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
