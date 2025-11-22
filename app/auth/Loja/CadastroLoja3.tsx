import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GenericContainer, { Form, ButtonsArea } from '../../../src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { useRouter } from 'expo-router'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import api from '@/src/services/api'
import { Ionicons } from '@expo/vector-icons' // 1. Importação alterada

import { getSecureItem, deleteSecureItem } from '../../../utils/secureStore'

const PasswordRequirement = ({ met, label }: { met: boolean, label: string }) => (
    <View className="flex-row items-center mb-1">
        <View className="w-6 items-center justify-center mr-2">
            {/* 2. Ícones de validação alterados */}
            <Ionicons 
                name={met ? "checkmark-circle" : "close-circle"} 
                size={18} 
                color={met ? "#16a34a" : "#ef4444"} 
            />
        </View>
        <Text className={`text-sm ${met ? "text-green-600 font-bold" : "text-red-500"}`}>
            {label}
        </Text>
    </View>
)

const CadastroLoja3 = () => {

    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const requirements = {
        length: senha.length >= 12,
        upper: /[A-Z]/.test(senha),
        lower: /[a-z]/.test(senha),
        number: /\d/.test(senha),
        special: /[\W_]/.test(senha)
    }

    const isPasswordValid = Object.values(requirements).every(Boolean)

    const handleSubmit = async () => {
        if (!senha || !confirmarSenha) {
            Alert.alert('Erro', 'Preencha os dois campos da senha!')
            return
        }

        if (!isPasswordValid) {
            Alert.alert('Senha Fraca', 'Por favor, atenda a todos os requisitos da senha antes de continuar.')
            return
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem')
            return
        }

        setLoading(true);

        try {
            const rawpart1 = await getSecureItem('cadastroLojaParte1')
            const rawpart2 = await getSecureItem('cadastroLojaParte2')

            if (!rawpart1 || !rawpart2) {
                Alert.alert('Erro', 'Informações incompletas. Volte e preencha os campos vazios.')
                return
            }

            const part1 = JSON.parse(rawpart1)
            const part2 = JSON.parse(rawpart2)

            const response = await api.post('/farma/auth/register', {
                nome: part1.nome,
                cnpj: part1.cnpjNumerico, // Ajustado para bater com o salvo na parte 1
                rede: part1.nomeRede,
                cep: part2.cep,
                rua: part2.rua,
                bairro: part2.bairro,
                numero: part2.numero,
                uf: part2.estado,
                cidade: part2.cidade,
                email: part1.email,
                senha,
                confirmasenha: confirmarSenha
            })

            if (response.status === 201) {
                await deleteSecureItem('cadastroLojaParte1')
                await deleteSecureItem('cadastroLojaParte2')

                Alert.alert('Sucesso', 'Usuário criado com sucesso!')
                router.push('/auth/Loja/LoginLoja')
            }

        } catch (error: any) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.msg) {
                Alert.alert('Erro', error.response.data.msg)
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário.')
            }
        } finally {
            setLoading(false);
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
                    secureTextEntry={!showPassword} 
                    rightIcon={
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {/* 3. Ícone de olho alterado */}
                            <Ionicons 
                                name={showPassword ? "eye" : "eye-off"} 
                                size={24} 
                                color="#64748b" 
                            />
                        </TouchableOpacity>
                    }
                />

                {senha.length > 0 && (
                    <View className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-200">
                        <Text className="text-slate-700 font-bold mb-2 text-sm">Requisitos da senha:</Text>
                        <PasswordRequirement met={requirements.length} label="Mínimo de 12 caracteres" />
                        <PasswordRequirement met={requirements.upper} label="Pelo menos uma letra maiúscula" />
                        <PasswordRequirement met={requirements.lower} label="Pelo menos uma letra minúscula" />
                        <PasswordRequirement met={requirements.number} label="Pelo menos um número" />
                        <PasswordRequirement met={requirements.special} label="Pelo menos um caractere especial" />
                    </View>
                )}

                <TextInputComponent
                    label='Repita a senha:'
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {/* 4. Ícone de olho alterado */}
                            <Ionicons 
                                name={showConfirmPassword ? "eye" : "eye-off"} 
                                size={24} 
                                color="#64748b" 
                            />
                        </TouchableOpacity>
                    }
                />

                <ButtonsArea>
                    <PrimaryButton onPress={handleSubmit} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text>Cadastrar Loja</Text>
                        )}
                    </PrimaryButton>
                </ButtonsArea>
            </Form>
        </GenericContainer>
    )
}

export default CadastroLoja3