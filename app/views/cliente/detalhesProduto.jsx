import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(`https://api-cadastro-farmacias.onrender.com/produtos/${id}`);
        const data = await response.json();
        setProduto(data.produto);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduto();
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#008080" style={{ marginTop: 40 }} />;
  }

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{produto.nome}</Text>
      <Text style={styles.label}>Nome Químico:</Text>
      <Text style={styles.valor}>{produto.nome_quimico}</Text>

      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.valor}>R$ {produto.preco}</Text>

      <Text style={styles.label}>Quantidade:</Text>
      <Text style={styles.valor}>{produto.quantidade}</Text>

      <Text style={styles.label}>Validade:</Text>
      <Text style={styles.valor}>{produto.validade}</Text>

      <Text style={styles.label}>Lote:</Text>
      <Text style={styles.valor}>{produto.lote}</Text>

      <Text style={styles.label}>Rótulo:</Text>
      <Text style={styles.valor}>{produto.label}</Text>

      <Text style={styles.label}>Farmácia:</Text>
      <Text style={styles.valor}>{produto.farmacia?.nome || 'Não especificada'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    color: '#333',
  },
  erro: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },
});
