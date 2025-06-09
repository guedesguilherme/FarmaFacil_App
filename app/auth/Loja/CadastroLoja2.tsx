import { ScrollView, Alert, Text } from 'react-native'
import React, { useState } from 'react'
import { Heading1 } from '@/src/components/TextComponent'
import { DisabledTextInputComponent, TextInputComponent } from '@/src/components/TextInputComponents'
import { ReturnButton, PrimaryButton } from '@/src/components/ButtonsComponent'
import { useRouter } from 'expo-router'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'
import { viacep } from '@/src/services/api'

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
                const response = await viacep.get(`${userCep}/json/`)                
                setRua(response.data.logradouro)
                setBairro(response.data.bairro)
                setEstado(response.data.estado)
                setCidade(response.data.localidade)
                setError('')
            } catch (error) {
                Alert.alert(`Erro`, `Não foi possível buscar o cep: ${error}`)
            }
        }
    }

    return (
        <GenericContainer>
            <ReturnButton className='m-5' />

            <Heading1 className='text-center'>
                Cadastro de Lojas - Endereço
            </Heading1>

            <ScrollView>
                <Form>
                    <TextInputComponent label='CEP: *' maxLength={8} value={cep} onChangeText={search} keyboardType='numeric' />
                    <DisabledTextInputComponent label='Rua:' value={rua} />
                    <DisabledTextInputComponent label='Bairro:' value={bairro} />
                    <TextInputComponent label='Número: *' value={numero} onChangeText={setNumero} keyboardType='numeric' />
                    <TextInputComponent label='Complemento:' value={complemento} onChangeText={setComplemento} />
                    <DisabledTextInputComponent label='Estado:' value={estado} />
                    <DisabledTextInputComponent label='Cidade:' value={cidade} />

                    <Text className='font-bold text-primaryBlue'>* Campos obrigatórios</Text>

                    <ButtonsArea>
                        <PrimaryButton onPress={() => {
                            if (!cep || !rua || !bairro || !numero || !estado || !cidade) {                                
                                Alert.alert('Campos em branco', 'Todos os campos são obrigatórios!')
                                return
                            } else {
                                router.push('/auth/Loja/CadastroLoja3')
                            }
                            }}
                        >
                            <Heading1>
                                Próxima
                            </Heading1>
                        </PrimaryButton>
                    </ButtonsArea>
                </Form>
            </ScrollView>

        </GenericContainer>
    )
}

export default CadastroLoja2