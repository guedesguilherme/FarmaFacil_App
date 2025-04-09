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

//TODO: Adicionar botão do google
export default function loginLoja() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Todos os campos são obrigatórios!")
    } else {
      setError("")
    }
  }

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
        Login - Lojas
      </Text>
      <View style={styles.containerInput}>
        <Text style={{ fontSize: 16, }}>CNPJ da sua loja:</Text>
        <TextInput style={styles.input}></TextInput>
      </View>

      <View style={styles.containerInput}>
        <Text style={{ fontSize: 16, }}>Seu e-mail:</Text>
        <TextInput style={styles.input}></TextInput>
      </View>

      <View style={styles.containerInput}>
        <Text style={{ fontSize: 16 }}>Sua senha:</Text>
        <TextInput style={styles.input} secureTextEntry={true}></TextInput>
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
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: 'bold' }}>Entrar</Text>
        </Pressable>
      </View>

      <View style={styles.links}>
        <Link href="/cadastroLoja"
          style={{ fontSize: 18, color: '#2f88ff', textDecorationLine: 'underline' }}
        >
          Não tenho cadastro
        </Link>
        <Link href="/loginCliente"
          style={{ fontSize: 18, color: '#2f88ff', textDecorationLine: 'underline' }}
        >
          Sou um Cliente
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#2f88ff',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '95%',
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
  links: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    gap: 20,    
  }
})
