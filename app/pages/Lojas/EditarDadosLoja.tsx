import React, { useEffect, useState } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import GenericContainer from '@/src/components/ViewComponents'
import { DangerButton, PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import ListItemComponent from '@/src/components/ListComponents'
import api from '@/src/services/api'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

interface FormData {
  rua: string
  bairro: string
  numero: string
  cep: string
  uf: string
  cidade: string
}

const EditarDadosLoja = () => {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    rua: '',
    bairro: '',
    numero: '',
    cep: '',
    uf: '',
    cidade: '',
  })

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = await SecureStore.getItemAsync('token')
        const id = await SecureStore.getItemAsync('id_farmacia')

        if (!token || !id) {
          Alert.alert('Erro', 'Token ou ID da farmácia não encontrado.')
          return
        }

        const response = await api.get(`/farma/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const farma = response.data?.farma
        if (farma) {
          setFormData({
            rua: farma.rua || '',
            bairro: farma.bairro || '',
            numero: farma.numero || '',
            cep: farma.cep || '',
            uf: farma.uf || '',
            cidade: farma.cidade || '',
          })
        }
      } catch (error) {
        console.error(error)
        Alert.alert('Erro', 'Falha ao carregar dados da farmácia.')
      }
    }

    carregarDados()
  }, [])

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSalvar = async () => {
    try {
      const token = await SecureStore.getItemAsync('token')
      const id = await SecureStore.getItemAsync('id_farmacia')

      if (!token || !id) {
        Alert.alert('Erro', 'Token ou ID da farmácia não encontrado.')
        return
      }

      const response = await api.patch(`/farma/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      Alert.alert('Sucesso', response.data?.msg || 'Alterações salvas.')
      router.back()
    } catch (error: any) {
      console.error(error)
      const msg = error.response?.data?.msg || 'Erro ao salvar alterações.'
      Alert.alert('Erro', msg)
    }
  }

  const handleDescartar = () => {
    router.back()
  }

  return (
    <GenericContainer>
      <ReturnButton />
      <Heading1 className="mt-5">Editar suas informações</Heading1>

      <ScrollView className="mt-8 flex-col gap-2">
        <ListItemComponent
          label="Rua"
          value={formData.rua}
          onChangeText={(value: string) => handleChange('rua', value)}
        />
        <ListItemComponent
          label="Bairro"
          value={formData.bairro}
          onChangeText={(value: string) => handleChange('bairro', value)}
        />
        <ListItemComponent
          label="N°"
          value={formData.numero}
          onChangeText={(value: string) => handleChange('numero', value)}
        />
        <ListItemComponent
          label="CEP"
          value={formData.cep}
          onChangeText={(value: string) => handleChange('cep', value)}
        />
        <ListItemComponent
          label="UF"
          value={formData.uf}
          onChangeText={(value: string) => handleChange('uf', value)}
        />
        <ListItemComponent
          label="Cidade"
          value={formData.cidade}
          onChangeText={(value: string) => handleChange('cidade', value)}
        />
      </ScrollView>

      <PrimaryButton className="mt-8" onPress={handleSalvar}>
        Salvar Alterações
      </PrimaryButton>
      <DangerButton className="mt-4" onPress={handleDescartar}>
        Descartar Alterações
      </DangerButton>
    </GenericContainer>
  )
}

export default EditarDadosLoja
