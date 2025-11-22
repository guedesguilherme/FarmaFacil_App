import { View, Text, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { PedidoDetalhesCard } from '@/src/components/CardComponents';
import { Heading1, Heading2, BodyText } from '@/src/components/TextComponent';
import { ReturnButton, PrimaryButton } from "@/src/components/ButtonsComponent";
import { TextInputComponent } from '@/src/components/TextInputComponents';
import { useLocalSearchParams, router } from 'expo-router';
import api from '@/src/services/api';
import { Ionicons } from '@expo/vector-icons';

const DetalhesPedidoPendente = () => {
  const { idPedido, nome, preco, cliente, quantidade } = useLocalSearchParams();

  const [pedidoAtualizado, setPedidoAtualizado] = useState<any>(null);
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchPedido = async (isBackgroundUpdate = false) => {
      try {
        if (!isBackgroundUpdate) setLoading(true);
        const response = await api.get(`/pedidos/${idPedido}`);
        setPedidoAtualizado(response.data.pedido);
      } catch (error) {
        console.error("Erro ao buscar detalhes do pedido", error);
      } finally {
        setLoading(false);
      }
    };

    if (idPedido) {
      fetchPedido();
      intervalId = setInterval(() => {
        fetchPedido(true);
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [idPedido]);

  const confirmarRetirada = async () => {
    if (!codigo || codigo.length < 4) {
      Alert.alert('Código Inválido', 'Por favor, insira o código de 4 dígitos informado pelo entregador.');
      return;
    }

    setLoadingSubmit(true);

    try {
      await api.put(`/pedidos/${idPedido}/farmacia`, {
        status: 'A caminho',
        codigo: codigo
      });

      Alert.alert('Sucesso', 'Pedido liberado para o entregador!');
      
      const response = await api.get(`/pedidos/${idPedido}`);
      setPedidoAtualizado(response.data.pedido);
      
    } catch (error: any) {
      let msg = 'Não foi possível confirmar a retirada.';

      if (error.response) {
        if (error.response.status === 401) {
            msg = 'O código informado está incorreto. Verifique com o entregador.';
        } else {
            msg = error.response.data?.msg || 'Erro no servidor.';
        }
      } else if (error.request) {
        msg = 'Sem resposta do servidor. Verifique sua conexão.';
      }

      Alert.alert('Atenção', msg);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) {
    return (
      <GenericContainer>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={45} color="#2f88ff" />
        </View>
      </GenericContainer>
    );
  }

  const entregador = pedidoAtualizado?.entregador;
  const status = pedidoAtualizado?.status;

  const getStatusUI = () => {
    if (status === 'A caminho') {
      return {
        color: 'bg-green-50 border-green-200',
        textColor: 'text-green-700',
        icon: 'bicycle',
        iconColor: '#16a34a',
        title: 'Pedido em Trânsito',
        description: `O entregador ${entregador?.nome} já retirou o pedido e está a caminho do cliente.`
      };
    } else if (entregador) {
      return {
        color: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-700',
        icon: 'person',
        iconColor: '#2f88ff',
        title: 'Entregador na Loja',
        description: `O entregador ${entregador?.nome} aceitou o pedido. Solicite o código para liberar a entrega.`
      };
    } else {
      return {
        color: 'bg-amber-50 border-amber-200',
        textColor: 'text-amber-700',
        icon: 'time-outline',
        iconColor: '#f59e0b',
        title: 'Aguardando Entregador',
        description: 'O pedido está visível para os entregadores. Aguarde alguém aceitar a corrida.'
      };
    }
  };

  const uiConfig = getStatusUI();

  return (
    <GenericContainer>
      <ReturnButton className='m-5' />
      
      {/* --- CORREÇÃO DO TECLADO AQUI --- */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Compensa o Header
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 150 }} // Espaço extra no final
          keyboardShouldPersistTaps="handled" // Permite clicar no botão com teclado aberto
        >
          
          <Heading1 className='text-center mb-6'>
            Detalhes do Pedido
          </Heading1>

          <PedidoDetalhesCard
            pedido={{
              titulo: status === 'A caminho' ? 'Pedido em Trânsito' : 'Pedido Pendente',
              numero: String(idPedido ?? 'N/A'),
              produto: String(nome ?? 'Produto'),
              preco: String(preco ?? '0,00'),
              quantidade: String(quantidade ?? '1'),
              cliente: String(cliente ?? 'Cliente'),
            }}
          />

          <View className="mt-6 px-1">
            <Heading2 className="mb-3 text-slate-700">Status da Entrega</Heading2>

            <View className={`p-4 rounded-xl border mb-6 ${uiConfig.color}`}>
              <View className="flex-row items-center mb-2">
                <Ionicons 
                  name={uiConfig.icon as any} 
                  size={24} 
                  color={uiConfig.iconColor} 
                  style={{ marginRight: 10 }}
                />
                <Text className={`font-bold text-lg ${uiConfig.textColor}`}>
                  {uiConfig.title}
                </Text>
              </View>
              
              <Text className="text-slate-600 font-poppins_regular">
                {uiConfig.description}
              </Text>
            </View>

            {entregador && status === 'Pendente' && (
              <View className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <Heading2 className="mb-2 text-slate-800">Liberar Pedido</Heading2>
                <BodyText className="mb-4 text-slate-500 text-sm">
                  Insira o código informado pelo entregador para confirmar a retirada.
                </BodyText>

                <TextInputComponent
                  label="Código do Entregador"
                  value={codigo}
                  onChangeText={setCodigo}
                  placeholder="Ex: 6158"
                  keyboardType="numeric"
                  maxLength={4}
                  rightIcon={<Ionicons name="key-outline" size={20} color="#64748b" />}
                />

                <View className="mt-4">
                  <PrimaryButton onPress={confirmarRetirada} disabled={loadingSubmit}>
                    {loadingSubmit ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text>Confirmar Retirada</Text>
                    )}
                  </PrimaryButton>
                </View>
              </View>
            )}

            {status === 'A caminho' && (
                <View className="mt-2">
                    <PrimaryButton onPress={() => router.replace('/pages/Lojas/Pedidos/Pendentes')}>
                        <Text>Voltar para Lista</Text>
                    </PrimaryButton>
                </View>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GenericContainer>
  );
};

export default DetalhesPedidoPendente;