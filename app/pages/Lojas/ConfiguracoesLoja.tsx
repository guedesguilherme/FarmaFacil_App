import React, { useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import GenericContainer from '@/src/components/ViewComponents'
import { BodyText, Heading1, Heading3 } from '@/src/components/TextComponent'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import api from '@/src/services/api'

interface Farmacia {
  _id: string
  nome: string
  cnpj: string
  rede: string
  email: string
  rua: string
  bairro: string
  numero: string
  cep: string
  uf: string
  cidade: string
}

const ConfiguracoesLoja = () => {
  const router = useRouter()
  const [farmacia, setFarmacia] = useState<Farmacia | null>(null)

  useEffect(() => {
    const carregarDadosFarmacia = async () => {
      try {
        const token = await SecureStore.getItemAsync('token')
        const id = await SecureStore.getItemAsync('id_farmacia')

        if (!token || !id) {
          Alert.alert('Erro', 'Token ou ID da farmácia não encontrados.')
          return
        }

        const response = await api.get(`/farma/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const dados = response.data?.farma
        if (dados) {
          setFarmacia(dados)
        } else {
          Alert.alert('Erro', 'Dados da farmácia não encontrados.')
        }
      } catch (error) {
        console.error('Erro ao buscar farmácia:', error)
        Alert.alert('Erro', 'Falha ao buscar dados da farmácia.')
      }
    }

    carregarDadosFarmacia()
  }, [])

  const handleEditarDados = () => {
    router.push('/pages/Lojas/EditarDadosLoja')
  }

  return (
    <GenericContainer>
      <ReturnButton />

      <Heading1 className="mt-5">Configurações</Heading1>

      <PrimaryButton className="mt-12" onPress={handleEditarDados}>
        Lorem Ipsum
      </PrimaryButton>

      <SecondaryButton className="mt-8" onPress={handleEditarDados}>
        Editar endereço
      </SecondaryButton>

      <ScrollView className="mt-10">
        {farmacia ? (
          <>
            <Heading3>CNPJ</Heading3>
            <BodyText>{farmacia.cnpj}</BodyText>

            <Heading3 className="mt-4">Nome</Heading3>
            <BodyText>{farmacia.nome}</BodyText>

            <Heading3 className="mt-4">Rede</Heading3>
            <BodyText>{farmacia.rede}</BodyText>

            <Heading3 className="mt-4">E-mail</Heading3>
            <BodyText>{farmacia.email}</BodyText>

            <Heading3 className="mt-4">Endereço</Heading3>
            <BodyText>
              {`${farmacia.rua}, ${farmacia.numero} - ${farmacia.bairro}, ${farmacia.cidade} - ${farmacia.uf}, ${farmacia.cep}`}
            </BodyText>
          </>
        ) : (
          <BodyText>Carregando dados da farmácia...</BodyText>
        )}
      </ScrollView>
    </GenericContainer>
  )
}

export default ConfiguracoesLoja
