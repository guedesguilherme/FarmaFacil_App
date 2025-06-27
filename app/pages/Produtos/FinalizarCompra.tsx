import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Alert,
    ActivityIndicator,
    Share
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import * as Clipboard from 'expo-clipboard'
import { useLocalSearchParams, useRouter } from 'expo-router'
import GenericContainer from '@/src/components/ViewComponents'
import * as Location from 'expo-location'
import api from '@/src/services/api'
import { getSecureItem } from '../../../utils/secureStore' // ajuste o caminho se necessário

const FinalizarCompra = () => {
    const { id } = useLocalSearchParams(); // id do produto
    const [endereco1, setEndereco1] = useState('');
    const [city, setCity] = useState('');
    const [cep, setCep] = useState('');
    const [pais, setPais] = useState('');
    const [telefone, setTelefone] = useState('');
    const [loadingEndereco, setLoadingEndereco] = useState(true);
    const [farmaciaId, setFarmaciaId] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const chavePix = '00020126580014BR.GOV.BCB.PIX0136e1f0b0d5-4b4e-4e5c-9d77-fakepixkey520400005303986540410005802BR5925Nome do Recebedor Exemplo6009Sao Paulo62070503***6304B13F';
    const router = useRouter();

    // Busca dados do produto para pegar o id da farmácia
    useEffect(() => {
        async function fetchProduto() {
            try {
                const response = await api.get(`/produtos/${id}`);
                setFarmaciaId(response.data.produto.farmacia?._id || response.data.produto.farmacia);
            } catch (e) {
                Alert.alert('Erro', 'Não foi possível obter a farmácia do produto.');
            }
        }
        if (id) fetchProduto();
    }, [id]);

    // Busca localização e faz reverse geocode
    useEffect(() => {
        (async () => {
            setLoadingEndereco(true)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Não foi possível acessar sua localização.');
                setLoadingEndereco(false)
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            let [address] = await Location.reverseGeocodeAsync(location.coords);
            setEndereco1(address.street || '');
            setCity(address.city || address.subregion || address.region || 'Cidade não encontrada');
            setCep(address.postalCode || '');
            setPais(address.country || '');
            setLoadingEndereco(false)
        })();
    }, []);

    // Busca o usuário logado do SecureStore
    useEffect(() => {
        (async () => {
            const id = await getSecureItem('userId');
            setUsuarioId(id);
        })();
    }, []);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(chavePix);
    };

    const handleFinalizar = async () => {
        if (!telefone) {
            Alert.alert('Erro', 'Preencha o telefone!');
            return;
        }
        if (!farmaciaId) {
            Alert.alert('Erro', 'Não foi possível identificar a farmácia.');
            return;
        }
        if (!usuarioId) {
            Alert.alert('Erro', 'Usuário não identificado!');
            return;
        }
        try {
            const pedido = {
                itensPedido: [
                    {
                        quantidade: 1,
                        product: id // id do produto
                    }
                ],
                endereco1,
                city,
                cep,
                pais,
                telefone,
                usuario: usuarioId,
                farmacia: farmaciaId,
                status: 'Pendente'
            };

            const response = await api.post('/pedidos', pedido);
            const pedidoId = response.data.pedido?._id || response.data._id;

            await copyToClipboard();
            Alert.alert('Copiado', 'Chave pix copiada com sucesso!');
            router.push({
                pathname: '/pages/Produtos/MensagemFinal',
                params: { id: pedidoId }
            });
        } catch (error) {
            Alert.alert('Erro', 'Erro ao criar pedido.');
            console.error(error);
        }
    };

    const handleCompartilhar = async () => {
        if (!telefone) {
            Alert.alert('Erro', 'Preencha o telefone!');
            return;
        }
        if (!farmaciaId) {
            Alert.alert('Erro', 'Não foi possível identificar a farmácia.');
            return;
        }
        if (!usuarioId) {
            Alert.alert('Erro', 'Usuário não identificado!');
            return;
        }
        try {
            const pedido = {
                itensPedido: [
                    {
                        quantidade: 1,
                        product: id // id do produto
                    }
                ],
                endereco1,
                city,
                cep,
                pais,
                telefone,
                usuario: usuarioId,
                farmacia: farmaciaId,
                status: 'Pendente'
            };

            const response = await api.post('/pedidos', pedido);
            const pedidoId = response.data.pedido?._id || response.data._id;

            await copyToClipboard();
            Alert.alert('Copiado', 'Chave pix copiada com sucesso!');
            await Share.share({
                message: `Chave Pix para pagamento:\n${chavePix}`,
            });
            router.push({
                pathname: '/pages/Produtos/MensagemFinal',
                params: { id: pedidoId }
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível compartilhar o código Pix.');
            console.error(error);
        }
    };

    if (loadingEndereco) {
        return (
            <GenericContainer className='justify-center items-center'>
                <ActivityIndicator size={45} color='#2f88ff' />
            </GenericContainer>
        )
    }

    return (
        <GenericContainer>
            <ReturnButton className='m-5' />
            <View className='flex-col mt-5'>
                <Heading1 className='text-center mb-3'>
                    Pagamento
                </Heading1>
                <View className='justify-center items-center'>
                    <Image
                        style={{ width: 200, height: 80 }}
                        source={{
                            uri: 'https://s2-techtudo.glbimg.com/8CYJpCx54gNyNrHWwm2x9-DHAiw=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/T/d/9KN7bBSd6UKk4hcitczA/marca-pix-1-.jpg'
                        }}
                    />
                </View>
                <Heading1 className='text-center mt-2.5'>
                    Pedido aguardando pagamento
                </Heading1>
                <Heading2 className='text-center mt-4 mb-2'>
                    Digite telefone para contato:
                </Heading2>
                {/* <View className="border-2 border-primaryBlue rounded-lg p-2 mb-2 bg-gray-100">
                    <Text>Endereço: {endereco1}</Text>
                    <Text>Cidade: {city}</Text>
                    <Text>CEP: {cep}</Text>
                    <Text>País: {pais}</Text>
                </View> */}
                <TextInput
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    className="border-2 border-primaryBlue rounded-lg p-2 mb-2"
                />
                <Heading2 className='text-center'>
                    Copie o código pix abaixo para realizar o pagamento:
                </Heading2>
                <ScrollView
                    className='
                        border-2 
                        p-2
                        mt-2.5
                        ml-5 
                        mr-5
                        border-primaryBlue
                        rounded-lg                                                
                    '
                    horizontal={true}
                >
                    <Text className='font-bold'>
                        {chavePix}
                    </Text>
                </ScrollView>
            </View>
            <View className='flex-1 justify-end mb-5'>
                <View className='justify-center items-center gap-3'>
                    <PrimaryButton onPress={handleFinalizar}>
                        <Heading1>
                            Copiar código pix
                        </Heading1>
                    </PrimaryButton>
                    <PrimaryButton onPress={handleCompartilhar}>
                        <Heading1 className='text-center'>
                            Compartilhar código pix
                        </Heading1>
                    </PrimaryButton>
                </View>
            </View>
        </GenericContainer>
    )
}

export default FinalizarCompra;
