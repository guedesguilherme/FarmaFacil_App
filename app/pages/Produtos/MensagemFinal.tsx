import api from '@/src/services/api'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import GenericContainer from '@/src/components/ViewComponents'
import { PrimaryButton } from '@/src/components/ButtonsComponent'

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
            <GenericContainer className='justify-center items-center'>
                <ActivityIndicator 
                size={45}
                    color='#2f88ff'
                />
            </GenericContainer>
        )
    } else {
        console.log(informacoes.produto)
        return (
            <GenericContainer className='justify-center items-center gap-2'>
                <Heading1 className=''>
                    Sucesso!
                </Heading1>
                <Heading2 className=''>
                    Já estamos separando {informacoes.produto.nome} pra você!
                </Heading2>
                <PrimaryButton>
                    <Heading1 className='font-bold'>
                        Acompanhar
                    </Heading1>
                </PrimaryButton>
            </GenericContainer>
        )
    }
}

export default MensagemFinal

const styles = StyleSheet.create({})