import { ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import api from '@/src/services/api'
import { Heading2 } from '@/src/components/TextComponent'

const CadastroClientes = () => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmasenha, setConfirmaSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const clearCampos = () => {
    setLoading(false)
    setNome('')
    setEmail('')
    setSenha('')
    setConfirmaSenha('')
    setError('')
  }

  const enviarInformacoes = async () => {
    setError('') // Clear previous error

    if (!nome || !email || !senha || !confirmasenha) {
      setError('Todos os campos são obrigatórios!')
      Alert.alert('Há campos em branco', error)
      return
    }
    
    if (!email.includes('@')) {
      setError('O e-mail inserido não é válido!')
      return
    }

    if (senha !== confirmasenha) {
      setError('As senhas não são iguais!')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/usuarios/auth/register', {
        nome,
        email,
        senha,
        confirmasenha
      })

      console.log(response.data)
      Alert.alert('Sucesso', 'Usuário criado com sucesso!')

      clearCampos()

      router.push('/auth/Clientes/LoginClientes')
    } catch (error: any) {
      console.log(error)
      setError(error.response?.data?.msg || 'Erro ao cadastrar!')
      Alert.alert('Erro', `Erro ao cadastrar:\n${error.response?.data?.msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericContainer>
      <ReturnButton className='' />

      <Heading1 className='text-center mt-5'>
        Cadastre-se
      </Heading1>

      <Form className='mt-8'>
          <TextInputComponent value={nome} onChangeText={setNome} label='Nome:' />
          <TextInputComponent value={email} onChangeText={setEmail} label='E-mail:' />
          <TextInputComponent value={senha} secureTextEntry onChangeText={setSenha} label='Senha:' />
          <TextInputComponent value={confirmasenha} onChangeText={setConfirmaSenha} label='Repita sua senha:' />
        
          <PrimaryButton onPress={enviarInformacoes} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              "Cadastrar"
            )}
          </PrimaryButton>

          <SecondaryButton onPress={() => router.push('/auth/Clientes/LoginClientes')}>   
              Já tenho cadastro
          </SecondaryButton>


      </Form>

    </GenericContainer>
  )
}

export default CadastroClientes
