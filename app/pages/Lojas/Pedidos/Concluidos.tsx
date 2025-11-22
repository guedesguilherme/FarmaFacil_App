import { ScrollView, ActivityIndicator, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1, Heading3 } from '@/src/components/TextComponent';
import { PedidoCard } from '@/src/components/CardComponents';
import api from '@/src/services/api';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getSecureItem } from '@/utils/secureStore';
import { Ionicons } from '@expo/vector-icons';

// Tipagem
type Produto = {
  nome: string;
  imagem_url: string;
};

type ItemPedido = {
  quantidade: number;
  product: Produto;
};

type Usuario = {
  nome: string;
};

type PedidoDetalhado = {
  _id: string;
  precoTotal: number;
  usuario: Usuario;
  itensPedido: ItemPedido[];
  status: string;
  dataPedido?: string; // Adicionado para ordenação
};

const Concluidos = () => {
  const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadPedidos = async () => {
        try {
          setLoading(true);
          const farmaciaId = await getSecureItem('id_farmacia');
          
          let pedidosList = [];

          try {
            const response = await api.get(`/pedidos/farmacia/${farmaciaId}`);
            pedidosList = Array.isArray(response.data) ? response.data : (response.data.pedidos || []);
          } catch (error: any) {
            if (error.response && error.response.status === 404) {
              setPedidos([]);
              return;
            }
            throw error;
          }

          if (pedidosList.length > 0) {
            const detalhes = await Promise.all(
              pedidosList.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
            );

            const todosPedidos = detalhes.map((res) => res.data.pedido);

            // Filtra apenas Concluídos
            const concluidos = todosPedidos.filter((p) => p && p.status === 'Concluido');

            // Ordena do mais recente para o mais antigo (se houver data)
            concluidos.sort((a, b) => {
                const dateA = a.dataPedido ? new Date(a.dataPedido).getTime() : 0;
                const dateB = b.dataPedido ? new Date(b.dataPedido).getTime() : 0;
                return dateB - dateA;
            });

            setPedidos(concluidos);
          } else {
            setPedidos([]);
          }

        } catch (error) {
          console.error('Erro ao carregar histórico:', error);
        } finally {
          setLoading(false);
        }
      };

      loadPedidos();
    }, [])
  );

  const handleNavigate = (pedido: PedidoDetalhado) => {
    router.push({
      pathname: '/pages/Lojas/Pedidos/DetalhesPedidoConcluido',
      params: {
        nome: pedido.itensPedido[0]?.product?.nome ?? 'Produto',
        preco: pedido.precoTotal?.toFixed(2),
        cliente: pedido.usuario?.nome ?? 'Cliente',
        idPedido: pedido._id,
        quantidade: String(pedido.itensPedido[0]?.quantidade ?? '1'),
      },
    });
  };

  return (
    <GenericContainer>
      <Heading1 className="m-5">Histórico de Vendas</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" className="mt-10" />
      ) : pedidos.length === 0 ? (
        // --- Estado Vazio (Ionicons) ---
        <View className="flex-1 justify-center items-center mt-10 px-5">
          <Ionicons name="checkmark-done-circle-outline" size={60} color="#cbd5e1" />
          <Heading3 className="text-center text-gray-500 mt-4">
            Nenhum pedido concluído ainda.
          </Heading3>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          {pedidos.map((pedido) => (
            <PedidoCard
              key={pedido._id}
              nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
              preco={pedido.precoTotal?.toFixed(2)}
              cliente={pedido.usuario?.nome ?? 'Cliente'}
              imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
              onPress={() => handleNavigate(pedido)}
            />
          ))}
        </ScrollView>
      )}
    </GenericContainer>
  );
};

export default Concluidos;