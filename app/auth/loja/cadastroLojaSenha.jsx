import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCadastroLoja } from "../../../context/CadastroLojaContext";

const CadastroLojaSenha = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const router = useRouter();
  const { dados, limparDados } = useCadastroLoja();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    setError("");
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await fetch(
        "https://api-cadastro-farmacias.onrender.com/farma/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dados,
            senha: password,
            confirmasenha: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", data.msg || "Loja cadastrada com sucesso!");
        limparDados(); // Limpa os dados do contexto
        router.push("/auth/loja/loginLoja"); // Redireciona para a tela de login
      } else {
        setError(data.msg || "Erro ao cadastrar a loja.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="#2f88ff" />
        <Text style={{ fontSize: 18 }}>Voltar</Text>
      </TouchableOpacity>

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
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading} // Desativa o botão enquanto está carregando
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
              Cadastrar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#2f88ff",
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "95%",
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
  buttonDisabled: {
    backgroundColor: "#a0c4ff", // Cor mais clara para indicar desativado
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInput: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CadastroLojaSenha;