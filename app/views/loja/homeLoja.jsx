import { StyleSheet, Text, View, Pressable, Alert, BackHandler, Settings, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProdutosLoja from './produtosLoja';
import PedidosLoja from './pedidosLoja';
import SettingsLoja from './settingsLoja';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator()

const HomeLoja = () => {
  const router = useRouter();

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
        name="ProdutosLoja"
        component={ProdutosLoja}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="store" color={color} size={size} />
          ),
          headerTitle:  "Seus produtos:",
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => router.push('/views/loja/adicionarProduto')}
              style={styles.btnAddProduto}
            >
              Adicionar produto
              <FontAwesome name="plus" size={24} color="#2f88ff" />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen
        name="PedidosLoja"
        component={PedidosLoja}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-check" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="settings"
        component={SettingsLoja}
        options={{
          headerTitle: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" size={size} color={color} />
        ),        
      }} />
    </Tab.Navigator>
  );
};

export default HomeLoja;

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
  btnAddProduto: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: "#2f88ff",
    borderRadius: 8,
    padding: 10,
    fontFamily: 'Arial', //Temporário
    fontWeight: 'bold',
    width: 200
  }
});