import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import GenericContainer, { Form, ButtonsArea } from '../../../src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { useRouter } from 'expo-router'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import api from '@/src/services/api'

import {getSecureItem, deleteSecureItem} from '../../../utils/secureStore'

const CadastroLoja3 = () => {

  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    if (!senha || !confirmarSenha){
        Alert.alert('Erro', 'Preencha os dois campos da senha!')
        return
    }

    if (senha !== confirmarSenha){
        Alert.alert('Erro', 'As senhas não coincidem')
        return
    }

    try {
        const rawpart1  = await getSecureItem('cadastroLojaParte1')
        const rawpart2 = await getSecureItem('cadastroLojaParte2')

        if (!rawpart1 || !rawpart2){
            Alert.alert('Erro', 'Informações incompletas. Volte e preencha os campos vazios.')
            return
        }

        const part1 = JSON.parse(rawpart1)
        const part2 = JSON.parse(rawpart2)

        const payload = {
            part1,
            part2,
            senha,
            confirmarSenha
        }

        const page1 = payload.part1
        const page2 = payload.part2

        const response = await api.post('/farma/auth/register', {
            nome: page1.nome,
            cnpj: page1.cnpj,
            rede: page1.nomeRede,
            rua: page2.rua,
            bairro: page2.bairro,
            numero: page2.numero,
            uf: page2.estado,
            cidade: page2.cidade,
            email: page1.email,
            senha,
            confirmasenha: payload.confirmarSenha
        })

        if (response.status === 201){
            await deleteSecureItem('cadastroLojaParte1')
            await deleteSecureItem('cadastroLojaParte2')

            Alert.alert('Sucesso', 'Usuário criado com sucesso!')
            console.log(response.data)
            router.push('/auth/Loja/LoginLoja')
        }

        
    } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário.')
        console.log(error)
    }
  }

  return (
    <GenericContainer>
        <ReturnButton className='m-5' />

        <Heading1 className='text-center'>
            Cadastro de Lojas - Senha
        </Heading1>

        <Form>
            <TextInputComponent 
                label='Senha:' 
                value={senha} 
                onChangeText={setSenha}
                secureTextEntry={true}
                />
                
            <TextInputComponent 
                label='Repita a senha:' 
                value={confirmarSenha} 
                onChangeText={setConfirmarSenha}
                secureTextEntry={true}
                />
            
            <ButtonsArea>
                <PrimaryButton onPress={handleSubmit}>                    
                    Cadastrar Loja                    
                </PrimaryButton>
            </ButtonsArea>
        </Form>
    </GenericContainer>
  )
}

export default CadastroLoja3