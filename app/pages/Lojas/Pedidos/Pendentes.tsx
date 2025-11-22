import { ScrollView, ActivityIndicator, View, Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1, Heading2, Heading3, BodyText } from '@/src/components/TextComponent';
import { PedidoCard } from '@/src/components/CardComponents';
import { router } from 'expo-router';
import api from '@/src/services/api';
import { getSecureItem } from '@/utils/secureStore';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// --- TIPAGEM ATUALIZADA ---
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

type Entregador = {
  _id: string;
  nome: string;
} | null;

type PedidoDetalhado = {
  _id: string;
  precoTotal: number;
  usuario: Usuario;
  itensPedido: ItemPedido[];
  status: string;
  entregador?: Entregador; // Campo novo
};

const Pendentes = () => {
  const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]);
  const [loading, setLoading] = useState(true);

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

            // Filtra pedidos que estão ativos (Pendente ou A caminho)
            // Ignora 'Concluido' ou 'Cancelado' nesta tela
            const pedidosAtivos = todosPedidos.filter((p) => 
              p && (p.status === 'Pendente' || p.status === 'A caminho')
            );

            setPedidos(pedidosAtivos);
          } else {
            setPedidos([]);
          }

        } catch (error) {
          console.error('Erro ao carregar pedidos:', error);
        } finally {
          setLoading(false);
        }
      };

      loadPedidos();
    }, [])
  );

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

  // Separação Lógica
  const aguardandoEntregador = pedidos.filter(p => !p.entregador);
  const aceitosPorEntregador = pedidos.filter(p => p.entregador);

  return (
    <GenericContainer>
      <Heading1 className="m-5">Gerenciar Pedidos</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" className="mt-10" />
      ) : pedidos.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-10 px-5">
          <Ionicons name="file-tray-outline" size={60} color="#cbd5e1" />
          <Heading3 className="text-center text-gray-500 mt-4">
            Nenhum pedido ativo no momento.
          </Heading3>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          
          {/* SEÇÃO 1: ACEITOS (A CAMINHO) */}
          {aceitosPorEntregador.length > 0 && (
            <View className="mb-8">
              <View className="flex-row items-center mb-3">
                <Ionicons name="bicycle" size={24} color="#2f88ff" style={{ marginRight: 8 }} />
                <Heading2 className="text-slate-700">A caminho / Aceitos</Heading2>
              </View>
              
              {aceitosPorEntregador.map((pedido) => (
                <View key={pedido._id} className="mb-4">
                  {/* Badge do Entregador */}
                  <View className="bg-blue-50 px-4 py-2 rounded-t-xl border-t border-x border-blue-100 flex-row items-center">
                    <Ionicons name="person" size={16} color="#2f88ff" style={{ marginRight: 6 }} />
                    <Text className="text-blue-600 font-bold text-xs">
                      Entregador: {pedido.entregador?.nome}
                    </Text>
                  </View>
                  
                  {/* Card */}
                  <View className="bg-white border-b border-x border-slate-200 rounded-b-xl overflow-hidden">
                    <PedidoCard
                      nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
                      preco={pedido.precoTotal?.toFixed(2)}
                      cliente={pedido.usuario?.nome ?? 'Cliente'}
                      imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
                      onPress={() => handleNavigate(pedido)}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SEÇÃO 2: AGUARDANDO (PENDENTES) */}
          {aguardandoEntregador.length > 0 && (
            <View className="mb-8">
              <View className="flex-row items-center mb-3">
                <Ionicons name="time-outline" size={24} color="#f59e0b" style={{ marginRight: 8 }} />
                <Heading2 className="text-slate-700">Aguardando Entregador</Heading2>
              </View>

              {aguardandoEntregador.map((pedido) => (
                <View key={pedido._id} className="mb-4 relative">
                  {/* Indicador lateral laranja */}
                  <View className="absolute left-0 top-4 bottom-4 w-1 bg-amber-400 rounded-r-full z-10" />
                  
                  <PedidoCard
                    nome={pedido.itensPedido[0]?.product?.nome ?? 'Produto'}
                    preco={pedido.precoTotal?.toFixed(2)}
                    cliente={pedido.usuario?.nome ?? 'Cliente'}
                    imgUrl={pedido.itensPedido[0]?.product?.imagem_url}
                    onPress={() => handleNavigate(pedido)}
                  />
                </View>
              ))}
            </View>
          )}

        </ScrollView>
      )}
    </GenericContainer>
  );
};

export default Pendentes;