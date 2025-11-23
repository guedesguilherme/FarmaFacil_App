import { View, Text, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react'; // 1. Importe useCallback
import GenericContainer from '@/src/components/ViewComponents';
import { Heading1 } from '@/src/components/TextComponent';
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent';
import api from '@/src/services/api';
import { getSecureItem } from '@/utils/secureStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter, useFocusEffect } from 'expo-router'; // 2. Importe useFocusEffect

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

  // 3. Substitua useEffect por useFocusEffect
  useFocusEffect(
    useCallback(() => {
      let isActive = true; // Flag para evitar atualização de estado se o componente desmontar
      let intervalId: NodeJS.Timeout;

      const fetchEstoque = async () => {
        try {
          const farmaciaId = await getSecureItem('id_farmacia');
          
          let produtosData: any[] = [];
          let pedidosConcluidos: any[] = [];

          // --- 1. BUSCA PRODUTOS ---
          try {
            const produtosResponse = await api.get(`/produtos/farmacia/${farmaciaId}`);
            produtosData = Array.isArray(produtosResponse.data) ? produtosResponse.data : [];
          } catch (error: any) {
            if (error.response && error.response.status === 404) {
              produtosData = [];
            } else {
              console.error("Erro ao buscar produtos:", error);
            }
          }

          // --- 2. BUSCA PEDIDOS (Se houver produtos) ---
          if (produtosData.length > 0) {
            try {
              const pedidosResponse = await api.get(`/pedidos/farmacia/${farmaciaId}`);
              const listaPedidos = Array.isArray(pedidosResponse.data) ? pedidosResponse.data : [];

              if (listaPedidos.length > 0) {
                const pedidosComDetalhes = await Promise.all(
                  listaPedidos.map((pedido: any) => api.get(`/pedidos/${pedido._id}`))
                );

                pedidosConcluidos = pedidosComDetalhes
                  .map((res) => res.data.pedido)
                  .filter((p) => p && p.status === 'Concluido');
              }
            } catch (error: any) {
              if (error.response && error.response.status === 404) {
                pedidosConcluidos = [];
              } else {
                console.error("Erro ao buscar pedidos:", error);
              }
            }
          }

          // --- 3. CRUZA OS DADOS ---
          const produtosComVendidos = produtosData.map((produto: any) => {
            let vendidos = 0;
            pedidosConcluidos.forEach((pedido) => {
              if (pedido.itensPedido && Array.isArray(pedido.itensPedido)) {
                pedido.itensPedido.forEach((item: any) => {
                  if (item.product && produto && item.product._id === produto._id) {
                    vendidos += item.quantidade;
                  }
                });
              }
            });
            return { ...produto, vendidos };
          });

          if (isActive) {
            setProdutos(produtosComVendidos);
            setLoading(false);
          }

        } catch (error) {
          console.error('Erro geral ao carregar estoque:', error);
          if (isActive) setLoading(false);
        }
      };

      // Chama imediatamente ao entrar na tela
      fetchEstoque();

      // Configura o intervalo para atualizar a cada 10s ENQUANTO a tela estiver focada
      intervalId = setInterval(() => {
        fetchEstoque();
      }, 10000);

      // Função de limpeza: roda quando sai da tela ou o componente desmonta
      return () => {
        isActive = false;
        clearInterval(intervalId);
      };
    }, [])
  );

  return (
    <GenericContainer>
      <ReturnButton className="m-5" />
      <Heading1 className="ml-5 mb-2">Gerencie seu estoque</Heading1>

      {loading ? (
        <ActivityIndicator size="large" color="#2f88ff" className="mt-10" />
      ) : produtos.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-10 px-5">
          <FontAwesome name="dropbox" size={60} color="#cbd5e1" />
          <Text className="text-slate-500 text-lg text-center mt-4 font-poppins_semibold">
            Você ainda não tem produtos cadastrados no estoque.
          </Text>
          <PrimaryButton 
            className="mt-6 w-full" 
            onPress={() => router.push('/pages/Lojas/AdicionarProduto')}
          >
            <Text>Cadastrar primeiro produto</Text>
          </PrimaryButton>
        </View>
      ) : (
        <View className="mx-4 border-2 border-primaryBlue rounded-2xl bg-white overflow-hidden pb-6">
          <View className="flex-row px-4 py-3 bg-blue-100 border-b border-blue-300 items-center">
            <Text className="flex-[2] font-bold text-slate-800">Nome</Text>
            <Text className="flex-1 font-bold text-slate-800 text-center">Estoque</Text>
            <Text className="flex-1 font-bold text-slate-800 text-center">QTD Vendida</Text>
            <View className="flex-1 items-center">
              <Text className="font-bold text-slate-800 text-center">Editar produto</Text>
            </View>
          </View>

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