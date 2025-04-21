import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const EditarProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    nome_quimico: "",
    preco: "",
    quantidade: "",
    validade: "",
    lote: "",
    label: "",
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const produtoId = await AsyncStorage.getItem("produtoId");

        if (!produtoId) {
          setErro(
            "Não foi possível acessar este produto. Selecione outro ou tente novamente."
          );
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://api-cadastro-farmacias.onrender.com/produtos/${produtoId}`
        );

        if (response.status === 200) {
          setProduto(response.data.produto);
        } else {
          setErro("Produto não encontrado.");
        }
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar o produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, []);

  const handleSave = async () => {
    try {
      const produtoId = await AsyncStorage.getItem("produtoId");

      if (!produtoId) {
        Alert.alert("Erro", "ID do produto não encontrado.");
        return;
      }

      const response = await axios.patch(
        `https://api-cadastro-farmacias.onrender.com/produtos/${produtoId}`,
        produto
      );

      if (response.status === 200) {
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
        router.push("/views/loja/homeLoja");
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o produto.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao salvar as alterações.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f88ff" />
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("views/loja/homeLoja")}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="#2f88ff" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Produto</Text>
      </View>

      {/* Formulário */}
      <View style={styles.content}>
        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={produto.nome}
          onChangeText={(text) => setProduto({ ...produto, nome: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome Químico"
          value={produto.nome_quimico}
          onChangeText={(text) => setProduto({ ...produto, nome_quimico: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={produto.preco.toString()}
          onChangeText={(text) =>
            setProduto({ ...produto, preco: parseFloat(text) })
          }
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={produto.quantidade.toString()}
          onChangeText={(text) =>
            setProduto({ ...produto, quantidade: parseInt(text) })
          }
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Validade (YYYY-MM-DD)"
          value={produto.validade}
          onChangeText={(text) => setProduto({ ...produto, validade: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Lote"
          value={produto.lote}
          onChangeText={(text) => setProduto({ ...produto, lote: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria (Label)"
          value={produto.label}
          onChangeText={(text) => setProduto({ ...produto, label: text })}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditarProduto;

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});