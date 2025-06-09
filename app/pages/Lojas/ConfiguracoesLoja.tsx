import { Button, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { Heading1 } from '@/src/components/TextComponent'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import ListItemComponent from '@/src/components/ListComponents'
import { useRouter } from 'expo-router';

const ConfiguracoesLoja = () => {
  const router = useRouter()
  return (
    <GenericContainer>
      <Heading1 className='m-5'>
        Configurações
      </Heading1>

      <ScrollView className='m-5 flex-col'>
        <ListItemComponent
          onPress={() => router.push('/pages/Lojas/EditarDadosLoja')}
          titulo='Editar suas informações'
          icone={<AntDesign name='edit' size={24} color='gray' />}
        />
        <Button title='Encerrar sesão' />
      </ScrollView>
    </GenericContainer>
  )
}

export default ConfiguracoesLoja
