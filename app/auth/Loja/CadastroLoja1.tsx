import React, { useState } from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import GenericContainer, { ButtonsArea, Form } from '@/src/components/ViewComponents'
import { validarCnpj } from '@/src/services/api'
import { ActivityIndicator, Alert, ScrollView, Text } from 'react-native'

import { saveSecureItem } from '../../../utils/secureStore'

const CadastroLoja1 = () => {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [nomeRede, setNomeRede] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const cnpjNumerico = cnpj.replace(/\D/g, '');

  const check = async () => {
    
    try {
      const response = await validarCnpj.get(`${cnpjNumerico}`)
      console.log(cnpjNumerico)

      if (response.status === 200) {        
        return true
      }

    } catch (erro) {
      Alert.alert('Erro', `Não foi possível encontrar o cnpj informado.`)
      return false
    }
  }

  const navigate = async () => {

    if (!nome || !cnpjNumerico || !email || !nomeRede) {
      Alert.alert('Campos em branco', 'Todos os campos são obrigatórios')
      return
    }

    setLoading(true)

    const valido = await check()

    if (valido) {
      await saveSecureItem('cadastroLojaParte1', JSON.stringify({ nome, cnpjNumerico, email, nomeRede}))
      console.log(email)
      router.push('/auth/Loja/CadastroLoja2')
      setLoading(false)
    }

    setLoading(false)
  }

  return (
    <GenericContainer>
      <ReturnButton />

      <Heading1 className='text-center mt-5'>
        Cadastro de Lojas
      </Heading1>

      <Form className='pt-3'>        
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

        
        <ButtonsArea>
          <PrimaryButton onPress={navigate}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text>Próxima</Text>
            )}
          </PrimaryButton>
          <SecondaryButton>
            <Text>
              Já tenho cadastro
            </Text>
          </SecondaryButton>          
        </ButtonsArea>
      </Form>

    </GenericContainer>
  )
}

export default CadastroLoja1
