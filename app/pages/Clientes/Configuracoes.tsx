import React, { useState, useCallback } from 'react'
import { ScrollView, Alert, View, TouchableOpacity, Modal, ActivityIndicator, Text } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

import GenericContainer from '@/src/components/ViewComponents'
import { Heading1, Heading2, Heading3, BodyText } from '@/src/components/TextComponent'
import { DangerButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import api from '@/src/services/api'
import { deleteSecureItem, getSecureItem } from '../../../utils/secureStore'

// Componente auxiliar para linhas de informação
const InfoRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <View className="flex-row items-center mb-4">
        <View className="w-8 items-center justify-center mr-3">
            <Ionicons name={icon as any} size={20} color="#2f88ff" />
        </View>
        <View className="flex-1">
            <Text className="text-xs text-gray-500 font-poppins_bold uppercase tracking-wider mb-1">
                {label}
            </Text>
            <BodyText className="text-slate-800">
                {value || 'Não informado'}
            </BodyText>
        </View>
    </View>
)

const Configuracoes = () => {
    const router = useRouter()
    
    const [usuario, setUsuario] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    
    // Estados do Modal
    const [open, setOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    // Busca dados do usuário ao focar na tela
    useFocusEffect(
        useCallback(() => {
            async function loadUserData() {
                try {
                    setLoading(true)
                    const userId = await getSecureItem('userId')
                    const token = await getSecureItem('token')

                    if (!userId || !token) {
                        // Se não tiver sessão, força logout
                        handleLogout()
                        return
                    }

                    const response = await api.get(`/usuarios/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    // Ajuste conforme o retorno da sua API (response.data.usuario ou response.data)
                    setUsuario(response.data.user || response.data)
                } catch (error) {
                    console.error("Erro ao carregar perfil", error)
                } finally {
                    setLoading(false)
                }
            }
            loadUserData()
        }, [])
    )

    const handleLogout = async () => {
        Alert.alert(
            "Sair",
            "Deseja realmente sair da sua conta?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    onPress: async () => {
                        await AsyncStorage.removeItem('token')
                        await AsyncStorage.removeItem('userId')
                        await deleteSecureItem('token')
                        await deleteSecureItem('userId')
                        router.replace('/auth/Clientes/LoginClientes')
                    }
                }
            ]
        )
    }

    const deletarCliente = async () => {
        setDeleteLoading(true)
        try {
            const userId = await getSecureItem('userId')
            await api.delete(`/usuarios/${userId}`)

            Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.')
            
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('userId')
            await deleteSecureItem('token')
            await deleteSecureItem('userId')
            
            setOpen(false)
            router.replace('/auth/Clientes/LoginClientes')
        } catch (error) {
            Alert.alert('Erro', `Não foi possível deletar sua conta.`)
        } finally { 
            setDeleteLoading(false) 
        }
    }

    // Função para formatar telefone visualmente
    const formatPhone = (phone: string) => {
        if (!phone) return '';
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (loading) {
        return (
            <GenericContainer className="justify-center items-center">
                <ActivityIndicator size="large" color="#2f88ff" />
            </GenericContainer>
        )
    }

    return (
        <GenericContainer>
            <ReturnButton className='m-5' />
            
            <View className="px-2 mb-6">
                <Heading1>Minha Conta</Heading1>
                <Text className="text-slate-500 font-poppins_regular mt-1">
                    Gerencie seus dados pessoais
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                
                {usuario && (
                    <>
                        {/* CARD 1: Dados Pessoais */}
                        <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 mx-1">
                            <View className="flex-row items-center mb-6 border-b border-slate-100 pb-4">
                                <View className="h-12 w-12 bg-blue-50 rounded-full items-center justify-center mr-4">
                                    <Ionicons name="person" size={24} color="#2f88ff" />
                                </View>
                                <View className="flex-1">
                                    <Heading3>{usuario.nome}</Heading3>
                                    <Text className="text-slate-400 text-xs font-poppins_regular">Cliente</Text>
                                </View>
                                
                                {/* Botão de Editar (Navegação) */}
                                <TouchableOpacity 
                                    onPress={() => router.push('/pages/Clientes/EditarDados')} // Ajuste a rota conforme seu arquivo
                                    className="bg-slate-50 p-2 rounded-lg"
                                >
                                    <Ionicons name="pencil" size={18} color="#2f88ff" />
                                </TouchableOpacity>
                            </View>

                            <InfoRow icon="mail-outline" label="E-mail" value={usuario.email} />
                            <InfoRow 
                                icon="call-outline" 
                                label="Telefone" 
                                value={formatPhone(usuario.telefone)} 
                            />
                        </View>

                        {/* Ações da Conta */}
                        <View className="gap-4">
                            <SecondaryButton onPress={handleLogout}>
                                <Text>Encerrar Sessão</Text>
                            </SecondaryButton>

                            <DangerButton onPress={() => setOpen(true)}>
                                <Text>Excluir Minha Conta</Text>
                            </DangerButton>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Modal de Exclusão */}
            <Modal animationType='slide' transparent={false} visible={open}>
                <View className='flex-1 justify-center items-center m-5'>
                    <Heading2 className='text-center mx-3 mb-6'>
                        Deseja mesmo deletar sua conta?
                    </Heading2>
                    
                    <Text className="text-center text-slate-500 font-poppins_regular mb-8 px-4">
                        Essa ação é irreversível e todo seu histórico de pedidos será perdido.
                    </Text>

                    <View className='flex flex-row items-center justify-center gap-10 w-full'>
                        <TouchableOpacity
                            className='border-2 border-primaryBlue p-4 rounded-lg w-[40%] flex items-center justify-center'
                            onPress={() => setOpen(false)}
                        >
                            <Text className='text-primaryBlue font-poppins_bold text-lg'>Não</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className='border-2 border-red-500 p-4 rounded-lg w-[40%] flex items-center justify-center'
                            onPress={deletarCliente}
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? (
                                <ActivityIndicator color="#f00" />
                            ) : (
                                <Text className='font-poppins_bold text-red-500 text-lg'>Sim</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GenericContainer>
    )
}

export default Configuracoes