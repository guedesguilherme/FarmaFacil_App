import { View, Text, StyleSheet, Image } from "react-native";
import "../global.css";
import { router } from "expo-router";
import { PrimaryButton, SecondaryButton } from "../src/components/ButtonsComponent";
import GenericContainer from "@/src/components/ViewComponents";
import { Heading1, Heading2, LinkText } from "../src/components/TextComponent";

export default function Home() {
  return (
    <GenericContainer className='justify-evenly items-center bg-white'>
      <Image source={require('../assets/images/LogoFarmaFacil.png')} style={{ width: 120, height: 120 }} />
      
      <Heading1>
        Bem vindo(a) ao FarmaFácil!
      </Heading1>

      <Heading2>
        <Text>Você tem cadastro?</Text>
      </Heading2>

      <PrimaryButton onPress={() => router.push('/auth/Clientes/LoginClientes')} >
          Sim, sou cliente.
      </PrimaryButton>

      <SecondaryButton onPress={() => router.push('/auth/Loja/LoginLoja')}>
        Não, quero me cadastrar!
      </SecondaryButton>

      <LinkText>
        Sou proprietário de uma farmácia.
      </LinkText>
      
    </GenericContainer>
  );
}

/*const styles = StyleSheet.create({
  areaButtons: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
});*/
