import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import GenericContainer, { Form } from '@/src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import { Calendar } from 'react-native-calendars'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'
import api from '@/src/services/api'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

const AdicionarProduto = () => {

    const router = useRouter()

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
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState<any>(null)

    const [loading, setLoading] = useState(false)

    const escolherImagem = async () => {
        Alert.alert(
            "Imagem do Produto",
            "Como deseja adicionar a imagem?",
            [
                {
                    text: "Câmera",
                    onPress: async () => {
                        const { status } = await ImagePicker.requestCameraPermissionsAsync()
                        if (status !== 'granted') {
                            Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera.')
                            return
                        }
                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 0.7,
                        })
                        if (!result.canceled) {
                            setImagem(result.assets[0])
                        }
                    }
                },
                {
                    text: "Galeria",
                    onPress: async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                        if (status !== 'granted') {
                            Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.')
                            return
                        }
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 0.7,
                        })
                        if (!result.canceled) {
                            setImagem(result.assets[0])
                        }
                    }
                },
                { text: "Cancelar", style: "cancel" }
            ]
        )
    }

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
        if (!imagem) {
            Alert.alert('Erro', 'Tire uma foto do produto!')
            return
        }

        setLoading(true)

        try {
            const precoFinal = desformatarValor(preco)

            const formData = new FormData()
            formData.append('farmacia', farmaId)
            formData.append('nome', nomeProduto)
            formData.append('nome_quimico', nomeQuimico)
            formData.append('preco', precoFinal)
            formData.append('quantidade', estoque)
            formData.append('validade', dataOriginal)
            formData.append('lote', lote)
            formData.append('label', descricao)

            formData.append('imagem', {
                uri: imagem.uri,
                name: 'produto.jpg',
                type: 'image/jpeg'
            } as any)

            const response = await api.post('/produtos/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setNomeProduto('')
            setNomeQuimico('')
            setLote('')
            setValidade('')
            setDataOriginal('')
            setImagem('')
            setEstoque('')
            setDescricao('')
            setPreco('')
            Alert.alert('Sucesso', response.data.msg)
            router.push('/pages/Lojas/HomeLoja')
        } catch (error: any) {
            console.error(error.response?.data || error.message)
            console.error(error)
            Alert.alert('Erro', error.response?.data?.msg || 'Erro ao registrar o produto:\n' + error)
        } finally {
            setLoading(false)
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
                    <View className="flex-row  items-center">
                        <View className="flex-1">
                            <TouchableOpacity
                                className="w-full items-center justify-center my-4"
                                onPress={escolherImagem}
                                activeOpacity={0.7}
                            >
                                {imagem ? (
                                    <Image
                                        source={{ uri: imagem.uri }}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: '#2563eb',
                                            alignSelf: 'center',
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: '#2563eb',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            backgroundColor: '#f1f5f9',
                                        }}
                                    >
                                        <Text style={{ color: '#2563eb', fontSize: 16 }}>Toque para tirar/adicionar foto</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

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

                    <View className="flex-row gap-2 mb-3 items-center">
                        <View className="flex-1 ">
                            <TextInputComponent
                                label="Estoque:"
                                value={estoque}
                                onChangeText={setEstoque}
                                keyboardType="numeric"
                                className="h-12" // altura igual aos outros campos
                            />
                        </View>
                        <View className="flex-1">
                            <TouchableOpacity onPress={openModal}>
                                <TextInputComponent
                                    label="Validade:"
                                    editable={false}
                                    value={validade}
                                    className="h-12"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <TextInputComponent
                                label="Lote:"
                                value={lote}
                                onChangeText={setLote}
                                className="h-12"
                            />
                        </View>
                    </View>

                    <TextInputComponent
                        label="Descrição:"
                        multiline
                        numberOfLines={4}
                        value={descricao}
                        onChangeText={setDescricao}
                    />

                    <PrimaryButton
                        onPress={handleNovoProduto}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text>Registrar</Text>
                        )}
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
