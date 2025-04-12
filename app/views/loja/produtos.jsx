import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProdutos = async () => {
    try {
      const farma_id = await AsyncStorage.getItem('lojaId');

      if (!farma_id) {
        Alert.alert(
          'Erro',
          'ID da farmácia não encontrado. Faça login novamente.'
        );
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://api-cadastro-farmacias.onrender.com/produtos/farmacia/${farma_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProdutos(data);
      } else {
        Alert.alert('Erro', data.message || 'Erro ao carregar produtos');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdutos();
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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.produtoItem}>
              <Text style={styles.produtoNome}>{item.nome}</Text>
              <Text style={styles.produtoPreco}>R$ {item.preco.toFixed(2)}</Text>
              <Text style={styles.produtoInfo}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.produtoInfo}>Validade: {item.validade}</Text>
              <Text style={styles.produtoInfo}>Lote: {item.lote}</Text>
              <Text style={styles.produtoInfo}>Categoria: {item.label}</Text>
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
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  produtoPreco: {
    fontSize: 16,
    color: '#2f88ff',
    marginBottom: 4,
  },
  produtoInfo: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 50,
  },
});
