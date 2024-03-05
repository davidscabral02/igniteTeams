import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupsGetAll();

    const groupAlreadyExist = storageGroups.includes(newGroup);

    if (groupAlreadyExist) {
      throw new AppError('This group already exist!');
    }

    const storage = JSON.stringify([...storageGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
