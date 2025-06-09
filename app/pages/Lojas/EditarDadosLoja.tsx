import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'

const EditarDadosLoja = () => {
  return (
    <GenericContainer>
      <ReturnButton className='m-5' />
      <Heading1 className='text-center'>
        Editar suas informações:
      </Heading1>

      <ScrollView className='m-5'>
        <TextInputComponent label={'Nome da sua loja:'} />
        <TextInputComponent label={'Rede da sua loja:'} />
        <TextInputComponent label={'E-mail:'} />
        <TextInputComponent label={'CEP:'} />
        <TextInputComponent label={'Rua:'} />
        <TextInputComponent label={'Bairro:'} />
        <TextInputComponent label={'Estado:'} />
        <TextInputComponent label={'Cidade:'} />
        <TextInputComponent label={'Número:'} />
        <TextInputComponent label={'Complemento:'} />
      </ScrollView>
    </GenericContainer>
  )
}

export default EditarDadosLoja

const styles = StyleSheet.create({})