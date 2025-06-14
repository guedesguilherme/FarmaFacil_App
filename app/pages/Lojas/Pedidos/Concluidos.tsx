import { View } from 'react-native'
import React from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { Heading1 } from '@/src/components/TextComponent'
import { PedidoCard } from '@/src/components/CardComponents'
import { useRouter } from 'expo-router'

const Concluidos = () => {
  const router = useRouter()

  const handleNavigate = () => {
    router.push({
      pathname: '/pages/Lojas/Pedidos/DetalhesPedido',
      params: {
        nome: 'Benegripe',
        preco: '38,00',
        cliente: 'João da Silva',
      },
    })
  }

  return (
    <GenericContainer>
      <Heading1 className='m-5'>
        Pedidos concluídos:
      </Heading1>

      <PedidoCard
        nome="Benegripe"
        preco="38,00"
        cliente="João da Silva"
        imgUrl=""
        onPress={handleNavigate}
      />
    </GenericContainer>
  )
}

export default Concluidos
