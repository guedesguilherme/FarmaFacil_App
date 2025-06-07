import * as SecureStore from 'expo-secure-store';

export async function saveSecureItem(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureItem(key) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteSecureItem(key) {
  await SecureStore.deleteItemAsync(key);
}