import React from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { Heading1 } from '@/src/components/TextComponent'
import { useRouter } from 'expo-router';
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent';

const ConfiguracoesLoja = () => {
  const router = useRouter()
  return (
    <GenericContainer>

      <ReturnButton/>

      <Heading1 className='mt-5'>
        Configurações
      </Heading1>

      <PrimaryButton 
        className='mt-12'
        onPress={() => router.push('/pages/Lojas/EditarDadosLoja')}
      >
        Lorem Ipsum
      </PrimaryButton>

      <SecondaryButton 
        className='mt-8'
        onPress={() => router.push('/pages/Lojas/EditarDadosLoja')}
      >
        Editar endereço
      </SecondaryButton>

    </GenericContainer>
  )
}

export default ConfiguracoesLoja
