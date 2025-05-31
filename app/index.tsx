import { View, Text, StyleSheet, Image } from "react-native";
import "../global.css";
import { router } from "expo-router";
import { PrimaryButton, SecondaryButton } from "../src/components/ButtonsComponent";
import { Heading1 } from "../src/components/TextComponent";

export default function Home() {
  return (
    <View className='justify-around items-center flex-1 bg-white'>
      <Heading1>
        <Text>Bem vindo(a) ao FarmaFácil!</Text>
      </Heading1>

      <Image source={require('../assets/images/LogoFarmaFacil.png')} style={{ width: 120, height: 120 }} />

      <View style={styles.areaButtons}>
        <Heading1>
          <Text>Quem é você?</Text>
        </Heading1>

        <PrimaryButton onPress={() => router.push('/auth/Clientes/LoginClientes')} >
          <Heading1>
            <Text>Sou um cliente</Text>
          </Heading1>
        </PrimaryButton>

        <SecondaryButton onPress={() => router.push('/auth/Loja/LoginLoja')}>
          <Heading1>
            <Text>Sou uma loja</Text>
          </Heading1>
        </SecondaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areaButtons: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
});
