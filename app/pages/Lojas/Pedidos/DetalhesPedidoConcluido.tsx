import { View } from 'react-native';
import React from 'react';
import GenericContainer from '@/src/components/ViewComponents';
import { PedidoDetalhesCard } from '@/src/components/CardComponents';
import { Heading1 } from '@/src/components/TextComponent';
import { ReturnButton } from "@/src/components/ButtonsComponent";
import { useLocalSearchParams } from 'expo-router';

const DetalhesPedidoConcluido = () => {
  const { idPedido, nome, preco, cliente, quantidade } = useLocalSearchParams();

  return (
    <GenericContainer>
      <ReturnButton className='m-5' />
      <Heading1 className='m-5'>
        Gerencie seus pedidos:
      </Heading1>

      <PedidoDetalhesCard
        pedido={{
          titulo: 'Pedido Concluído',
          numero: String(idPedido ?? 'N/A'),
          produto: String(nome ?? 'Produto'),
          preco: String(preco ?? '0,00'),
          quantidade: String(quantidade ?? '1'),
          cliente: String(cliente ?? 'Cliente'),
        }}
      />
    </GenericContainer>
  );
};

export default DetalhesPedidoConcluido;
