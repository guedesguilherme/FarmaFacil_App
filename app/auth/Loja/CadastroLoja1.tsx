import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
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
        <TextInputComponent label='Nome da sua loja:' />
        <TextInputComponent label='CNPJ da sua loja:' />
        <TextInputComponent label='E-mail da sua loja:' />
        <TextInputComponent label='Rede da sua loja:' />

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
