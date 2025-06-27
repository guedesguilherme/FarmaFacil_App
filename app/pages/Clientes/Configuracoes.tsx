import { ScrollView, StyleSheet, Alert, View, Button, Modal, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import GenericContainer from '@/src/components/ViewComponents'
import { DangerButton } from '@/src/components/ButtonsComponent'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteSecureItem, getSecureItem } from '../../../utils/secureStore'
import EditarDados from './EditarDados'
import api from '@/src/services/api'

const Configuracoes = () => {
    const [autenticado, setAutenticado] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    const [deleteLoading, setDeleteLoading] = useState(false)
    const [temp, setTemp] = useState(false)

    useEffect(() => {
        async function verificarAuth() {
            const token = await getSecureItem('token')
            const userId = await getSecureItem('userId')
            setAutenticado(!!token && !!userId)
            setLoading(false)
        }
        verificarAuth()
    }, [])

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userId')
        await deleteSecureItem('token')
        await deleteSecureItem('userId')
        Alert.alert('Sessão encerrada', 'Você saiu da sua conta.')
        router.replace('/auth/Clientes/LoginClientes')
    }

    function openModal() {
        setOpen(!open)
    }

    const deletarCliente = async () => {
        setTemp(!temp)
        setDeleteLoading(true)

        try {
            const userId = await getSecureItem('userId')

            api.delete(`/usuarios/${userId}`)

            Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.')
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('userId')
            await deleteSecureItem('token')
            await deleteSecureItem('userId')
            router.navigate('/auth/Clientes/LoginClientes')
        } catch (error) {
            setDeleteLoading(false)
            Alert.alert('Erro', `Não foi possível deletar sua conta: ${error}`)
        } finally { setDeleteLoading(false) }

    }

    if (loading) return null

    return (
        <GenericContainer className='flex-1'>
            <Heading1 className='m-5'>
                Configurações
            </Heading1>
            <View>
                <ScrollView className='mb-14'>
                    {autenticado && <EditarDados />}
                </ScrollView>

                <View className='flex flex-col justify-between gap-5'>
                    <DangerButton onPress={openModal}>
                        Deletar minha conta
                    </DangerButton>

                    <Button onPress={handleLogout} title='Encerrar sessão' />
                </View>
            </View>

            <Modal animationType='slide' transparent={false} visible={open}>
                <View className='flex-1 justify-center items-center m-5'>

                    <Heading2 className='text-center mx-3'>
                        Deseja mesmo deletar sua conta?
                    </Heading2>

                    <View className='flex flex-row items-center justify-center gap-20 mt-5 w-full'>
                        <TouchableOpacity
                            className='border-2 border-primaryBlue p-5 rounded-lg w-[30%] flex items-center justify-center text-center'
                            onPress={openModal}
                        >
                            <Text className='text-primaryBlue font-bold'>Não</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className='border-2 border-red-500 p-5 rounded-lg w-[30%] flex items-center justify-center text-center'
                            onPress={deletarCliente}
                            disabled={temp}
                        >{deleteLoading ? (
                            <ActivityIndicator color="#f00" />
                        ) : (                            
                            <Text className='font-bold text-red-500'>Sim</Text>
                        )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GenericContainer>
    )
}

export default Configuracoes

const styles = StyleSheet.create({})