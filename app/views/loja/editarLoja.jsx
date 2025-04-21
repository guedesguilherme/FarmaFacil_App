import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import axios from 'axios'

const editarLoja = () => {
    const [farmacia, setFarmacia] = useState({
        nome: '',
        cnpj: '',
        rede: '',
        email: '',
        rua: '',
        bairro: '',
        numero: '',
        cep: '',
        cidade: '',
        uf: ''
    })
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState('')
    const router = useRouter()

    useEffect(() => {
        const fetchLojaId = async () => {
            try {

                const tokenLoja = await AsyncStorage.getItem('token')
                const lojaId = await AsyncStorage.getItem('lojaId')

                if (!tokenLoja || !lojaId) {
                    setErro('Você não está autenticado(a) para acessar esta página. Por favor, faça login novamente.')
                    Alert.alert('Você não está autenticado(a) para acessar esta página. Por favor, faça login novamente.')
                    router.navigate('auth/loja/loginLoja')
                    setLoading(false)
                    return
                }

                const response = await axios.get(`https://api-cadastro-farmacias.onrender.com/farma/${lojaId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenLoja}`
                    },
                })

                setFarmacia(response.data.farma)
            } catch (error) {
                console.error(error)
                setErro(`Erro ao carregar informações da farmácia: ${error}`)
            } finally {
                setLoading(false)
            }
        }

        fetchLojaId()
    }, [])

    const handleInputChange = (field, value) => {
        setFarmacia((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        try {
            setLoading(true);
            const tokenLoja = await AsyncStorage.getItem('token');
            const lojaId = await AsyncStorage.getItem('lojaId');

            await axios.patch(
                `https://api-cadastro-farmacias.onrender.com/farma/${lojaId}`,
                farmacia,
                {
                    headers: {
                        Authorization: `Bearer ${tokenLoja}`,
                    },
                }
            );

            Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');

            router.push('/views/loja/homeLoja');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível atualizar as informações.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#2f88ff" />;
    }

    if (erro) {
        return <Text style={{ color: 'red', textAlign: 'center' }}>{erro}</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Form */}
            <View>            
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={farmacia.nome}
                    onChangeText={(text) => handleInputChange('nome', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CNPJ"
                    value={farmacia.cnpj}
                    onChangeText={(text) => handleInputChange('cnpj', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Rede"
                    value={farmacia.rede}
                    onChangeText={(text) => handleInputChange('rede', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={farmacia.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Rua"
                    value={farmacia.rua}
                    onChangeText={(text) => handleInputChange('rua', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bairro"
                    value={farmacia.bairro}
                    onChangeText={(text) => handleInputChange('bairro', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número"
                    value={farmacia.numero}
                    onChangeText={(text) => handleInputChange('numero', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CEP"
                    value={farmacia.cep}
                    onChangeText={(text) => handleInputChange('cep', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    value={farmacia.cidade}
                    onChangeText={(text) => handleInputChange('cidade', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="UF"
                    value={farmacia.uf}
                    onChangeText={(text) => handleInputChange('uf', text)}
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => {
                handleSave()
                router.push('/views/loja/homeLoja')
            }}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
        </View>
    );
}

export default editarLoja

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2f88ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
