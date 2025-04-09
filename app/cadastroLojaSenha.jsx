import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCadastroLoja } from "../context/CadastroLojaContext";

const CadastroLojaSenha = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const { dados, setDados } = useCadastroLoja();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Todos os campos são obrigatórios!");
    } else if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
    } else {
      setError("");
      setDados({ senha: password }); // Salva senha

      // Aqui você já tem todos os dados:
      console.log("Dados completos:", dados);

      // Simulação de envio para a API
      /*
      const response = await fetch("https://sua-api.com/lojas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, senha: password })
      });
      */

      // TODO: ADICIONAR ROTA DE REDIRECIONAMENTO APÓS CADASTRO
      //router.push("");
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="#2f88ff" />
        <Text style={{ fontSize: 18 }}>Voltar</Text>
      </Pressable>
      <View style={styles.containerInput}>
        <Text>Insira uma senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.containerInput}>
        <Text>Confirme a senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={[styles.buttonContainer]}>
        <Pressable
          style={[styles.button]}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: 'bold' }}>
            Cadastrar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

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
  backButton: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderColor: "#2f88ff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "50%",
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


export default CadastroLojaSenha