import { ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1, Heading2, Heading3, BodyText } from '@/src/components/TextComponent';
import { PedidoCardCliente } from '@/src/components/CardComponents';
import api from '@/src/services/api';
import { useFocusEffect } from '@react-navigation/native';
import { getSecureItem } from '@/utils/secureStore';
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

// Tipos (mantendo a tipagem para segurança)
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

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadPedidos = async () => {
        try {
          setLoading(true);
          const userId = await getSecureItem('userId');
          
          // Busca lista de IDs
          const response = await api.get(`/pedidos/usuarios/${userId}`);
          const pedidosList = Array.isArray(response.data) ? response.data : response.data.pedidos || [];

          // Busca detalhes de cada pedido
          if (pedidosList.length > 0) {
            const detalhes = await Promise.all(
              pedidosList.map((p: { _id: string }) => api.get(`/pedidos/${p._id}`))
            );
            const detalhesPedidos = detalhes.map((res) => res.data.pedido);
            // Ordena por data (mais recente primeiro)
            setPedidos(detalhesPedidos.reverse());
          } else {
            setPedidos([]);
          }
        } catch (error: any) {
          if (error.response?.status === 404) {
            setPedidos([]);
          } else {
            console.error('Erro ao buscar pedidos:', error);
          }
        } finally {
          setLoading(false);
        }
      };

      loadPedidos();
    }, [])
  );

  const handleNavigate = (pedido: PedidoDetalhado) => {
    // Se estiver concluído, pode ir para uma tela de detalhes simples ou a mesma de acompanhar
    // Se estiver pendente/a caminho, vai para acompanhar
    router.push({
      pathname: '/pages/Produtos/AcompanharPedido',
      params: { id: pedido._id },
    });
  };

  // Filtros
  const ativos = pedidos.filter(p => p.status === 'Pendente' || p.status === 'A caminho');
  const historico = pedidos.filter(p => p.status === 'Concluido');

  // Função auxiliar para estilização do status
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'A caminho':
        return {
          color: '#2f88ff', // Azul
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bicycle',
          label: 'A caminho'
        };
      case 'Pendente':
        return {
          color: '#f59e0b', // Laranja/Amber
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'time-outline',
          label: 'Em separação'
        };
      case 'Concluido':
        return {
          color: '#16a34a', // Verde
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'checkmark-circle',
          label: 'Entregue'
        };
      default:
        return {
          color: '#64748b',
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          icon: 'help-circle-outline',
          label: status
        };
    }
  };

  // Componente interno para renderizar o item com o estilo correto
  const RenderPedidoItem = ({ pedido }: { pedido: PedidoDetalhado }) => {
    const config = getStatusConfig(pedido.status);
    
    return (
      <View className="mb-4">
        {/* Cabeçalho do Status */}
        <View className={`flex-row items-center px-4 py-2 rounded-t-xl border-t border-x ${config.border} ${config.bg}`}>
          <Ionicons name={config.icon as any} size={18} color={config.color} style={{ marginRight: 6 }} />
          <Text style={{ color: config.color, fontWeight: 'bold', fontSize: 14 }}>
            {config.label}
          </Text>
        </View>

        {/* Card do Conteúdo (Removemos a margem superior do card original para colar no header) */}
        <View className={`border-b border-x rounded-b-xl ${config.border} bg-white overflow-hidden`}>
          <PedidoCardCliente
            onPress={() => handleNavigate(pedido)}
            nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
            preco={pedido.precoTotal?.toFixed(2)}
            imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
            dataPedido={new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
            status="" // Passamos vazio pois já tratamos o status visualmente acima
          />
        </View>
      </View>
    );
  };

  return (
    <GenericContainer>
      <Heading1 className="m-5">Meus pedidos</Heading1>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2f88ff" />
        </View>
      ) : pedidos.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-10 px-5">
          <Ionicons name="basket-outline" size={60} color="#cbd5e1" />
          <Heading3 className="text-center text-gray-500 mt-4">
            Você ainda não fez nenhum pedido.
          </Heading3>
        </View>
      ) : (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          
          {/* Seção: Em Andamento */}
          {ativos.length > 0 && (
            <View className="mb-6">
              <Heading2 className="mb-3 text-slate-700">Em andamento</Heading2>
              {ativos.map((pedido) => (
                <RenderPedidoItem key={pedido._id} pedido={pedido} />
              ))}
            </View>
          )}

          {/* Seção: Histórico */}
          {historico.length > 0 && (
            <View className="mb-10">
              <Heading2 className="mb-3 text-slate-700">Histórico</Heading2>
              {historico.map((pedido) => (
                <RenderPedidoItem key={pedido._id} pedido={pedido} />
              ))}
            </View>
          )}

        </ScrollView>
      )}
    </GenericContainer>
  );
};

export default MeusPedidos;