import {
    Text,
    View,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import * as Clipboard from 'expo-clipboard'
import { useLocalSearchParams, useRouter } from 'expo-router'
import GenericContainer from '@/src/components/ViewComponents'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import * as Location from 'expo-location'
import api from '@/src/services/api'
import { getSecureItem } from '../../../utils/secureStore'
import { Ionicons } from '@expo/vector-icons';

const FinalizarCompra = () => {
    const { id, quantidade } = useLocalSearchParams();
    const qtdSelecionada = Number(quantidade) || 1;

    // Estados de Dados
    const [produto, setProduto] = useState<any>(null);
    const [endereco, setEndereco] = useState({ rua: '', cidade: '', cep: '', pais: '', numero: '' });
    const [usuarioId, setUsuarioId] = useState('');
    
    // Campo de Telefone
    const [telefone, setTelefone] = useState('');

    // Estados de Controle
    const [loadingData, setLoadingData] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const chavePix = '00020126580014BR.GOV.BCB.PIX0136e1f0b0d5-4b4e-4e5c-9d77-fakepixkey520400005303986540410005802BR5925Farmacia Exemplo6009Sao Paulo62070503***6304B13F';
    const router = useRouter();

    // Função auxiliar de máscara
    const formatarTelefone = (text: string) => {
        if (!text) return '';
        let cleaned = text.replace(/\D/g, '');
        if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);
        let formatted = cleaned;
        if (cleaned.length > 2) formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
        if (cleaned.length > 7) formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
        return formatted;
    }

    const handleTelefoneChange = (text: string) => {
        setTelefone(formatarTelefone(text));
    }

    // 1. Carrega Produto, Usuário e Localização
    useEffect(() => {
        async function loadAllData() {
            try {
                // A. Busca Produto
                const prodResponse = await api.get(`/produtos/${id}`);
                setProduto(prodResponse.data.produto);

                // B. Busca ID do Usuário Local
                const userId = await getSecureItem('userId');
                const token = await getSecureItem('token');
                setUsuarioId(userId || '');

                // C. Busca Dados do Usuário na API (Telefone)
                if (userId) {
                    try {
                        const userResponse = await api.get(`/usuarios/${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        
                        // --- CORREÇÃO AQUI ---
                        // Acessando .user conforme o JSON fornecido
                        const telVindoDaApi = userResponse.data.user?.telefone || '';
                        
                        // Aplica a formatação visual (XX) XXXXX-XXXX
                        setTelefone(formatarTelefone(telVindoDaApi));
                        
                    } catch (err) {
                        console.log("Erro ao buscar telefone do usuário", err);
                    }
                }

                // D. Busca Localização GPS
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    let location = await Location.getCurrentPositionAsync({});
                    let [address] = await Location.reverseGeocodeAsync(location.coords);
                    
                    setEndereco({
                        rua: address.street || '',
                        cidade: address.city || address.subregion || '',
                        cep: address.postalCode || '',
                        pais: address.country || 'Brasil',
                        numero: address.streetNumber || ''
                    });
                }
            } catch (e) {
                console.error("Erro ao carregar dados iniciais", e);
                Alert.alert('Atenção', 'Alguns dados não puderam ser carregados automaticamente.');
            } finally {
                setLoadingData(false);
            }
        }
        if (id) loadAllData();
    }, [id]);

    // 2. Enviar Pedido
    const handleFinalizarPedido = async () => {
        if (!telefone || telefone.length < 14) {
            Alert.alert('Campo Obrigatório', 'O telefone é obrigatório para contato.');
            return;
        }
        if (!produto?.farmacia) {
            Alert.alert('Erro', 'Erro ao identificar a farmácia do produto.');
            return;
        }

        setLoadingSubmit(true);

        try {
            const enderecoCompleto = endereco.numero 
                ? `${endereco.rua}, ${endereco.numero}` 
                : endereco.rua;

            const pedidoPayload = {
                itensPedido: [
                    {
                        quantidade: qtdSelecionada,
                        product: id
                    }
                ],
                endereco1: enderecoCompleto,
                endereco2: "", 
                city: endereco.cidade,
                cep: endereco.cep,
                pais: endereco.pais,
                telefone: telefone, 
                status: "Pendente",
                usuario: usuarioId,
                farmacia: produto.farmacia._id || produto.farmacia
            };

            const response = await api.post('/pedidos', pedidoPayload);
            const pedidoId = response.data.pedido?._id || response.data._id;

            await Clipboard.setStringAsync(chavePix);
            
            Alert.alert(
                'Pedido Criado!', 
                'A chave Pix foi copiada. Finalize o pagamento no seu banco.',
                [
                    { 
                        text: 'OK', 
                        onPress: () => router.push({
                            pathname: '/pages/Produtos/MensagemFinal',
                            params: { id: pedidoId }
                        }) 
                    }
                ]
            );

        } catch (error: any) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível criar o pedido. Verifique os dados e tente novamente.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    if (loadingData) {
        return (
            <GenericContainer>
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={45} color='#2f88ff' />
                    <Text className="mt-4 font-poppins_medium text-slate-500">Carregando informações...</Text>
                </View>
            </GenericContainer>
        )
    }

    const valorTotal = produto ? (Number(produto.preco) * qtdSelecionada) : 0;

    return (
        <GenericContainer>
            <ReturnButton className='m-5' />
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    
                    <Heading1 className='text-center mb-6'>
                        Confirmação
                    </Heading1>

                    {/* Card de Endereço Detectado */}
                    <View className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mx-1 mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="location" size={24} color="#ef4444" style={{ marginRight: 8 }} />
                            <Heading2>Endereço de Entrega</Heading2>
                        </View>
                        {endereco.rua ? (
                            <View className="ml-8">
                                <Text className="font-poppins_bold text-slate-700 text-base">
                                    {endereco.rua}, {endereco.numero}
                                </Text>
                                <Text className="font-poppins_regular text-slate-500 text-sm">
                                    {endereco.cidade} - {endereco.cep}
                                </Text>
                            </View>
                        ) : (
                            <Text className="ml-8 font-poppins_regular text-slate-400 italic">
                                Localização não identificada.
                            </Text>
                        )}
                    </View>

                    {/* Input de Telefone (Preenchido automaticamente) */}
                    <View className="mb-6 px-1">
                        <TextInputComponent
                            label="Telefone / WhatsApp"
                            value={telefone}
                            onChangeText={handleTelefoneChange}
                            placeholder="(00) 00000-0000"
                            keyboardType="numeric"
                            maxLength={15}
                            rightIcon={<Ionicons name="call" size={20} color="#64748b" />}
                        />
                    </View>

                    {/* Resumo de Valores */}
                    <View className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8">
                        <View className="flex-row justify-between mb-2">
                            <Text className="font-poppins_regular text-slate-600">Produto:</Text>
                            <Text className="font-poppins_medium text-slate-800">{produto?.nome}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="font-poppins_regular text-slate-600">Quantidade:</Text>
                            <Text className="font-poppins_medium text-slate-800">{qtdSelecionada} un.</Text>
                        </View>
                        <View className="h-[1px] bg-slate-300 my-2" />
                        <View className="flex-row justify-between items-center">
                            <Text className="font-poppins_bold text-slate-700 text-lg">Total:</Text>
                            <Text className="font-poppins_bold text-green-600 text-xl">
                                R$ {valorTotal.toFixed(2).replace('.', ',')}
                            </Text>
                        </View>
                    </View>

                    {/* Área do Pix */}
                    <View className="items-center mb-8 opacity-80">
                        <Image
                            style={{ width: 100, height: 35, resizeMode: 'contain', marginBottom: 10 }}
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94Pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png' }}
                        />
                        <Text className="text-center font-poppins_regular text-slate-400 text-xs px-10">
                            Ao confirmar, a chave Pix será copiada automaticamente.
                        </Text>
                    </View>

                    <PrimaryButton onPress={handleFinalizarPedido} disabled={loadingSubmit}>
                        {loadingSubmit ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text>Confirmar e Pagar</Text>
                        )}
                    </PrimaryButton>

                </ScrollView>
            </KeyboardAvoidingView>
        </GenericContainer>
    )
}

export default FinalizarCompra;