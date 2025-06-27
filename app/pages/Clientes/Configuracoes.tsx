import { ScrollView, StyleSheet, Alert, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer from '@/src/components/ViewComponents'
import { DangerButton } from '@/src/components/ButtonsComponent'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteSecureItem, getSecureItem } from '../../../utils/secureStore'
import EditarDados from './EditarDados'

const Configuracoes = () => {
    const [autenticado, setAutenticado] = useState(false)
    const [loading, setLoading] = useState(true)

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

    if (loading) return null

    return (
        <GenericContainer className='flex-1'>
            <Heading1 className='m-5'>
                Configurações
            </Heading1>
            <View>
                <ScrollView className='mb-20'>
                    {autenticado && <EditarDados />}
                </ScrollView>
                <DangerButton onPress={handleLogout}>
                    Encerrar sessão
                </DangerButton>
            </View>
        </GenericContainer>
    )
}

export default Configuracoes

const styles = StyleSheet.create({})