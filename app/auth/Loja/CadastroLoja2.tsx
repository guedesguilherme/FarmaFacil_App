import { ScrollView, Alert, Text } from 'react-native'
import React, { useState } from 'react'
import { Heading1, ErrorText } from '@/src/components/TextComponent'
import { DisabledTextInputComponent, TextInputComponent } from '@/src/components/TextInputComponents'
import { ReturnButton, PrimaryButton } from '@/src/components/ButtonsComponent'
import { useRouter } from 'expo-router'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'
import { viacep } from '@/src/services/api'
import { saveSecureItem } from '../../../utils/secureStore'

const CadastroLoja2 = () => {
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const search = async (userCep: string) => {
    const regexCep = userCep.replace(/\D/g, '')
    setCep(regexCep)

    if (regexCep.length === 8) {
      try {
        const response = await viacep.get(`${regexCep}/json/`)
        setRua(response.data.logradouro)
        setBairro(response.data.bairro)
        setEstado(response.data.uf)
        setCidade(response.data.localidade)
        setError('')
      } catch (error) {
        Alert.alert('Erro', `Não foi possível buscar o CEP.`)
      }
    }
  }

  const handleNext = async () => {
    if (!cep || !rua || !bairro || !numero || !estado || !cidade) {
      Alert.alert('Campos em branco', 'Todos os campos obrigatórios devem ser preenchidos!')
      return
    }

    await saveSecureItem('cadastroLojaParte2', {
      cep, rua, bairro, numero, estado, cidade, complemento
    })

    router.push('/auth/Loja/CadastroLoja3')
  }

  return (
    <GenericContainer>
      <ReturnButton className="mb-5" />

      <Heading1 className="text-center mb-12">
        Cadastro de Lojas - Endereço
      </Heading1>

      <Form className='flex-1'>
        <ScrollView className="h-[60%]">
          <TextInputComponent
            label="CEP: *"
            placeholder="Digite o CEP"
            maxLength={8}
            value={cep}
            onChangeText={search}
            keyboardType="numeric"
          />

          <DisabledTextInputComponent
            label="Rua:"
            placeholder="Digite a sua rua"
            value={rua}
          />

          <DisabledTextInputComponent
            label="Bairro:"
            placeholder="Digite o bairro "
            value={bairro}
          />

          <TextInputComponent
            label="Número: *"
            placeholder="Digite o número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />

          <TextInputComponent
            label="Complemento:"
            placeholder="Digite o complemento (opcional)"
            value={complemento}
            onChangeText={setComplemento}
          />

          <DisabledTextInputComponent
            label="Estado:"
            placeholder="Digite o seu estado"
            value={estado}
          />

          <DisabledTextInputComponent
            label="Cidade:"
            placeholder="Digite a cidade"
            value={cidade}
          />

          <Text className="font-bold text-primaryBlue mt-2">
            * Campos obrigatórios
          </Text>
        </ScrollView>

        {!!error && (
          <ErrorText className="text-center my-2">
            {error}
          </ErrorText>
        )}

        <ButtonsArea className="mt-5">
          <PrimaryButton onPress={handleNext}>
            Próxima
          </PrimaryButton>
        </ButtonsArea>
      </Form>
    </GenericContainer>
  )
}

export default CadastroLoja2
