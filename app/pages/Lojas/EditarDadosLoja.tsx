import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { DangerButton, PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import ListItemComponent from '@/src/components/ListComponents'

const EditarDadosLoja = () => {
  return (
    <GenericContainer>
      <ReturnButton/>
      <Heading1 className='mt-5'>
        Editar suas informações
      </Heading1>

      <View className='mt-8 flex-col gap-2'>
        <ListItemComponent
          label='Rua'
          placeholder='XPTO'
        />
        <ListItemComponent
          label='Bairro'
          placeholder='XPTO'
        />
        <ListItemComponent
          label='N°'
          placeholder='XPTO'
        />
        <ListItemComponent
          label='CEP'
          placeholder='XPTO'
        />
        <ListItemComponent
          label='UF'
          placeholder='XPTO'
        />
        <ListItemComponent
          label='Cidade'
          placeholder='XPTO'
        />
      </View>

      <PrimaryButton className='mt-8'>Salvar Alterações</PrimaryButton>
      <DangerButton className='mt-4'>Descartar Alterações</DangerButton>

    </GenericContainer>
  )
}

export default EditarDadosLoja