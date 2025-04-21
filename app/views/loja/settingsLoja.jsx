import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const API_URL = 'https://api-cadastro-farmacias.onrender.com';

const SettingsLoja = () => {
  const [farmacia, setFarmacia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFarmacia = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedId = await AsyncStorage.getItem('lojaId');

        if (!storedToken || !storedId) {
          setErro('Token ou ID da farmácia não encontrado.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/farma/${storedId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        setFarmacia(response.data.farma);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar informações da farmácia.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmacia();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('lojaId');
      Alert.alert('Logout', 'Você saiu com sucesso!');
      router.navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2f88ff" style={styles.loading} />;
  }

  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{farmacia.nome}</Text>
      <Text style={styles.item}><Text style={styles.label}>CNPJ:</Text> {farmacia.cnpj}</Text>
      <Text style={styles.item}><Text style={styles.label}>Rede:</Text> {farmacia.rede}</Text>
      <Text style={styles.item}><Text style={styles.label}>Email:</Text> {farmacia.email}</Text>
      <Text style={styles.item}><Text style={styles.label}>Endereço:</Text> {`${farmacia.rua}, Nº ${farmacia.numero}, ${farmacia.bairro}`}</Text>
      <Text style={styles.item}><Text style={styles.label}>CEP:</Text> {farmacia.cep}</Text>
      <Text style={styles.item}><Text style={styles.label}>Cidade/UF:</Text> {`${farmacia.cidade} - ${farmacia.uf}`}</Text>

      <View style={{display: 'flex', flexDirection: 'column', gap: 15}}>
        
        <Button 
          title="Editar suas informações"
          color="#2f88ff"           
          onPress={() => router.push('/views/loja/editarLoja')}
        />             
        
        <Button title="Sair da conta" onPress={handleLogout} color="#2f88ff" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#264653',
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },  
});

export default SettingsLoja;
