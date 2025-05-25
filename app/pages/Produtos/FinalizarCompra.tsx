import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import * as Clipboard from 'expo-clipboard'
import { useLocalSearchParams, router } from 'expo-router'

const FinalizarCompra = () => {

    const { id } = useLocalSearchParams();

    const [copiedText, setCopiedText] = useState('');

    const chavePix = 'Exercitation veniam mollit officia consequat labore labore labore cupidatat nulla labore sunt. Anim duis id nostrud fugiat incididunt aliquip ea exercitation fugiat minim sunt proident adipisicing cupidatat. Non adipisicing velit nisi ipsum ex duis ipsum nulla eu ex voluptate elit. Irure aute est et velit minim reprehenderit adipisicing ullamco culpa id occaecat aliquip ea. Aliquip adipisicing minim mollit tempor pariatur ullamco ad aliquip excepteur anim. Qui ipsum aliqua amet sit sunt aute ullamco qui incididunt minim. Id nostrud sit exercitation nulla irure aliqua consectetur.'

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(chavePix);
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
    };

    return (
        <View className='flex-1 m-5 '>
            <ReturnButton />
            <View
                className='flex-col mt-10'
            >
                <Heading1 className='text-center mb-3'>
                    Pagamento
                </Heading1>
                <View className='justify-center items-center'>
                    <Image
                        style={{ width: 200, height: 80, }}
                        source={{
                            uri: 'https://s2-techtudo.glbimg.com/8CYJpCx54gNyNrHWwm2x9-DHAiw=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/T/d/9KN7bBSd6UKk4hcitczA/marca-pix-1-.jpg'
                        }}
                    />
                </View>
                <Heading1 className='text-center mt-2.5'>
                    Pedido aguardando pagamento
                </Heading1>
                <Heading2 className='text-center'>
                    Copie o código pix abaixo para realizar o pagamento:
                </Heading2>
                <ScrollView
                    className='
                        border-2 
                        p-2
                        mt-2.5
                        border-primaryBlue
                        rounded-lg                                                
                    '
                    horizontal={true}
                >
                    <Text
                        className='font-bold'
                    >
                        {chavePix}
                    </Text>
                </ScrollView>

            </View>
            <View
                className='
                    mt-52
                    gap-3 
                    justify-center 
                    items-center
                '
            >
                <PrimaryButton
                    onPress={
                        () => {
                            copyToClipboard(),
                                Alert.alert('Copiado', 'Chave pix copiada com sucesso!'),
                                router.push({
                                    pathname: '/pages/Produtos/MensagemFinal',
                                    params: { id: id }
                                })
                        }
                    }
                >
                    <Heading1>
                        Copiar código pix
                    </Heading1>
                </PrimaryButton>
                <PrimaryButton onPress={fetchCopiedText}>
                    <Heading1 className='text-center'>
                        Compartilhar código pix
                    </Heading1>
                </PrimaryButton>
            </View>
        </View>
    )
}

export default FinalizarCompra

const styles = StyleSheet.create({})