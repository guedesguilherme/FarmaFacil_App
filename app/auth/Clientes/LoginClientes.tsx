import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import api from '@/src/services/api'

const LoginClientes = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingBiometria, setLoadingBiometria] = useState(true)
  const [error, setError] = useState('')

  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          // Não precisa de requestPermissionsAsync no Android
          const compativel = await LocalAuthentication.hasHardwareAsync()
          const biometriaDisponivel = await LocalAuthentication.isEnrolledAsync()
          if (compativel && biometriaDisponivel) {
            const resultado = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Use biometria para entrar',
              fallbackLabel: 'Use PIN ou senha',
            })
            if (resultado.success) {
              router.replace('/pages/Clientes/HomeClientes')
              return
            } else {
              Alert.alert('Login biométrico falhou', 'Use seu login e senha para continuar.')
            }
          }
        }
      } catch (error) {
        console.error('Erro na autenticação biométrica automática:', error)
      } finally {
        setLoadingBiometria(false)
      }
    })()
  }, [])

  const handleLogin = async () => {
    setError('')
    if (!email || !senha) {
      setError('Preencha email e senha.')
      Alert.alert('Erro', 'Preencha email e senha.')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/usuarios/auth/login', { email, senha })
      if (response.data?.token) {
        await AsyncStorage.setItem('token', response.data.token)
        router.replace('/pages/Clientes/HomeClientes')
      } else {
        setError(response.data?.message || 'Erro ao fazer login')
        Alert.alert('Erro', response.data?.message || 'Erro ao fazer login')
      }
    } catch (err: any) {
      console.log(err)
      setError(err.response?.data?.msg || 'Erro ao conectar no servidor.')
      Alert.alert('Erro', err.response?.data?.msg || 'Erro ao conectar no servidor.')
    } finally {
      setLoading(false)
    }
  }

  if (loadingBiometria) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
      }}>
        <ActivityIndicator size="large" color="#000" />
        <Heading1 style={{ marginTop: 20 }}>Verificando biometria...</Heading1>
      </View>
    )
  }

  return (
    <GenericContainer>
      <ReturnButton className='m-5' />

      <Heading1 className='text-center'>
        Login - Clientes
      </Heading1>

      <Form>
        <TextInputComponent label='E-mail:' value={email} onChangeText={setEmail} />
        <TextInputComponent label='Senha:' value={senha} onChangeText={setSenha} secureTextEntry />

        <ButtonsArea>
          <PrimaryButton onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Heading1>Logar</Heading1>
            )}
          </PrimaryButton>

          <SecondaryButton onPress={() => router.push('/auth/Clientes/CadastroClientes')}>
            <Heading1>
              Não tenho cadastro
            </Heading1>
          </SecondaryButton>
        </ButtonsArea>
      </Form>
    </GenericContainer>
  )
}

export default LoginClientes