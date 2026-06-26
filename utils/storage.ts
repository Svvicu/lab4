// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage'; //

export async function saveData<T>(key: string, value: T): Promise<void> { //
  try {
    const json = JSON.stringify(value); //
    await AsyncStorage.setItem(key, json); //
  } catch (e) {
    console.warn('Blad zapisu:', e); //
  }
}

export async function loadData<T>(key: string): Promise<T | null> { //
  try {
    const raw = await AsyncStorage.getItem(key); //
    return raw ? (JSON.parse(raw) as T) : null; //
  } catch (e) {
    console.warn('Blad odczytu:', e); //
    return null; //
  }
}

export async function removeData(key: string): Promise<void> { //
  try {
    await AsyncStorage.removeItem(key); //
  } catch (e) {
    console.warn('Blad usuwania:', e); //
  }
}