import React, { useCallback, useState } from 'react'
import { Alert, Button, ScrollView, ActivityIndicator, Text, View, TouchableOpacity, Modal } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import GenericContainer from '@/src/components/ViewComponents'
import { BodyText, Heading1, Heading2, Heading3 } from '@/src/components/TextComponent'
import { PrimaryButton, ReturnButton, DangerButton } from '@/src/components/ButtonsComponent'
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
  const [open, setOpen] = useState(false)
  const [temp, setTemp] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

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

  useFocusEffect(
    useCallback(() => {
      carregarDadosFarmacia()
    }, [])
  )

  const handleEditarDados = () => {
    router.push('/pages/Lojas/EditarDadosLoja')
  }

  const handleEncerrarSessao = async () => {
    try {
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('id_farmacia')
      router.replace('/IndexLoja')
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error)
      Alert.alert('Erro', 'Não foi possível encerrar a sessão.')
    }
  }

  function openModal() {
    setOpen(!open)
  }

  const deletarFarmacia = async () => {
    setTemp(true)
    setDeleteLoading(true)

    try {
      const id = await SecureStore.getItemAsync('id_farmacia')

      api.delete(`/farma/${id}`)
      Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.')
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('id_farmacia')
      router.replace('/IndexLoja')

    } catch (error) {
      setDeleteLoading(false)
      Alert.alert('Erro', `Não foi possível deletar sua loja: ${error}`)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <GenericContainer>
      <ReturnButton />

      <Heading1 className="mt-5">Configurações</Heading1>

      <PrimaryButton className="mt-8" onPress={handleEditarDados}>
        Editar endereço
      </PrimaryButton>

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

        <View className='flex flex-col justify-between gap-5'>
          <DangerButton className="" onPress={openModal}>
            Deletar sua conta
          </DangerButton>
          <Button title='Encerrar sessão' onPress={handleEncerrarSessao} />
        </View>
      </ScrollView>

      <Modal animationType='slide' transparent={false} visible={open}>
        <View className='flex-1 justify-center items-center m-5'>

          <Heading2 className='text-center mx-3'>
            Deseja mesmo deletar sua conta?
          </Heading2>

          <View className='flex flex-row items-center justify-center gap-20 mt-5 w-full'>
            <TouchableOpacity
              className='border-2 border-primaryBlue p-5 rounded-lg w-[30%] flex items-center justify-center text-center'
              onPress={openModal}
            >
              <Text className='text-primaryBlue font-bold'>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity className='border-2 border-red-500 p-5 rounded-lg w-[30%] flex items-center justify-center text-center'
              onPress={deletarFarmacia}
              disabled={temp}
            >{deleteLoading ? (
              <ActivityIndicator color="#f00" />
            ) : (
              <Text className='font-bold text-red-500'>Sim</Text>
            )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GenericContainer>
  )
}

export default ConfiguracoesLoja
