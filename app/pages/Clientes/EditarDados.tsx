import { ScrollView, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { getSecureItem } from "../../../utils/secureStore"
import api from '@/src/services/api'
import { router } from 'expo-router'

const EditarDados = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarDados() {
      try {
        const token = await getSecureItem('token')
        const userId = await getSecureItem('userId')
        if (!token || !userId) {
          Alert.alert('Erro', 'Sessão expirada. Faça login novamente.')
          router.replace('/pages/Clientes/Login')
          return
        }
        const response = await api.get(`/usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNome(response.data.user.nome)
        setEmail(response.data.user.email)
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar seus dados.')
      } finally {
        setLoading(false)
      }
    }
    carregarDados()
  }, [])

  const handleEditar = async () => {
    try {
      const token = await getSecureItem('token')
      const userId = await getSecureItem('userId')
      if (!token || !userId) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.')
        router.replace('/pages/Clientes/Login')
        return
      }

      // Monta o objeto de atualização
      const updateData = { nome, email }
      if (senha) updateData.senha = senha

      await api.patch(`/usuarios/${userId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!')
      router.back()
    } catch (e) {
      console.log('Erro ao atualizar dados:', e?.response?.data || e);
      Alert.alert('Erro', e?.response?.data?.msg || 'Não foi possível atualizar seus dados.');
    }
  }

  if (loading) return null

  return (
    <View className="mt-5 flex-1 justify-end">
      <View className="items-center justify-center">
        <TextInputComponent
          label='Nome:'
          className='mb-5'
          value={nome}
          onChangeText={setNome}
        />
        <TextInputComponent
          label='E-mail:'
          className='mb-5'
          value={email}
          onChangeText={setEmail}
        />
        <TextInputComponent
          label='Nova senha:'
          className='mb-5'
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Deixe em branco para não alterar"
        />
      </View>

      <View className='mt-5 flex-1 justify-end'>
        <View className='items-center justify-center'>
          <PrimaryButton onPress={handleEditar}>
            <Heading1>
              Editar
            </Heading1>
          </PrimaryButton>
        </View>
      </View>
    </View>

  )
}

export default EditarDados