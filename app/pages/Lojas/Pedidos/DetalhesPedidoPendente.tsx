import { View } from 'react-native';
import React from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { PedidoDetalhesCard } from '@/src/components/CardComponents';
import { Heading1 } from '@/src/components/TextComponent';
import { ReturnButton, ActionButton } from "@/src/components/ButtonsComponent";
import { useLocalSearchParams } from 'expo-router';

const DetalhesPedidoPendente = () => {
  const { idPedido, nome, preco, cliente, quantidade } = useLocalSearchParams();

  const marcarComoConcluido = () => {
    console.log('Pedido marcado como concluído');
  };

  return (
    <GenericContainer>
      <ReturnButton className='m-5' />
      <Heading1 className='m-5'>
        Gerencie seus pedidos:
      </Heading1>
      <PedidoDetalhesCard
        pedido={{
          titulo: 'Pedido Pendente',
          numero: String(idPedido ?? 'N/A'),
          produto: String(nome ?? 'Produto'),
          preco: String(preco ?? '0,00'),
          quantidade: String(quantidade ?? '1'),
          cliente: String(cliente ?? 'Cliente'),
        }}
      />
      <View className="absolute bottom-0 left-0 right-0">
        <ActionButton onPress={marcarComoConcluido} />
      </View>
    </GenericContainer>
  );
};

export default DetalhesPedidoPendente;
