import { View, Text } from 'react-native'
import React from 'react'
import GenericContainer, { BorderContainer } from '@/src/components/ViewComponents'
import { Heading1 } from '@/src/components/TextComponent'

const Concluidos = () => {
  return (
    <GenericContainer>
      <Heading1 className='m-5'>
        Pedidos concluídos:
      </Heading1>
      <BorderContainer>
        <Text>Texto aqui</Text>
      </BorderContainer>
    </GenericContainer>
  )
}

export default Concluidos