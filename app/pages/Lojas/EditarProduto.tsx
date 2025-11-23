import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Modal, ActivityIndicator, Image } from 'react-native'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import GenericContainer, { Form } from '@/src/components/ViewComponents'
import { DangerButton, PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { Heading1, Heading2 } from '@/src/components/TextComponent'
import { Calendar } from 'react-native-calendars'
import * as ImagePicker from 'expo-image-picker'
import api from '@/src/services/api'
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router'

const AdicionarProduto = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    // Estados do formulário
    const [nomeProduto, setNomeProduto] = useState('')
    const [nomeQuimico, setNomeQuimico] = useState('')
    const [preco, setPreco] = useState('')
    const [estoque, setEstoque] = useState('')
    const [lote, setLote] = useState('')
    const [validade, setValidade] = useState('')
    const [dataOriginal, setDataOriginal] = useState('') 
    const [imagem, setImagem] = useState<any>(null)
    const [descricao, setDescricao] = useState('')

    // Estados de controle
    const [loadingScreen, setLoadingScreen] = useState(true)
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [informacoes, setInformacoes] = useState<any>(null)
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [temp, setTemp] = useState(false)

    // --- FUNÇÕES AUXILIARES ---
    const escolherImagem = async () => {
        Alert.alert(
            "Imagem do Produto",
            "Como deseja adicionar a imagem?",
            [
                {
                    text: "Câmera",
                    onPress: async () => {
                        const { status } = await ImagePicker.requestCameraPermissionsAsync()
                        if (status !== 'granted') return
                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 0.7,
                        })
                        if (!result.canceled) setImagem(result.assets[0])
                    }
                },
                {
                    text: "Galeria",
                    onPress: async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                        if (status !== 'granted') return
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 0.7,
                        })
                        if (!result.canceled) setImagem(result.assets[0])
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

    function openModal() { setOpen(!open) }
    function openDeleteModal() { setOpenDelete(!openDelete) }

    // --- BUSCA DE DADOS ---
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            async function getData() {
                try {
                    setLoadingScreen(true)
                    const info = await api.get(`/produtos/${id}`)
                    if (isActive) {
                        setInformacoes(info.data.produto)
                        setLoadingScreen(false)
                    }
                } catch (err) {
                    console.error(err)
                    if (isActive) setLoadingScreen(false)
                }
            }
            if (id) getData()
            return () => { isActive = false }
        }, [id])
    )

    // --- POPULA OS CAMPOS ---
    useEffect(() => {
        if (informacoes) {
            setNomeProduto(informacoes.nome || '')
            setNomeQuimico(informacoes.nome_quimico || '')
            
            const valorNumerico = Number(informacoes.preco || 0)
            setPreco(`R$ ${valorNumerico.toFixed(2).replace('.', ',')}`)

            setEstoque(informacoes.quantidade?.toString() || '')
            setLote(informacoes.lote || '')
            
            if (informacoes.validade) {
                const [ano, mes, dia] = informacoes.validade.split('-')
                setValidade(`${dia}/${mes}/${ano}`)
                setDataOriginal(informacoes.validade)
            }
            
            if (informacoes.imagem_url) {
                setImagem({ uri: informacoes.imagem_url })
            }
            
            setDescricao(informacoes.label || '')
        }
    }, [informacoes])

    // --- LÓGICA DE VERIFICAÇÃO DE MUDANÇAS ---
    const temAlteracoes = useMemo(() => {
        if (!informacoes) return false;

        const valorNumerico = Number(informacoes.preco || 0);
        const precoOriginalFormatado = `R$ ${valorNumerico.toFixed(2).replace('.', ',')}`;

        const imagemMudou = imagem?.uri !== informacoes.imagem_url;

        return (
            nomeProduto !== (informacoes.nome || '') ||
            nomeQuimico !== (informacoes.nome_quimico || '') ||
            preco !== precoOriginalFormatado ||
            estoque !== (informacoes.quantidade?.toString() || '') ||
            lote !== (informacoes.lote || '') ||
            dataOriginal !== (informacoes.validade || '') ||
            descricao !== (informacoes.label || '') ||
            imagemMudou
        );
    }, [nomeProduto, nomeQuimico, preco, estoque, lote, dataOriginal, descricao, imagem, informacoes]);


    // --- AÇÕES ---
    const editarInformacoes = async () => {
        if (!nomeProduto || !nomeQuimico || !preco || !estoque || !validade || !lote) {
            Alert.alert('Erro', 'Todos os campos precisam estar preenchidos!')
            return
        }
        
        setLoading(true)

        try {
            const precoFinal = desformatarValor(preco)
            const formData = new FormData()
            
            formData.append('nome', nomeProduto)
            formData.append('nome_quimico', nomeQuimico)
            formData.append('preco', precoFinal)
            formData.append('quantidade', estoque)
            formData.append('validade', dataOriginal)
            formData.append('lote', lote)
            formData.append('label', descricao)

            if (imagem.uri && !imagem.uri.startsWith('http')) {
                 formData.append('imagem', {
                    uri: imagem.uri,
                    name: 'produto.jpg',
                    type: 'image/jpeg'
                } as any)
            }

            const response = await api.patch(`/produtos/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            Alert.alert('Sucesso', response.data.msg)
            router.push('/pages/Lojas/Estoque')
            
        } catch (error: any) {
            console.error(error)
            Alert.alert('Erro', error.response?.data?.msg || 'Erro ao editar o produto.')
        } finally {
            setLoading(false)
        }
    }

    const deletarProduto = async () => {
        setDeleteLoading(true)
        setTemp(true)
        try {
            await api.delete(`/produtos/${id}`)
            Alert.alert('Sucesso', 'Produto deletado com sucesso.')
            router.navigate('/pages/Lojas/Estoque')            
        } catch (error) {
            Alert.alert('Erro', `Não foi possível deletar o produto: ${error}`)
        } finally { 
            setDeleteLoading(false); setTemp(false) 
        }
    }

    if (loadingScreen) {
        return (
            <View className='bg-white' style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator color="#2f88ff" size={45} />
            </View>
        );
    }

    return (
        <GenericContainer>
            <ReturnButton />

            <Heading1 className="text-center mt-7 mb-2">
                Editar este produto
            </Heading1>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Form>
                    <View className="flex-row items-center">
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
                                    <View style={{ width: 200, height: 200, borderRadius: 10, borderWidth: 2, borderColor: '#2563eb', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#f1f5f9' }}>
                                        <Text className='text-primaryBlue text-center text-xl'>Toque para tirar/adicionar foto</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInputComponent label="Nome:" value={nomeProduto} onChangeText={setNomeProduto} />
                    <TextInputComponent label="Nome químico:" value={nomeQuimico} onChangeText={setNomeQuimico} />
                    <TextInputComponent label="Preço" value={preco} onChangeText={(texto) => setPreco(formatarParaReal(texto))} keyboardType="numeric" />

                    <View className="flex-row gap-2 mb-3 items-center">
                        <View className="flex-1 ">
                            <TextInputComponent label="Estoque:" value={estoque} onChangeText={setEstoque} keyboardType="numeric" className="h-12" />
                        </View>
                        <View className="flex-1">
                            <TouchableOpacity onPress={openModal}>
                                <TextInputComponent label="Validade:" editable={false} value={validade} className="h-12" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <TextInputComponent label="Lote:" value={lote} onChangeText={setLote} className="h-12" />
                        </View>
                    </View>

                    <TextInputComponent label="Descrição:" multiline numberOfLines={4} value={descricao} onChangeText={setDescricao} />

                    {/* --- BOTÃO CORRIGIDO --- */}
                    {/* Removemos a View envolvente e aplicamos o style direto no botão */}
                    <PrimaryButton 
                        onPress={editarInformacoes} 
                        disabled={!temAlteracoes || loading}
                        style={{ opacity: (!temAlteracoes || loading) ? 0.5 : 1 }}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text>Editar</Text>
                        )}
                    </PrimaryButton>

                    <DangerButton onPress={openDeleteModal}>
                        <Text>Deletar produto</Text>
                    </DangerButton>
                </Form>
            </ScrollView>

            {/* Modais */}
            <Modal animationType='slide' transparent={false} visible={open}>
                <View className='flex-1 justify-center items-center mt-6'>
                    <View className='m-5 bg-white rounded-2xl w-[90%] p-9 shadow-black elevation-md'>
                        <Calendar
                            onDayPress={(day) => {
                                const [ano, mes, dia] = day.dateString.split('-')
                                setValidade(`${dia}/${mes}/${ano}`)
                                setDataOriginal(day.dateString)
                            }}
                            markedDates={{ [dataOriginal]: { selected: true, selectedColor: '#2196F3', selectedTextColor: '#fff' } }}
                            minDate={new Date().toISOString().split('T')[0]}
                        />
                        <PrimaryButton onPress={openModal}>Fechar</PrimaryButton>
                    </View>
                </View>
            </Modal>

            <Modal animationType='slide' transparent={false} visible={openDelete}>
                <View className='flex-1 justify-center items-center m-5'>
                    <Heading2 className='text-center'>Deseja mesmo deletar este produto?</Heading2>
                    <View className='flex flex-row items-center justify-center gap-20 mt-5 w-full'>
                        <TouchableOpacity className='border-2 border-primaryBlue p-5 rounded-lg w-[30%] flex items-center justify-center text-center' onPress={openDeleteModal}>
                            <Text className='text-primaryBlue font-bold'>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='border-2 border-red-500 p-5 rounded-lg w-[30%] flex items-center justify-center text-center' disabled={temp} onPress={deletarProduto}>
                            {deleteLoading ? <ActivityIndicator color="#f00" /> : <Text className='font-bold text-red-500'>Sim</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GenericContainer>
    )
}

export default AdicionarProduto