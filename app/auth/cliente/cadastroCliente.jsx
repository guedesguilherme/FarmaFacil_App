import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Pressable,
    TextInput,
    Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import Ionicons from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import GoogleAuth from "../../components/GoogleAuth";

//TODO: Adicionar botão do google
export default function Index() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");    

    const router = useRouter();

    const handleSubmit = async () => {
        if (!email || !password || !nome) {
            setError("Todos os campos são obrigatórios!");
        } else if (!email.includes("@")) {
            setError("O e-mail inserido é inválido!");
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não são iguais!')
            return
        }
        setError("");

        try {
            // Envia os dados para a API
            const response = await fetch("https://api-cadastro-farmacias.onrender.com/usuarios/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha: password,
                    confirmasenha: password, // Confirmação de senha
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Cadastro bem-sucedido
                Alert.alert("Sucesso", data.msg || "Usuário cadastrado com sucesso!");
                router.push("/views/cliente/loginCliente"); // Redireciona para a página de login
            } else {
                // Erro retornado pela API
                setError(data.msg || "Erro ao cadastrar usuário.");
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        }
    }
    return (
        <View>
            <Pressable
                onPress={() => router.push("/")}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 10,
                    borderColor: "#2f88ff",
                    width: "auto",
                    borderRadius: 8,
                    display: "flex",
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
                Cadastro - Clientes
            </Text>

            <View style={styles.containerInput}>
                <Text>Insira seu nome:</Text>
                <TextInput style={styles.input} onChangeText={setNome} />
            </View>
            <View style={styles.containerInput}>
                <Text>Insira seu e-mail:</Text>
                <TextInput style={styles.input} onChangeText={setEmail} />
            </View>
            <View style={styles.containerInput}>
                <Text>Insira uma senha:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.containerInput}>
                <Text>Confirme sua senha:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={[styles.buttonContainer]}>
                {/* Google: */}
                <GoogleAuth />

                <Pressable style={[styles.button]} onPress={handleSubmit}>
                    <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                        Cadastrar
                    </Text>
                </Pressable>
            </View>

            <View style={styles.links}>
                <Link
                    href="/auth/cliente/loginCliente"
                    style={{
                        fontSize: 18,
                        color: "#2f88ff",
                        textDecorationLine: "underline",
                    }}
                >
                    Já tenho cadastro
                </Link>
                <Link
                    href="/auth/loja/loginLoja"
                    style={{
                        fontSize: 18,
                        color: "#2f88ff",
                        textDecorationLine: "underline",
                    }}
                >
                    Sou uma loja
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
    },
    button: {
        width: "85%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        fontSize: 22,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#2f88ff",
        backgroundColor: "#2f88ff",
        marginTop: 20,
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
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginBottom: 10,
        textAlign: "center",
    },
    links: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        gap: 20,
    },
});
