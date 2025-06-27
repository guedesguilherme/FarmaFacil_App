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
        async function loadPedido() {
            console.log('Iniciando busca do pedido, id:', id);
            try {
                const response = await api.get(`pedidos/${id}`);
                console.log('Resposta da API:', response.data);
                setInformacoes(response.data);
                setLoading(false);
                // Log das informações da farmácia
                if (response.data?.pedido?.farmacia) {
                    console.log('Informações da farmácia:', response.data.pedido.farmacia);
                } else {
                    console.log('Nenhuma informação de farmácia encontrada no pedido.');
                }
            } catch (error) {
                console.error('Erro ao buscar pedido:', error);
                setLoading(false);
            }
        }
        loadPedido();
    }, [id]);

    if (loading) {
        console.log('Loading ativo, aguardando dados...');
        return (
            <GenericContainer className='justify-center items-center'>
                <ActivityIndicator size={45} color='#2f88ff' />
            </GenericContainer>
        )
    } else {
        console.log('Renderizando dados do pedido:', informacoes);
        const produto = informacoes?.pedido?.itensPedido?.[0]?.product;
        return (
            <GenericContainer className='justify-center items-center gap-2'>
                <Heading1 className=''>
                    Sucesso!
                </Heading1>
                <Heading2 className=''>
                    {produto && produto.nome
                        ? `Já estamos separando ${produto.nome} pra você!`
                        : 'Seu pedido foi registrado!'}
                </Heading2>
                <PrimaryButton
                    onPress={() => {
                        router.push({
                            pathname: '/pages/Produtos/AcompanharPedido',
                            params: { id: id }
                        })
                    }}
                >
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