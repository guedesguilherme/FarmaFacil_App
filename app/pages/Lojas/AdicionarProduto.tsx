import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import GenericContainer, { Form } from '@/src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import { Calendar } from 'react-native-calendars'
import { Asset } from 'expo-asset'
import api from '@/src/services/api'
import * as SecureStore from 'expo-secure-store'

const AdicionarProduto = () => {
    const [error, setError] = useState('')
    const [nomeProduto, setNomeProduto] = useState('')
    const [nomeQuimico, setNomeQuimico] = useState('')
    const [preco, setPreco] = useState('')
    const [estoque, setEstoque] = useState('')
    const [lote, setLote] = useState('')
    const [open, setOpen] = useState(false)
    const [validade, setValidade] = useState('')
    const [dataOriginal, setDataOriginal] = useState('')
    const [farmaId, setFarmaId] = useState('')

    function formatarParaReal(valor: string): string {
        const somenteNumeros = valor.replace(/\D/g, '')
        const numero = (parseFloat(somenteNumeros) / 100).toFixed(2)
        return 'R$ ' + numero.replace('.', ',')
    }

    function desformatarValor(valorFormatado: string): string {
        if (!valorFormatado) return ''
        const somenteNumerosEVirgula = valorFormatado.replace(/[^\d,]/g, '')
        return somenteNumerosEVirgula.replace(',', '.')
    }

    function openModal() {
        setOpen(!open)
    }

    useEffect(() => {
        const fetchFarmaId = async () => {
            const id = await SecureStore.getItemAsync('id_farmacia')
            if (id) setFarmaId(id)
        }
        fetchFarmaId()
    }, [])

    const handleNovoProduto = async () => {
        setError('')

        if (!nomeProduto || !nomeQuimico || !preco || !estoque || !validade || !lote) {
            Alert.alert('Erro', 'Todos os campos precisam estar preenchidos!')
            return
        }

        try {
            const precoFinal = desformatarValor(preco)

            const asset = Asset.fromModule(require('@/assets/images/andre.jpg'))
            await asset.downloadAsync()
            const fileUri = asset.localUri || asset.uri

            const formData = new FormData()
            formData.append('farmacia', farmaId)
            formData.append('nome', nomeProduto)
            formData.append('nome_quimico', nomeQuimico)
            formData.append('preco', precoFinal)
            formData.append('quantidade', estoque)
            formData.append('validade', dataOriginal)
            formData.append('lote', lote)
            formData.append('label', 'analgésico')

            formData.append('imagem', {
                uri: fileUri,
                name: 'andre.jpg',
                type: 'image/jpeg'
            } as any)

            const response = await api.post('/produtos/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            Alert.alert('Sucesso', response.data.msg)
        } catch (error: any) {
            console.error(error.response?.data || error.message)
            Alert.alert('Erro', error.response?.data?.msg || 'Erro ao registrar o produto')
        }
    }

    return (
        <GenericContainer>
            <ReturnButton />

            <Heading1 className="text-center mt-7 mb-2">
                Cadastrar um novo produto:
            </Heading1>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Form>
                    <TextInput value="67f99b88f65345cd8348377b" style={{ display: 'none' }} />

                    <TextInputComponent
                        label="Nome:"
                        value={nomeProduto}
                        onChangeText={setNomeProduto}
                    />

                    <TextInputComponent
                        label="Nome químico:"
                        value={nomeQuimico}
                        onChangeText={setNomeQuimico}
                    />

                    <TextInputComponent
                        label="Preço"
                        value={preco}
                        onChangeText={(texto) => setPreco(formatarParaReal(texto))}
                        keyboardType="numeric"
                    />

                    <TextInputComponent
                        label="Estoque:"
                        value={estoque}
                        onChangeText={setEstoque}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        className='w-full bg-white rounded-lg items-center justify-center'
                        onPress={openModal}
                    >
                        <TextInputComponent
                            label="Validade:"
                            editable={false}
                            value={validade}
                        />
                    </TouchableOpacity>

                    <TextInputComponent
                        label="Lote:"
                        value={lote}
                        onChangeText={setLote}
                    />

                    <TextInputComponent
                        label="Descrição:"
                        multiline
                        numberOfLines={4}
                    />

                    <PrimaryButton
                        onPress={handleNovoProduto}
                    >
                        <Text>Registrar</Text>
                    </PrimaryButton>
                </Form>
            </ScrollView>

            <Modal animationType='slide' transparent={false} visible={open}>
                <View className='flex-1 justify-center items-center mt-6'>
                    <Heading2>
                        Selecione uma data:
                    </Heading2>
                    <View className='m-5 bg-white rounded-2xl w-[90%] p-9 shadow-black elevation-md'>
                        <Calendar
                            onDayPress={(day) => {
                                const [ano, mes, dia] = day.dateString.split('-')
                                const dataFormatada = `${dia}/${mes}/${ano}`
                                setValidade(dataFormatada)
                                setDataOriginal(day.dateString)
                            }}
                            markedDates={{
                                [dataOriginal]: {
                                    selected: true,
                                    selectedColor: '#2196F3',
                                    selectedTextColor: '#fff'
                                }
                            }}
                            minDate={new Date().toISOString().split('T')[0]}
                        />
                        <PrimaryButton onPress={openModal}>
                            Fechar
                        </PrimaryButton>
                    </View>
                </View>
            </Modal>
        </GenericContainer>
    )
}

export default AdicionarProduto
