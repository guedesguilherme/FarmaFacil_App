import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,  
  Alert,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingCliente = () => {
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
  return (
    <View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingCliente

const styles = StyleSheet.create({
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
})