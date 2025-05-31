// 
// src/utils/secureStore.ts
import * as SecureStore from 'expo-secure-store';

export async function saveSecureItem(key, value) {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  await SecureStore.setItemAsync(key, stringValue);
}

export async function getSecureItem(key) {
  const value = await SecureStore.getItemAsync(key);
  try {
    return JSON.parse(value); // tenta converter se for JSON
  } catch {
    return value; // senão, retorna como string mesmo
  }
}

export async function deleteSecureItem(key) {
  await SecureStore.deleteItemAsync(key);
}
