import { StyleSheet, Text, View, Pressable, Alert, BackHandler } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const SettingsLoja = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Remove o token do AsyncStorage
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout', 'Você saiu com sucesso!');
      // Redireciona para a tela inicial
      router.replace('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };

  useEffect(() => {
    const onBackPress = async () => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            // router.replace("/settings");
            return true
        }

        return false
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return() => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home da Loja</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SettingsLoja;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#2f88ff',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});