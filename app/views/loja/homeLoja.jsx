import { StyleSheet, Text, View, Pressable, Alert, BackHandler, Settings } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Produtos from './produtos';
import Pedidos from './pedidos';
import SettingsLoja from './settingsLoja';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator()

const homeLoja = () => {
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
        // router.replace("/homeLoja");
        return true
      }

      return false
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [])

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Produtos"
        component={Produtos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="store" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-check" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Configurações" component={SettingsLoja} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="gear" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default homeLoja;

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