import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { InputComponent } from '@/src/components/InputComponent'
import { useRouter } from 'expo-router'
import GenericContainer, { ButtonsArea, Form } from '@/src/components/ViewComponents'

const CadastroLoja1 = () => {
  const router = useRouter()
  return (
    <GenericContainer>
      <ReturnButton className='m-5' />

      <Heading1 className='text-center'>
        Cadastro de Lojas
      </Heading1>

      <Form>
        <InputComponent label='Nome da sua loja:' />
        <InputComponent label='CNPJ da sua loja:' />
        <InputComponent label='E-mail da sua loja:' />
        <InputComponent label='Rede da sua loja:' />

        <ButtonsArea>
          <PrimaryButton onPress={() => router.push('/auth/Loja/CadastroLoja2')}>
            <Heading1>
              Próxima
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

export default CadastroLoja1
