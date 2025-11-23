import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Image, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import api from '@/src/services/api'
import GenericContainer from '@/src/components/ViewComponents'
import { ReturnButton } from "@/src/components/ButtonsComponent";
import { Heading1, Heading2, BodyText, Heading3 } from '@/src/components/TextComponent'
import { Ionicons } from '@expo/vector-icons';

const AcompanharPedido = () => {
    const { id } = useLocalSearchParams()
    const pedidoId = id

    const [loading, setLoading] = useState(true)
    const [pedido, setPedido] = useState<any>(null)

    useEffect(() => {
        if (!pedidoId) return;
        
        async function carregarDados() {
            try {
                const pedidoResponse = await api.get(`/pedidos/${pedidoId}`)
                const pedidoData = pedidoResponse.data.pedido;
                setPedido(pedidoData)
            } catch (e) {
                console.error("Erro ao carregar dados:", e)
            } finally {
                setLoading(false)
            }
        }

        carregarDados()
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
    const enderecoSaida = `${farmacia.rua || ''}, ${farmacia.numero || ''} - ${farmacia.bairro || ''}, ${farmacia.cidade || ''}`
    const enderecoChegada = `${pedido.endereco1 || ''}${pedido.endereco2 ? ', ' + pedido.endereco2 : ''} - ${pedido.city || ''}, ${pedido.pais || ''}, ${pedido.cep || ''}`
    const imgFarmacia = farmacia.imagem_url || 'https://picsum.photos/100/100'

    // Lógica do Código de Entrega (4 últimos dígitos do telefone)
    const codigoEntrega = pedido.telefone ? pedido.telefone.slice(-4) : '----';

    return (
        <GenericContainer>
            <View className="flex-row items-center justify-between mb-4 mt-2">
                <ReturnButton />
                <BodyText className="text-primaryBlue text-lg font-bold"
                    onPress={() => router.replace('/pages/Clientes/HomeClientes')}>
                    Início
                </BodyText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                
                <View className='items-center mb-6'>
                    <Heading1>Acompanhar Pedido</Heading1>
                    <BodyText className="text-slate-400 text-sm">#{pedido._id.slice(-6).toUpperCase()}</BodyText>
                </View>

                {/* Card da Farmácia */}
                <View className="bg-white rounded-2xl border border-slate-200 flex-row items-center p-4 mb-6 shadow-sm">
                    <Image
                        source={{ uri: imgFarmacia }}
                        style={{ width: 60, height: 60, borderRadius: 30, marginRight: 16 }}
                    />
                    <View className="flex-1">
                        <Heading2 className="mb-1 text-slate-800">{farmacia.nome}</Heading2>
                        <BodyText className="text-slate-500">
                            {quantidade}x {item?.nome || 'Produto'}
                        </BodyText>
                        <BodyText className="text-green-600 font-bold mt-1">
                            R$ {Number(valor).toFixed(2).replace('.', ',')}
                        </BodyText>
                    </View>
                </View>

                {/* --- ÁREA DINÂMICA DE STATUS --- */}
                <View className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                    
                    {/* CASO 1: PENDENTE */}
                    {pedido.status === 'Pendente' && (
                        <View className="items-center">
                            <Ionicons name="cube-outline" size={48} color="#f59e0b" />
                            <Heading2 className="mt-3 text-center text-slate-700">Pedido em separação</Heading2>
                            <BodyText className="text-center text-slate-500 mt-2">
                                A farmácia está preparando seus itens.
                            </BodyText>
                        </View>
                    )}

                    {/* CASO 2: A CAMINHO */}
                    {pedido.status === 'A caminho' && (
                        <View className="items-center">
                            <View className="bg-blue-100 p-3 rounded-full mb-3">
                                <Ionicons name="bicycle" size={40} color="#2f88ff" />
                            </View>
                            <Heading2 className="text-center text-slate-800">Pedido a caminho!</Heading2>
                            
                            {pedido.entregador && (
                                <BodyText className="text-center text-slate-600 mt-1">
                                    Entregador: <BodyText className="font-bold">{pedido.entregador.nome}</BodyText>
                                </BodyText>
                            )}

                            <View className="w-full h-[1px] bg-slate-200 my-3" />

                            <View className="items-center">
                                <BodyText className="text-slate-500 mb-1">Informe este código ao receber:</BodyText>
                                <View className="bg-white border-2 border-dashed border-primaryBlue px-6 py-2 rounded-lg">
                                    <Heading1 className="text-primaryBlue tracking-widest">{codigoEntrega}</Heading1>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* CASO 3: CONCLUÍDO */}
                    {pedido.status === 'Concluido' && (
                        <View className="items-center">
                            <Ionicons name="checkmark-circle" size={56} color="#16a34a" />
                            <Heading2 className="mt-2 text-center text-green-600">Pedido Entregue</Heading2>
                            <BodyText className="text-center text-slate-500 mt-2">
                                Obrigado por comprar conosco!
                            </BodyText>
                        </View>
                    )}
                </View>

                {/* Detalhes de Endereço */}
                <View className="px-2">
                    <View className="flex-row items-start mb-4">
                        <Ionicons name="storefront-outline" size={20} color="#64748b" style={{ marginTop: 2, marginRight: 8 }} />
                        <View className="flex-1">
                            <Heading3 className="text-slate-700">Retirada</Heading3>
                            <BodyText className="text-slate-500 text-sm">{enderecoSaida}</BodyText>
                        </View>
                    </View>

                    <View className="flex-row items-start">
                        <Ionicons name="location-outline" size={20} color="#64748b" style={{ marginTop: 2, marginRight: 8 }} />
                        <View className="flex-1">
                            <Heading3 className="text-slate-700">Entrega</Heading3>
                            <BodyText className="text-slate-500 text-sm">{enderecoChegada}</BodyText>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </GenericContainer>
    )
}

export default AcompanharPedido