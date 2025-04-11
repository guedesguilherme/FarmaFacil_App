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
import { useCadastroLoja } from "../../../context/CadastroLojaContext";

const CadastroLojaEndereco = () => {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const buscarEndereco = async (cepDigitado: string) => {
    const cleanedCep = cepDigitado.replace(/\D/g, '');
    setCep(cleanedCep);

    if (cleanedCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          Alert.alert("CEP não encontrado");
          return;
        }

        setRua(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setUf(data.uf || "");
      } catch (error) {
        Alert.alert("Erro ao buscar o CEP");
      }
    }
  };

  const { setDados } = useCadastroLoja();

  const handleSubmit = () => {
    if (!cep || !rua || !bairro || !numero || !uf || !cidade) {
      setError("Todos os campos são obrigatórios!");
    } else {
      setDados({ cep, rua, bairro, numero, uf, cidade }); // Salva dados no contexto
      setError("");
      router.push("/auth/loja/cadastroLojaSenha");
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

      <Text style={styles.titulo}>Cadastro - Endereço da Loja</Text>

      <View style={styles.containerInput}>
        <Text>CEP:</Text>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={buscarEndereco}
          maxLength={8}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.containerInput}>
        <Text>Rua:</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={rua}
          onChangeText={setRua}
          editable={false}
        />
      </View>

      <View style={styles.containerInput}>
        <Text>Bairro:</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={bairro}
          onChangeText={setBairro}
          editable={false}
        />
      </View>

      <View style={styles.containerInput}>
        <Text>Número:</Text>
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.containerInput}>
        <Text>Cidade:</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={cidade}
          onChangeText={setCidade}
          editable={false}
        />
      </View>

      <View style={styles.containerInput}>
        <Text>UF:</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={uf}
          onChangeText={setUf}
          maxLength={2}
          editable={false}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
            Próxima
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CadastroLojaEndereco;

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
  titulo: {
    fontSize: 24,
    textAlign: "center",
    padding: 20,
    fontWeight: "bold",
  },
  containerInput: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
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
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: '#e0e0e0', // cinza claro
    borderColor: '#aaa'
  },
});
