import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStorage = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log(e)
  }
};

export const getStorage = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const removeStorage = async (storageKey) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (e) {
    console.log(e);
  }
};