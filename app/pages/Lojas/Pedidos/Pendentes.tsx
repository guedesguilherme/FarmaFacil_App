import { ScrollView, ActivityIndicator, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1 } from '@/src/components/TextComponent';
import { PedidoCard } from '@/src/components/CardComponents';
import { useRouter } from 'expo-router';
import api from '@/src/services/api';

// Tipagem dos pedidos
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

const Pendentes = () => {
  const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        const response = await api.get('/pedidos/farmacia/684f0d1727a22163bcc3af02');
        const pedidos = Array.isArray(response.data) ? response.data : response.data.pedidos;

        const detalhes = await Promise.all(
          pedidos.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
        );

        const detalhesPedidos = detalhes.map((res) => res.data.pedido);
        const apenasPendentes = detalhesPedidos.filter((p) => p.status === 'Pendente');

        setPedidos(apenasPendentes);
      } catch (error) {
        console.error('Erro ao carregar pedidos pendentes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPedidos();
  }, []);

  const handleNavigate = (pedido: PedidoDetalhado) => {
    router.push({
      pathname: '/pages/Lojas/Pedidos/DetalhesPedidoPendente',
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
      <Heading1 className="m-5">Pedidos pendentes:</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" />
      ) : pedidos.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">Nenhum pedido pendente encontrado</Text>
      ) : (
        <ScrollView>
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

export default Pendentes;
