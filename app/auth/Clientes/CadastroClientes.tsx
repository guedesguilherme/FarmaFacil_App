import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'
import { InputComponent } from '@/src/components/InputComponent'
import { useRouter } from 'expo-router'

const CadastroClientes = () => {
  return (
    <GenericContainer>
      <ReturnButton className='m-5' />

      <Heading1 className='text-center'>
        Cadastro de Clientes
      </Heading1>

      <Form>
        <InputComponent label='Nome:' />
        <InputComponent label='E-mail:' />
        <InputComponent label='Senha:' />        
        <InputComponent label='Repita sua senha:' />
        <ButtonsArea>
          <PrimaryButton>
            <Heading1>
              Cadastrar
            </Heading1>
          </PrimaryButton>
          <SecondaryButton>
            <Heading1>
              Já tenho cadastro
            </Heading1>
          </SecondaryButton>
        </ButtonsArea>
      </Form>

    </GenericContainer>
  )
}

export default CadastroClientes

const styles = StyleSheet.create({})