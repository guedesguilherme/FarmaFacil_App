import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter, Link } from "expo-router";
import Ionicons from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import { useCadastroLoja } from "../context/CadastroLojaContext";

const CadastroLoja = () => {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [nomeRede, setNomeRede] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const { setDados } = useCadastroLoja();
  const handleSubmit = () => {
    if (!cnpj || !nome || !nomeRede || !email) {
      setError("Todos os campos são obrigatórios!");
    } else {
      setDados({ cnpj, nome, nomeRede, email }); // Salva dados no contexto
      setError("");
      router.push('/cadastroLojaEndereco');
    }
  };

  return (
    <View>
      <Pressable onPress={() => router.push('/')}
        style={{
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderColor: '#2f88ff',
          width: 'auto',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          width: '50%'
        }}>
        <AntDesign name="arrowleft" size={24} color="#2f88ff" />
        <Text style={{ fontSize: 18 }}>Voltar à Home</Text>
      </Pressable>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          padding: 20,
          fontWeight: 'bold'
        }}
      >
        Cadastro - Lojas
      </Text>
      <View style={styles.containerInput}>
        <Text>Insira o CNPJ da sua loja:</Text>
        <TextInput
          style={styles.input}
          value={cnpj}
          onChangeText={setCnpj} // Atualiza o estado 'cnpj'
        />
      </View>
      <View style={styles.containerInput}>
        <Text>Insira o nome da sua loja:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome} // Atualiza o estado 'nome'
        />
      </View>
      <View style={styles.containerInput}>
        <Text>Insira o nome da rede da sua loja:</Text>
        <TextInput
          style={styles.input}
          value={nomeRede}
          onChangeText={setNomeRede} // Atualiza o estado 'nomeRede'
        />
      </View>
      <View style={styles.containerInput}>
        <Text>Insira o e-mail da sua loja:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail} // Atualiza o estado 'email'
        />
      </View>

      {error ? <Text style={styles.error}
      >
        {error}
      </Text> : null
      }

      <View style={[styles.buttonContainer]}>
        <Pressable
          style={[styles.button]}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: 'bold' }}>
            Próxima
          </Text>
        </Pressable>
      </View>

      <View style={styles.links}>
        <Link href="/loginLoja"
          style={{ fontSize: 18, color: '#2f88ff', textDecorationLine: 'underline' }}
        >
          Já tenho cadastro
        </Link>
        <Link href="/loginCliente"
          style={{ fontSize: 18, color: '#2f88ff', textDecorationLine: 'underline' }}
        >
          Sou um cliente
        </Link>
      </View>

    </View>
  )
}

export default CadastroLoja

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#2f88ff',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '95%',
  },
  button: {
    width: "85%",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    fontSize: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2f88ff",
    backgroundColor: '#2f88ff',
    marginTop: 20
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInput: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20
  },
  error: {
    fontSize: 18,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 10,
    textAlign: 'center'
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    gap: 20,
  }
})
