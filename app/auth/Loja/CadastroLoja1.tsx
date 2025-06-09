import React, { useState } from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import GenericContainer, { ButtonsArea, Form } from '@/src/components/ViewComponents'
import { validarCnpj } from '@/src/services/api'
import { Text, ActivityIndicator, Alert, ScrollView } from 'react-native'

const CadastroLoja1 = () => {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
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
      <ReturnButton className='m-5' />

      <Heading1 className='text-center'>
        Cadastro de Lojas
      </Heading1>

      <Form>
        <ScrollView className='h-[55%]'>
          <TextInputComponent
            label='Nome da sua loja:'
            value={nome}
            onChangeText={setNome}
            className='mb-3'
          />
          <TextInputComponent
            label='CNPJ da sua loja:'
            value={cnpj}
            onChangeText={setCnpj}
            className='mb-3'
            keyboardType='numeric'
          />
          <TextInputComponent
            label='E-mail da sua loja:'
            value={email}
            onChangeText={setEmail}
            className='mb-3'
          />
          <TextInputComponent
            label='Rede da sua loja:'
            value={nomeRede}
            onChangeText={setNomeRede}
          />

        </ScrollView>
        <ButtonsArea>
          <PrimaryButton onPress={navigate}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Heading1>Próxima</Heading1>
            )}
          </PrimaryButton>
          <SecondaryButton>
            <Heading1>
              Já tenho cadastro
            </Heading1>
          </SecondaryButton>
        </ButtonsArea>
      </Form>

    </GenericContainer>
  )
}

export default CadastroLoja1
