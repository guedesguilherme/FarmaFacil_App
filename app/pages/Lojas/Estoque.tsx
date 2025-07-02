import { View, Text, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1 } from '@/src/components/TextComponent';
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent';
import api from '@/src/services/api';
import { getSecureItem } from '@/utils/secureStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'

type Produto = {
  _id: string;
  nome: string;
  quantidade: number;
  vendidos: number;
};

const Estoque = () => {

  const router = useRouter()

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemHeight, setItemHeight] = useState(0);

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchEstoque = async () => {
      try {
        const farmaciaId = await getSecureItem('id_farmacia');

        const produtosResponse = await api.get(`/produtos/farmacia/${farmaciaId}`);
        const produtosData = produtosResponse.data;

        const pedidosResponse = await api.get(`/pedidos/farmacia/${farmaciaId}`);
        const pedidosComDetalhes = await Promise.all(
          pedidosResponse.data.map((pedido: any) => api.get(`/pedidos/${pedido._id}`))
        );

        const pedidosConcluidos = pedidosComDetalhes
          .map((res) => res.data.pedido)
          .filter((p) => p.status === 'Concluido');

        const produtosComVendidos = produtosData.map((produto: any) => {
          let vendidos = 0;
          pedidosConcluidos.forEach((pedido) => {
            pedido.itensPedido.forEach((item: any) => {
              if (item.product && produto && item.product._id === produto._id) {
                vendidos += item.quantidade;
              }
            });
          });

          return {
            ...produto,
            vendidos,
          };
        });

        setProdutos(produtosComVendidos);
      } catch (error) {
        console.error('Erro ao carregar estoque:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstoque();

    intervalId = setInterval(() => {
      fetchEstoque();
    }, 10000); // Atualiza a cada 10 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    <GenericContainer>
      <ReturnButton className="m-5" />
      <Heading1 className="ml-5 mb-2">Gerencie seu estoque</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" className="mt-10" />
      ) : (
        <View className="mx-4 border-2 border-primaryBlue rounded-2xl bg-white overflow-hidden pb-6">
          {/* Cabeçalho da tabela */}
          <View className="flex-row px-4 py-3 bg-blue-100 border-b border-blue-300 items-center">
            <Text className="flex-[2] font-bold text-slate-800">Nome</Text>
            <Text className="flex-1 font-bold text-slate-800 text-center">Estoque</Text>
            <Text className="flex-1 font-bold text-slate-800 text-center">QTD Vendida</Text>
            <View className="flex-1 items-center">
              <Text className="font-bold text-slate-800 text-center">Editar produto</Text>
            </View>
          </View>

          {/* Lista com limite de altura dinâmica */}
          <ScrollView
            style={{
              maxHeight: itemHeight
                ? Math.floor((screenHeight * 0.75) / itemHeight) * itemHeight
                : undefined,
            }}
            className="overflow-scroll"
          >
            {produtos.map((produto, index) => (
              <View
                key={produto._id}
                onLayout={index === 0 ? (e) => setItemHeight(e.nativeEvent.layout.height) : undefined}
                className={`flex-row items-center px-4 py-3 border-b border-slate-200 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'
                  }`}
              >
                <Text className="flex-[2] text-slate-800">{produto.nome}</Text>
                <Text className="flex-1 text-center text-slate-700">{produto.quantidade}</Text>
                <Text className="flex-1 text-center text-slate-700">{produto.vendidos}</Text>
                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/pages/Lojas/EditarProduto', params: { id: produto._id } })}
                  className='flex bg-primaryBlue rounded-lg p-3 items-center justify-center'>
                  <FontAwesome name="pencil" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </GenericContainer>
  );
};

export default Estoque;
