import React, { useState } from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { 
  Heading1,
  ErrorText,
  Heading2,
  Heading3
 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import GenericContainer, { ButtonsArea, Form } from '@/src/components/ViewComponents'
import { validarCnpj } from '@/src/services/api'
import { ActivityIndicator, Alert, ScrollView } from 'react-native'

const CadastroLoja1 = () => {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [nomeRede, setNomeRede] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const check = async () => {
    try {
      const response = await validarCnpj.get(`${cnpj}`)      

      if (response.status === 200) {        
        return true
      } else {
        Alert.alert('Erro', 'Não foi possível buscar este cnpj.')      
        console.log(response)          
        return false
      }
    } catch (erro) {
      Alert.alert('Erro', `Não foi possível enviar a consulta: ${erro}`)
      return false
    }
  }

  const navigate = async () => {

    if (!nome || !cnpj || !email || !nomeRede) {
      Alert.alert('Campos em branco', 'Todos os campos são obrigatórios')
      return
    }

    setLoading(true)
    const valido = await check()

    if (valido) {
      router.push('/auth/Loja/CadastroLoja2')
      setNome('')
      setCnpj('')
      setEmail('')
      setNomeRede('')
      setLoading(false)
    }

    setLoading(false)
  }

  return (
    <GenericContainer>
      <ReturnButton className="mb-5" />

      <Heading1 className="text-center mb-12">
        Cadastro de Lojas
      </Heading1>

      <Form>
        <TextInputComponent
          label="Nome da sua loja:"
          placeholder="Digite o nome fantasia da loja"
          value={nome}
          onChangeText={setNome}
        />

        <TextInputComponent
          label="CNPJ da sua loja:"
          placeholder="Digite o CNPJ da loja"
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType="numeric"
        />

        <TextInputComponent
          label="E-mail da sua loja:"
          placeholder="Digite o e-mail da loja"
          value={email}
          onChangeText={setEmail}
        />

        <TextInputComponent
          label="Rede da sua loja:"
          placeholder="Digite o nome da rede (se houver)"
          value={nomeRede}
          onChangeText={setNomeRede}
        />

        {!!error && (
          <ErrorText className="text-center my-2">
            {error}
          </ErrorText>
        )}

        <ButtonsArea className="mt-5">
          <PrimaryButton onPress={navigate} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              "Próxima"
            )}
          </PrimaryButton>

          <SecondaryButton>
            Já tenho cadastro
          </SecondaryButton>
        </ButtonsArea>
      </Form>
    </GenericContainer>
  )
}

export default CadastroLoja1
