import { ScrollView, ActivityIndicator, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1, Heading3, BodyText, Heading2 } from '@/src/components/TextComponent';
import { PedidoCardCliente } from '@/src/components/CardComponents';
import api from '@/src/services/api';
import { useFocusEffect } from '@react-navigation/native';
import { getSecureItem } from '@/utils/secureStore';
import { useRouter } from "expo-router";

// ... Tipos Produto, ItemPedido, PedidoDetalhado ...

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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

  const handleNavigate = (pedido: PedidoDetalhado) => {
    router.push({
      pathname: '/pages/Produtos/AcompanharPedido',
      params: { id: pedido._id },
    });
  };

  // Separar pendentes e concluídos
  const pendentes = pedidos.filter(p => p.status === 'Pendente');
  const concluidos = pedidos.filter(p => p.status === 'Concluido');

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
          {/* Pendentes */}
          {pendentes.length > 0 && (
            <>
              <Heading2>Pendentes</Heading2>
              {pendentes.map((pedido) => (
                <PedidoCardCliente
                  key={pedido._id}
                  onPress={() => handleNavigate(pedido)}
                  nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
                  preco={pedido.precoTotal?.toFixed(2)}
                  imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
                  dataPedido={new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
                  status="Pendente"
                />
              ))}
            </>
          )}

          {/* Concluídos */}
          {concluidos.length > 0 && (
            <>
              <Heading2>Concluídos</Heading2>
              {concluidos.map((pedido) => (
                <View key={pedido._id} style={{ opacity: 0.6 }}>
                  <PedidoCardCliente
                    nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
                    preco={pedido.precoTotal?.toFixed(2)}
                    imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
                    dataPedido={new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
                    status="Concluido"
                  />
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </GenericContainer>
  );
};

export default MeusPedidos;