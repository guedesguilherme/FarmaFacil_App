import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import * as Location from 'expo-location'
import api from '@/src/services/api'
import GenericContainer from '@/src/components/ViewComponents'
import { ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1, Heading2, BodyText } from '@/src/components/TextComponent'

const GOOGLE_API_KEY = 'AIzaSyCQ4GtwtrfiV_BdU1vEiy5Tyk8ZDzM0P10'

const AcompanharPedido = () => {
    const { id } = useLocalSearchParams()
    const pedidoId = id

    const [tempoEntrega, setTempoEntrega] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pedido, setPedido] = useState(null)

    useEffect(() => {
        if (!pedidoId) return;
        async function calcularTempoEntrega() {
            try {
                // 1. Localização do cliente
                let { status } = await Location.requestForegroundPermissionsAsync()
                if (status !== 'granted') {
                    setLoading(false)
                    return
                }
                let location = await Location.getCurrentPositionAsync({})
                const { latitude: latCliente, longitude: lonCliente } = location.coords

                // 2. Buscar pedido (farmacia já vem populada)
                const pedidoResponse = await api.get(`/pedidos/${pedidoId}`)
                const pedidoData = pedidoResponse.data.pedido;
                setPedido(pedidoData)
                const farmacia = pedidoData.farmacia;

                // 3. Montar endereço completo da farmácia
                const enderecoFarmacia = `${farmacia.rua || ''}, ${farmacia.numero || ''}, ${farmacia.bairro || ''}, ${farmacia.cidade || ''}, ${farmacia.uf || ''}, ${farmacia.cep || ''}, Brazil`
                const origem = encodeURIComponent(enderecoFarmacia)
                const destino = `${latCliente},${lonCliente}`

                // 4. Buscar rota no Google Directions API
                const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&key=${GOOGLE_API_KEY}&mode=driving`
                const response = await fetch(url)
                const data = await response.json()

                if (data.status !== 'OK' || !data.routes.length) {
                    setTempoEntrega(null)
                    setLoading(false)
                    return
                }

                // 5. Pega o tempo estimado (em segundos) e converte para minutos
                const duration = data.routes[0].legs[0].duration
                setTempoEntrega(Math.ceil(duration.value / 60)) // minutos
            } catch (e) {
                setTempoEntrega(null)
            } finally {
                setLoading(false)
            }
        }

        calcularTempoEntrega()
    }, [pedidoId])

    if (loading || !pedido) return (
        <GenericContainer className="justify-center items-center">
            <ActivityIndicator size={40} color="#2f88ff" />
        </GenericContainer>
    )

    // Dados do pedido
    const farmacia = pedido.farmacia
    const item = pedido.itensPedido[0]?.product
    const quantidade = pedido.itensPedido[0]?.quantidade
    const valor = pedido.precoTotal
    const enderecoSaida = `${farmacia.rua || ''}, ${farmacia.numero || ''} - ${farmacia.bairro || ''}, ${farmacia.cidade || ''} - ${farmacia.uf || ''}, ${farmacia.cep || ''}`
    const enderecoChegada = `${pedido.endereco1 || ''}${pedido.endereco2 ? ', ' + pedido.endereco2 : ''} - ${pedido.city || ''}, ${pedido.pais || ''}, ${pedido.cep || ''}`

    // Imagem da farmácia (exemplo: pode vir do cadastro da farmácia ou usar um placeholder)
    const imgFarmacia = farmacia.imagem_url || 'https://picsum.photos/100/100'

    return (
        <GenericContainer>
            <View className="flex-row items-center justify-between mb-4">
                <ReturnButton />
                <BodyText className="text-primaryBlue text-lg"
                    onPress={() => {
                        router.push({
                            pathname: '/pages/Clientes/HomeClientes',
                        })
                    }}>Início</BodyText>
            </View>

            <View className='flex-row items-center justify-center mb-4'>
                <Heading1>Pedido</Heading1>
            </View>

            <View className="bg-white rounded-lg flex-row items-center p-4 mb-4">
                <Image
                    source={{ uri: imgFarmacia }}
                    style={{ width: 60, height: 60, borderRadius: 10, marginRight: 16 }}
                />
                <View>
                    <Heading2 className="mb-1">{farmacia.nome}</Heading2>
                    <BodyText>
                        {quantidade}x {item?.nome}
                    </BodyText>
                </View>
            </View>

            <Heading2 className="mb-2">
                Seu pedido chegará {tempoEntrega ? `em ${tempoEntrega} minutos` : 'em breve'}.
            </Heading2>
            <BodyText className="mb-4">
                Valor do pedido: R$ {valor}
            </BodyText>

            <BodyText className="font-bold mb-1">Endereço saída:</BodyText>
            <BodyText className="mb-3">{enderecoSaida}</BodyText>

            <BodyText className="font-bold mb-1">Endereço chegada:</BodyText>
            <BodyText>{enderecoChegada}</BodyText>
        </GenericContainer>
    )
}

export default AcompanharPedido