import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Heading1 } from '@/src/components/TextComponent';
import { SecondaryButton } from '@/src/components/ButtonsComponent';
import GenericContainer from '@/src/components/ViewComponents';
import { CardHomeLoja } from '@/src/components/CardComponents';
import api from '@/src/services/api';
import { getSecureItem } from '@/utils/secureStore';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Tipagem do produto
type Produto = {
  nome: string;
  quantidade: number;
};

const HomeLojas = () => {
  const [concluidos, setConcluidos] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [produtosEmEstoque, setProdutosEmEstoque] = useState(0);
  const [produtoMenorEstoque, setProdutoMenorEstoque] = useState('-');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchDados = async () => {
        let farmaciaId;
        
        try {
          farmaciaId = await getSecureItem('id_farmacia');
        } catch (e) {
          console.error("Erro ao recuperar ID da farmácia", e);
          return;
        }

        // --- BLOCO 1: PEDIDOS (Isolado) ---
        try {
          const resPedidos = await api.get(`/pedidos/farmacia/${farmaciaId}`);
          
          // Verifica se retornou dados antes de tentar acessar
          if (resPedidos.data) {
            const pedidos = Array.isArray(resPedidos.data) ? resPedidos.data : resPedidos.data.pedidos || [];

            // Se a lista de pedidos não estiver vazia, busca os detalhes
            if (pedidos.length > 0) {
              const detalhesPedidos = await Promise.all(
                pedidos.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
              );

              const todosPedidos = detalhesPedidos.map((res) => res.data.pedido);
              setConcluidos(todosPedidos.filter((p: any) => p.status === 'Concluido').length);
              setPendentes(todosPedidos.filter((p: any) => p.status === 'Pendente').length);
            } else {
              // Lista vazia (caso a API retorne 200 mas array vazio)
              setConcluidos(0);
              setPendentes(0);
            }
          }
        } catch (error: any) {
          // Se for erro 404, significa que não tem pedidos, então zeramos os contadores
          if (error.response && error.response.status === 404) {
            setConcluidos(0);
            setPendentes(0);
          } else {
            console.error("Erro ao buscar pedidos:", error);
          }
        }

        // --- BLOCO 2: PRODUTOS (Isolado) ---
        // O código continua aqui mesmo se o bloco de pedidos falhar
        try {
          const resProdutos = await api.get(`/produtos/farmacia/${farmaciaId}`);
          
          // Garante que é um array
          const produtos = Array.isArray(resProdutos.data) ? resProdutos.data : [];

          const produtosDisponiveis = produtos.filter((p: Produto) => p.quantidade > 0);
          setProdutosEmEstoque(produtosDisponiveis.length);

          if (produtosDisponiveis.length > 0) {
            const menorEstoque = produtosDisponiveis.reduce(
              (prev: Produto, curr: Produto) => curr.quantidade < prev.quantidade ? curr : prev
            );
            setProdutoMenorEstoque(menorEstoque.nome);
          } else {
            setProdutoMenorEstoque('-');
          }
        } catch (error: any) {
          // Tratamento específico para produtos (ex: 404 também)
          if (error.response && error.response.status === 404) {
             setProdutosEmEstoque(0);
             setProdutoMenorEstoque('-');
          } else {
             console.error("Erro ao buscar produtos:", error);
          }
        }
      };

      fetchDados();
    }, [])
  );

  return (
    <GenericContainer className='items-center gap-8'>
      <Heading1>Bem vindo</Heading1>

      <SecondaryButton onPress={() => router.push('/pages/Lojas/AdicionarProduto')}>
        Adicionar Novo Produto
      </SecondaryButton>

      <ScrollView 
        contentContainerStyle={{ gap: 32, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
      <CardHomeLoja 
        CardHeader="Gerencie seu estoque" 
        CardItem1="Produtos em estoque" 
        CardDesc1={String(produtosEmEstoque)}
        CardItem2="Produtos com menos unidades"
        CardDesc2={produtoMenorEstoque}
        ButtonDesc="Gerenciar Estoque"
        onPress={() => router.push('/pages/Lojas/Estoque')}
      />

      <CardHomeLoja 
        CardHeader="Gerencie seus pedidos" 
        CardItem1="Pedidos concluídos" 
        CardDesc1={String(concluidos)}
        CardItem2="Pedidos pendentes"
        CardDesc2={String(pendentes)}
        ButtonDesc="Gerenciar Pedidos"
        onPress={() => router.push('/pages/Lojas/Pedidos')}
      />
      </ScrollView> 
    </GenericContainer>
  );
};

export default HomeLojas;

const styles = StyleSheet.create({});