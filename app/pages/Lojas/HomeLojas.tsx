import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
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
        try {
          const farmaciaId = await getSecureItem('id_farmacia');

          // --- PEDIDOS ---
          const resPedidos = await api.get(`/pedidos/farmacia/${farmaciaId}`);
          const pedidos = Array.isArray(resPedidos.data) ? resPedidos.data : resPedidos.data.pedidos;

          const detalhesPedidos = await Promise.all(
            pedidos.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
          );

          const todosPedidos = detalhesPedidos.map((res) => res.data.pedido);
          setConcluidos(todosPedidos.filter(p => p.status === 'Concluido').length);
          setPendentes(todosPedidos.filter(p => p.status === 'Pendente').length);

          // --- PRODUTOS ---
          const resProdutos = await api.get(`/produtos/farmacia/${farmaciaId}`);
          const produtos = resProdutos.data as Produto[];

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

        } catch (error) {
          console.error("Erro ao buscar dados da home:", error);
        }
      };

      fetchDados();
    }, [])
  );

  return (
    <GenericContainer className='items-center gap-8'>
      <Heading1>Bem vindo</Heading1>

      <SecondaryButton>
        Adicionar Novo Produto
      </SecondaryButton>

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
    </GenericContainer>
  );
};

export default HomeLojas;

const styles = StyleSheet.create({});
