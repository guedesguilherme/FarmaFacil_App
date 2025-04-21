import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProdutosCliente() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch('https://api-cadastro-farmacias.onrender.com/produtos');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#008080" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Disponíveis</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.produtoContainer}
            onPress={() => router.push(`/views/cliente/detalhesProduto?id=${item._id}`)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>Preço: R${item.preco}</Text>
            <Text style={styles.farmacia}>Farmácia: {item.farmacia?.nome || 'Não especificada'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  produtoContainer: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
  },
  nome: { fontSize: 18, fontWeight: '600' },
  preco: { fontSize: 16, color: '#333' },
  farmacia: { fontSize: 14, color: '#555' },
});
