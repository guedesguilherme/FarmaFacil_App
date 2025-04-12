import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,    
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCadastroLoja } from "../../../context/CadastroLojaContext";

const CadastroLoja = () => {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [rede, setRede] = useState('')
  const [error, setError] = useState('')  

  const router = useRouter()

  const { setDados } = useCadastroLoja();
  const handleSubmit = () => {
    if (!cnpj || !nome || !rede || !email) {
      setError("Todos os campos são obrigatórios!");      
    } else {
      setDados({ cnpj, nome, rede, email }); // Salva dados no contexto
      setError("");      
      router.push('/auth/loja/cadastroLojaEndereco');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => router.push('/')}
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
      </TouchableOpacity>
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
          value={rede}
          onChangeText={setRede} // Atualiza o estado 'Rede'
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
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: 'bold' }}>
            Próxima
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.links}>
        <Link href="/auth/loja/loginLoja"
          style={{ fontSize: 18, color: '#2f88ff', textDecorationLine: 'underline' }}
        >
          Já tenho cadastro
        </Link>
        <Link href="/auth/cliente/loginCliente"
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
