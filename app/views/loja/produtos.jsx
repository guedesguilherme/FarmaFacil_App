import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProdutos = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const lojaId = await AsyncStorage.getItem('lojaId'); // Recupera o id da loja
      if (!token || !lojaId) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }
  
      const response = await fetch(`https://api-cadastro-farmacias.onrender.com/produtos/farmacia/${lojaId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setProdutos(data.produtos || []); // Define os produtos retornados pela API
      } else {
        Alert.alert('Erro', data.msg || 'Erro ao buscar os produtos.');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f88ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.produtoItem}>
              <Text style={styles.produtoNome}>{item.nome}</Text>
              <Text style={styles.produtoPreco}>R$ {item.preco.toFixed(2)}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
      )}
    </View>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  produtoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  produtoPreco: {
    fontSize: 16,
    color: '#2f88ff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
  },
});