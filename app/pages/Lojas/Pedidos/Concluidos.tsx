import { ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useCallback } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1, Heading3 } from '@/src/components/TextComponent';
import { PedidoCard } from '@/src/components/CardComponents';
import api from '@/src/services/api';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getSecureItem } from '@/utils/secureStore';

// Tipos usados
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
          const response = await api.get(`/pedidos/farmacia/${farmaciaId}`);
          const pedidosList = Array.isArray(response.data) ? response.data : response.data.pedidos;

          if (!Array.isArray(pedidosList)) {
            throw new Error("Formato inesperado da resposta da API");
          }

          const detalhes = await Promise.all(
            pedidosList.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
          );

          const detalhesPedidos = detalhes
            .map((res) => res.data.pedido)
            .filter((pedido) => pedido.status === 'Concluido');

          setPedidos(detalhesPedidos);
        } catch (error) {
          console.error('Erro ao carregar pedidos concluídos:', error);
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
      <Heading1 className="m-5">Pedidos concluídos:</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" />
      ) : pedidos.length === 0 ? (
        <Heading3 className="text-center text-gray-500 mt-10">
          Não há pedidos concluídos
        </Heading3>
      ) : (
        <ScrollView>
          {pedidos.map((pedido: PedidoDetalhado) => (
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
