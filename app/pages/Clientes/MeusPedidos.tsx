import { ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useCallback } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1, Heading3 } from '@/src/components/TextComponent';
import { PedidoCardCliente } from '@/src/components/CardComponents';
import api from '@/src/services/api';
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

type PedidoDetalhado = {
  _id: string;
  precoTotal: number;
  itensPedido: ItemPedido[];
  status: string;
  dataPedido: string;
};

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadPedidos = async () => {
        try {
          setLoading(true);

          const userId = await getSecureItem('userId');

          const response = await api.get(`/pedidos/usuarios/${userId}`);
          
          const pedidosList = Array.isArray(response.data) ? response.data : response.data.pedidos;

          const detalhes = await Promise.all(
            pedidosList.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
          );

          const detalhesPedidos = detalhes.map((res) => res.data.pedido);
          setPedidos(detalhesPedidos);
        } catch (error: any) {
          if (error.response?.status === 404) {
            // Nenhum pedido encontrado
            setPedidos([]);
          } else {
            console.error('Erro ao buscar pedidos do usuário:', error);
          }
        } finally {
          setLoading(false);
        }
      };

      loadPedidos();
    }, [])
  );

  return (
    <GenericContainer>
      <Heading1 className="m-5">Meus pedidos</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" />
      ) : pedidos.length === 0 ? (
        <Heading3 className="text-center text-gray-500 mt-10">
          Você ainda não fez nenhum pedido.
        </Heading3>
      ) : (
        <ScrollView className="px-4">
          {pedidos.map((pedido) => (
            <PedidoCardCliente
              key={pedido._id}
              nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
              preco={pedido.precoTotal?.toFixed(2)}
              imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
              dataPedido={new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
            />
          ))}
        </ScrollView>
      )}
    </GenericContainer>
  );
};

export default MeusPedidos;
