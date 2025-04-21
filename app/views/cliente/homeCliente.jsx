import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  BackHandler,
  Settings,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator()
import ProdutosCliente from './produtosCliente';
import PedidosCliente from './pedidosCliente';
import SettingsCliente from './settingsCliente';
import Carrinho from './carrinho';

const homeCliente = () => {

  useEffect(() => {
    const onBackPress = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Impede o retorno para telas anteriores
        return true; // Bloqueia o botão de retorno
      }
      return false; // Permite o comportamento padrão
    };

    // Adiciona o listener para o botão de retorno
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Remove o listener ao desmontar o componente
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  return (

    <Tab.Navigator>
      {/* Catálogo de produtos: */}
      <Tab.Screen
        name="catalogo"
        component={ProdutosCliente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="store" color={color} size={size} />
          ),
          tabBarLabel: 'Catálogo',
          headerTitle: "Catálogo de produtos",
          headerRight: () => (
            <View style={styles.rightHeaderContainer}>
              <TextInput
                placeholder='Pesquisar produto...'
                style={styles.searchInput}
              />
              <FontAwesome 
                name="shopping-cart"                                
                style={styles.cartIcon}
              />
            </View>
            )
        }}
      />

      <Tab.Screen
        name="seus-pedidos"
        component={PedidosCliente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-check" color={color} size={size} />
          ),
          headerTitle: "Seus pedidos",
          tabBarLabel: 'Seus pedidos',
          headerRight: () => (
          <View style={styles.rightHeaderContainer}>
            <TextInput
              placeholder='Pesquisar produto...'
              style={styles.searchInput}
            />
            <FontAwesome 
              name="shopping-cart"               
              style={styles.cartIcon}
            />
          </View>
          )
        }}
      />

      <Tab.Screen
        name="settings"
        component={SettingsCliente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" color={color} size={size} />
          ),
          tabBarLabel: 'Configurações',
          headerTitle: "Configurações",          
        }}
      />

    </Tab.Navigator>

  )
}
export default homeCliente

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
  rightHeaderContainer: {
    marginRight: 35,
    display: 'flex',
    flexDirection: 'row',    
    gap: 10,
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: '#2f88ff',
    padding: 8,
    width: 250
  },
  cartIcon: {
    borderWidth: 0,
    backgroundColor: '#2f88ff',
    padding: 8,
    fontSize: 20,    
    color: '#FFF',
    borderRadius: 10,
    width: 55,
    display: 'flex',
    justifyContent: 'center',
  },
});
