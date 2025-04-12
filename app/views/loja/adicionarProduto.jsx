import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const adicionarProduto = () => {
  const router = useRouter();

  const [farmacia, setFarmacia] = useState("");
  const [nome, setNome] = useState("");
  const [nome_quimico, setNomeQuimico] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [validade, setValidade] = useState("");
  const [lote, setLote] = useState("");
  const [label, setLabel] = useState(""); // Se chama 'label' na api
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !farmacia ||
      !nome ||
      !nome_quimico ||
      !preco ||
      !quantidade ||
      !validade ||
      !lote ||
      !label
    ) {
      setError("Todos os campos são obrigatórios!");
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api-cadastro-farmacias.onrender.com/produtos/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmacia,
            nome,
            nome_quimico,
            preco,
            quantidade,
            validade,
            lote,
            label,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", data.msg || "Produto cadastrado com sucesso!");
        router.push("/views/loja/homeLoja");
      } else {
        setError(data.msg || "Erro ao cadastrar produto");
      }
    } catch (error) {
      setError("Erro ao cadastrar o produto. Tente novamente mais tarde.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="#2f88ff" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar novo produto</Text>
      </View>

      {/* Formulário */}
      <View style={styles.content}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Nome da Farmácia"
          value={farmacia}
          onChangeText={setFarmacia}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome Químico"
          value={nome_quimico}
          onChangeText={setNomeQuimico}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Validade (YYYY-MM-DD)"
          value={validade}
          onChangeText={setValidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Lote"
          value={lote}
          onChangeText={setLote}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria (Label)"
          value={label}
          onChangeText={setLabel}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar Produto</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default adicionarProduto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFF",
  },
  backButton: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#2f88ff",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#2f88ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
