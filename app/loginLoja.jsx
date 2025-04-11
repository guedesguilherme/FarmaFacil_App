import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function LoginLoja() {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!cnpj || !email || !password) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    setError("");

    try {
      const response = await fetch("https://api-cadastro-farmacias.onrender.com/farma/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnpj, email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        const token = data.token;

        await AsyncStorage.setItem("token", token);
        router.push("/homeLoja");
      } else {
        setError(data.msg || "Erro ao realizar login.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => router.push("/")}
        style={{
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderColor: "#2f88ff",
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "50%",
        }}
      >
        <AntDesign name="arrowleft" size={24} color="#2f88ff" />
        <Text style={{ fontSize: 18 }}>Voltar à Home</Text>
      </Pressable>
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          padding: 20,
          fontWeight: "bold",
        }}
      >
        Login - Lojas
      </Text>
      <View style={styles.containerInput}>
        <Text style={{ fontSize: 16 }}>CNPJ da sua loja:</Text>
        <TextInput
          style={styles.input}
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={{ fontSize: 16 }}>Seu e-mail:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={{ fontSize: 16 }}>Sua senha:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={[styles.buttonContainer]}>
        <Pressable style={[styles.button]} onPress={handleSubmit}>
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
            Entrar
          </Text>
        </Pressable>
      </View>

      <View style={styles.links}>
        <Link
          href="/cadastroLoja"
          style={{
            fontSize: 18,
            color: "#2f88ff",
            textDecorationLine: "underline",
          }}
        >
          Não tenho cadastro
        </Link>
        <Link
          href="/loginCliente"
          style={{
            fontSize: 18,
            color: "#2f88ff",
            textDecorationLine: "underline",
          }}
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
    borderColor: "#2f88ff",
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "95%",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "85%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2f88ff",
    backgroundColor: "#2f88ff",
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerInput: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
  },
  links: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    gap: 20,
  },
});