import { ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import {
  PrimaryButton,
  ReturnButton,
  SecondaryButton
} from '@/src/components/ButtonsComponent'
import {
  Heading1,
  ErrorText,
  Heading2
} from '@/src/components/TextComponent'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import api from '@/src/services/api'
import GoogleLoginButton from '@/src/components/userCliente/GoogleLoginButton'

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
    setError('')

    if (!nome || !email || !senha || !confirmasenha) {
      setError('Todos os campos são obrigatórios!')
      Alert.alert('Há campos em branco', 'Todos os campos devem ser preenchidos.')
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

      Alert.alert('Sucesso', 'Usuário criado com sucesso!')
      clearCampos()
      router.push('/auth/Clientes/LoginClientes')
    } catch (error: any) {
      setError(error.response?.data?.msg || 'Erro ao cadastrar!')
      Alert.alert('Erro', `Erro ao cadastrar:\n${error.response?.data?.msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericContainer>
      <ReturnButton className="mb-5" />

      <Heading1 className="text-center mb-12">
        Cadastro de Clientes
      </Heading1>

      <Form>
        <TextInputComponent
          label="Nome:"
          placeholder="Digite seu nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInputComponent
          label="E-mail:"
          placeholder="Digite seu melhor e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <TextInputComponent
          label="Senha:"
          placeholder="Crie uma senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInputComponent
          label="Repita sua senha:"
          placeholder="Confirme sua senha"
          value={confirmasenha}
          onChangeText={setConfirmaSenha}
        />

        {!!error && (
          <ErrorText className="text-center my-2">
            {error}
          </ErrorText>
        )}

        <ButtonsArea className='mt-5'>
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

          <GoogleLoginButton />
        </ButtonsArea>
      </Form>
    </GenericContainer>
  )
}

export default CadastroClientes
