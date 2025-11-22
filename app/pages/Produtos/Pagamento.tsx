import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { PagamentoPix, ReturnButton } from '@/src/components/ButtonsComponent';
import { useLocalSearchParams } from 'expo-router';
import GenericContainer from '@/src/components/ViewComponents';
import api from '@/src/services/api';
import { Ionicons } from '@expo/vector-icons';

const Pagamento = () => {
    const { id, quantidade } = useLocalSearchParams();
    
    const qtdSelecionada = Number(quantidade) || 1;

    const [produto, setProduto] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProduto() {
            try {
                const response = await api.get(`produtos/${id}`);
                setProduto(response.data.produto);
            } catch (error) {
                console.error("Erro ao carregar produto para pagamento", error);
            } finally {
                setLoading(false);
            }
        }
        loadProduto();
    }, [id]);

    if (loading) {
        return (
            <GenericContainer>
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator color="#2f88ff" size={45} />
                </View>
            </GenericContainer>
        );
    }

    if (!produto) return null;

    const precoUnitario = Number(produto.preco);
    const valorTotal = precoUnitario * qtdSelecionada;

    return (
        <GenericContainer>
            <View className="mt-5 mb-4">
                <ReturnButton />
            </View>

            <Text className="text-center font-poppins_bold text-xl text-slate-800 mb-8">
                Finalizar Pedido
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* 1. Card de Resumo do Pedido */}
                <View className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
                    <View className="flex-row items-center mb-4 border-b border-slate-100 pb-4">
                        <Ionicons name="receipt-outline" size={24} color="#2f88ff" style={{ marginRight: 10 }} />
                        <Text className="font-poppins_bold text-slate-700 text-lg">Resumo</Text>
                    </View>

                    <View className="flex-row">
                        <View className="w-20 h-20 bg-slate-50 rounded-lg border border-slate-100 items-center justify-center mr-4">
                            <Image 
                                source={{ uri: produto.imagem_url }} 
                                className="w-16 h-16" 
                                resizeMode="contain" 
                            />
                        </View>

                        <View className="flex-1 justify-center">
                            <Text className="font-poppins_bold text-slate-800 text-base mb-1" numberOfLines={2}>
                                {produto.nome}
                            </Text>
                            <Text className="font-poppins_regular text-slate-500 text-sm">
                                {qtdSelecionada}x R$ {precoUnitario.toFixed(2).replace('.', ',')}
                            </Text>
                        </View>
                    </View>

                    <View className="mt-4 pt-4 border-t border-dashed border-slate-200 flex-row justify-between items-center">
                        <Text className="font-poppins_medium text-slate-500">Total a pagar:</Text>
                        <Text className="font-poppins_bold text-green-600 text-2xl">
                            R$ {valorTotal.toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                </View>

                {/* 2. Área de Pagamento (Borda Azul Removida) */}
                <View>
                    <Text className="font-poppins_bold text-slate-800 text-lg mb-4 ml-1">
                        Forma de pagamento
                    </Text>
                    
                    {/* Alterado aqui: border-2 border-primaryBlue -> border border-slate-200 */}
                    <View className="bg-white p-6 rounded-2xl border border-slate-200 items-center justify-center shadow-sm">
                        <Text className="font-poppins_regular text-slate-500 text-center mb-6">
                            Clique no botão abaixo para gerar o código Pix e finalizar sua compra.
                        </Text>

                        <PagamentoPix 
                            produtoId={id} 
                            quantidade={qtdSelecionada} 
                            valorTotal={valorTotal} 
                        />
                    </View>
                </View>

            </ScrollView>
        </GenericContainer>
    )
}

export default Pagamento

const styles = StyleSheet.create({})