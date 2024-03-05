import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';
import { AppError } from '@utils/AppError';

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagePlayers = await playersGetByGroup(group);

    const playerAlreadyExist = storagePlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExist.length > 0) {
      throw new AppError('This player is already in a team');
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
