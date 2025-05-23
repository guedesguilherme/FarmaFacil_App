import { View, Text, StyleSheet, TextInput } from "react-native";
import "../../../global.css";
import { Link, router } from "expo-router";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../src/components/ButtonsComponent";
import {
  BodyText,
  ErrorText,
  LinkText,
  Heading1,
  Heading2,
} from "../../../src/components/TextComponent";
import Feather from "@expo/vector-icons/Feather";

const LoginClientes = () => {
  return (
    <View style={styles.container}>

      <Heading1>
        <Text>Login - Clientes</Text>
      </Heading1>     

      <View style={styles.form}>
        <View style={styles.inputArea}>
          <Heading2>
            <Text>E-mail:</Text>
          </Heading2>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.inputArea}>
          <Heading2>
            <Text>Senha:</Text>
          </Heading2>
          <TextInput style={styles.textInput} />
        </View>

        <PrimaryButton onPress={() => router.navigate('/pages/Clientes/HomeClientes')}>
          <Text>Logar</Text>
        </PrimaryButton>
      </View>

      <SecondaryButton onPress={() => router.push('/auth/Clientes/CadastroClientes')}>
        <LinkText>
          <Text>Não tenho cadastro</Text>
        </LinkText>
      </SecondaryButton>
    </View>
  );
};

export default LoginClientes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  form: {
    width: "80%",
    gap: 20,
    alignItems: "center",
  },
  inputArea: {
    width: "100%",
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2f88ff",
  },
});
