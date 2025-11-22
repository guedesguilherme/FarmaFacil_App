import React, { useCallback, useState } from 'react'
import { Alert, ScrollView, ActivityIndicator, Text, View, TouchableOpacity, Modal } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { FontAwesome } from '@expo/vector-icons'

import GenericContainer from '@/src/components/ViewComponents'
import { Heading1, Heading2, Heading3, BodyText } from '@/src/components/TextComponent'
import { ReturnButton, DangerButton, SecondaryButton } from '@/src/components/ButtonsComponent'
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

// Componente auxiliar ajustado para usar BodyText e fontes do app
const InfoRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <View className="flex-row items-center mb-4">
    <View className="w-8 items-center justify-center mr-3">
      <FontAwesome name={icon as any} size={20} color="#2f88ff" />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-500 font-poppins_bold uppercase tracking-wider mb-1">{label}</Text>
      <BodyText className="text-slate-800">{value}</BodyText>
    </View>
  </View>
)

const ConfiguracoesLoja = () => {
  const router = useRouter()
  const [farmacia, setFarmacia] = useState<Farmacia | null>(null)
  const [loading, setLoading] = useState(true)
  
  const [open, setOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const carregarDadosFarmacia = async () => {
    try {
      setLoading(true)
      const token = await SecureStore.getItemAsync('token')
      const id = await SecureStore.getItemAsync('id_farmacia')

      if (!token || !id) {
        Alert.alert('Erro', 'Sessão inválida.')
        router.replace('/IndexLoja')
        return
      }

      const response = await api.get(`/farma/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data?.farma) {
        setFarmacia(response.data.farma)
      }
    } catch (error) {
      console.error('Erro ao buscar farmácia:', error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarDadosFarmacia()
    }, [])
  )

  const handleEncerrarSessao = async () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          onPress: async () => {
            await SecureStore.deleteItemAsync('token')
            await SecureStore.deleteItemAsync('id_farmacia')
            router.replace('/IndexLoja')
          }
        }
      ]
    )
  }

  const deletarFarmacia = async () => {
    setDeleteLoading(true)
    try {
      const id = await SecureStore.getItemAsync('id_farmacia')
      await api.delete(`/farma/${id}`)
      
      Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.')
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('id_farmacia')
      setOpen(false)
      router.replace('/IndexLoja')

    } catch (error) {
      Alert.alert('Erro', `Não foi possível deletar sua loja.`)
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2f88ff" />
      </View>
    )
  }

  return (
    <GenericContainer>
      <ReturnButton />
      
      <View className="px-2 mb-6 mt-4">
        <Heading1>Configurações</Heading1>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {farmacia && (
          <>
            {/* CARD 1: Identidade */}
            <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 mx-1">
              <View className="flex-row items-center mb-6 border-b border-slate-100 pb-4">
                <View className="h-12 w-12 bg-blue-50 rounded-full items-center justify-center mr-4">
                  <FontAwesome name="hospital-o" size={24} color="#2f88ff" />
                </View>
                <View className="flex-1">
                  <Heading3>{farmacia.nome}</Heading3>
                  <BodyText className="text-slate-500">{farmacia.rede}</BodyText>
                </View>
              </View>

              <InfoRow icon="id-card-o" label="CNPJ" value={farmacia.cnpj} />
              <InfoRow icon="envelope-o" label="E-mail" value={farmacia.email} />
            </View>

            {/* CARD 2: Endereço */}
            <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8 mx-1">
              <View className="flex-row justify-between items-center mb-4">
                <Heading3>Endereço</Heading3>
                
                {/* Botão de editar discreto */}
                <TouchableOpacity 
                  onPress={() => router.push('/pages/Lojas/EditarDadosLoja')}
                  className="flex-row items-center"
                >
                  <Text className="text-primaryBlue font-poppins_bold mr-1">Editar</Text>
                  <FontAwesome name="pencil" size={14} color="#2f88ff" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-start">
                <View className="w-8 pt-1 mr-3 items-center">
                  <FontAwesome name="map-marker" size={24} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <BodyText>
                    {farmacia.rua}, {farmacia.numero}
                  </BodyText>
                  <BodyText className="text-slate-600">
                    {farmacia.bairro}
                  </BodyText>
                  <BodyText className="text-slate-600">
                    {farmacia.cidade} - {farmacia.uf}
                  </BodyText>
                  <Text className="text-slate-500 font-poppins_regular text-sm mt-1">
                    CEP: {farmacia.cep}
                  </Text>
                </View>
              </View>
            </View>

            {/* Botões de Ação usando os Componentes Padrão */}
            <View className="gap-4">
              <SecondaryButton onPress={handleEncerrarSessao}>
                <Text>Encerrar Sessão</Text>
              </SecondaryButton>

              <DangerButton onPress={() => setOpen(true)}>
                <Text>Excluir Conta</Text>
              </DangerButton>
            </View>
          </>
        )}
      </ScrollView>

      {/* Modal mantendo o estilo original dos botões lado a lado */}
      <Modal animationType='slide' transparent={false} visible={open}>
        <View className='flex-1 justify-center items-center m-5'>
          <Heading2 className='text-center mx-3 mb-6'>
            Deseja mesmo deletar sua conta?
          </Heading2>
          
          <Text className="text-center text-slate-500 font-poppins_regular mb-8 px-4">
            Essa ação não pode ser desfeita e todos os seus dados serão perdidos.
          </Text>

          <View className='flex flex-row items-center justify-center gap-10 w-full'>
            <TouchableOpacity
              className='border-2 border-primaryBlue p-4 rounded-lg w-[40%] flex items-center justify-center'
              onPress={() => setOpen(false)}
            >
              <Text className='text-primaryBlue font-poppins_bold text-lg'>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className='border-2 border-red-500 p-4 rounded-lg w-[40%] flex items-center justify-center'
              onPress={deletarFarmacia}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <ActivityIndicator color="#f00" />
              ) : (
                <Text className='font-poppins_bold text-red-500 text-lg'>Sim</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GenericContainer>
  )
}

export default ConfiguracoesLoja