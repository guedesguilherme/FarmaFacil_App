import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const isFocused = useIsFocused();
  const router = useRouter();

  const getProdutos = async () => {
    try {
      const farma_id = await AsyncStorage.getItem("lojaId");

      if (!farma_id) {
        Alert.alert(
          "Erro",
          "ID da farmácia não encontrado. Faça login novamente."
        );
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://api-cadastro-farmacias.onrender.com/produtos/farmacia/${farma_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProdutos(data);
      } else {
        Alert.alert("Erro", data.message || "Erro ao carregar produtos");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduto = async (id) => {
    try {
      const response = await fetch(
        `https://api-cadastro-farmacias.onrender.com/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Produto deletado com sucesso!");
        setProdutos((prevProdutos) =>
          prevProdutos.filter((produto) => produto._id !== id)
        );
      } else {
        Alert.alert("Erro", data.msg || "Erro ao deletar o produto.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível deletar o produto.");
    } finally {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    getProdutos();
  }, [isFocused]);

  function saveId(nome, id) {
    AsyncStorage.setItem(nome, id);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f88ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.produtoItem}>
              <View>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoPreco}>
                  R$ {item.preco.toFixed(2)}
                </Text>
                <Text style={styles.produtoInfo}>
                  Quantidade: {item.quantidade}
                </Text>
                <Text style={styles.produtoInfo}>
                  Validade: {item.validade}
                </Text>
                <Text style={styles.produtoInfo}>Lote: {item.lote}</Text>
                <Text style={styles.produtoInfo}>Categoria: {item.label}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <TouchableOpacity
                  onPress={() => [
                    saveId("produtoId", item._id),
                    router.push("/views/loja/editarProduto"),
                  ]}
                  style={{
                    backgroundColor: "#2f88ff",
                    borderWidth: 1,
                    borderColor: "#2f88ff",
                    borderRadius: 8,
                    padding: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="pencil" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setProdutoSelecionado(item);
                    setModalVisible(true);
                  }}
                  style={{
                    backgroundColor: "red",
                    borderWidth: 1,
                    borderColor: "red",
                    borderRadius: 8,
                    padding: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
      )}

      {/* Modal de Confirmação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Deseja mesmo deletar{" "}
              <Text style={{ fontWeight: "bold" }}>
                {produtoSelecionado?.nome}
              </Text>
              ?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => deleteProduto(produtoSelecionado._id)}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  produtoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  produtoPreco: {
    fontSize: 16,
    color: "#2f88ff",
    marginBottom: 4,
  },
  produtoInfo: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: "#ccc",
  },
  modalButtonConfirm: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});