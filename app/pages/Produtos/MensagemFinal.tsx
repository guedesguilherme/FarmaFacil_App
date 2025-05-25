import api from '@/src/services/api'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Heading1, Heading2 } from '@/src/components/TextComponent'

const MensagemFinal = () => {

    const { id } = useLocalSearchParams()

    const [informacoes, setInformacoes] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadNome() {
            const response = await api.get(`produtos/${id}`)
            setInformacoes(response.data)
            setLoading(false)
        }
        loadNome()
    }, [id])

    if (loading) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator 
                size={45}
                    color='#2f88ff'
                />
            </View>
        )
    } else {
        console.log(informacoes.produto)
        return (
            <View className='flex-1 justify-center items-center'>
                <Heading1>
                    Sucesso!
                </Heading1>
                <Heading2>
                    Já estamos separando {informacoes.produto.nome} pra você!
                </Heading2>
            </View>
        )
    }
}

export default MensagemFinal

const styles = StyleSheet.create({})