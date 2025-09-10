import { Text, Image } from "react-native";
import "../global.css";
import { router } from "expo-router";
import { PrimaryButton, SecondaryButton } from "../src/components/ButtonsComponent";
import GenericContainer, { ButtonsArea } from "@/src/components/ViewComponents";
import { Heading1, Heading2, LinkText } from "../src/components/TextComponent";

export default function Home() {
  return (
    <GenericContainer className='justify-evenly items-center bg-white'>
      <Image source={require('../assets/images/LogoFarmaFacil.png')} style={{ width: 120, height: 120 }} />
      
      <Heading1 className="text-center">
        Bem vindo(a) ao FarmaFácil!
      </Heading1>

      <Heading2 className="text-center">
        <Text>Você possui cadastro em nosso aplicativo?</Text>
      </Heading2>

      <ButtonsArea>
        <PrimaryButton onPress={() => router.push('/auth/Clientes/LoginClientes')} >
            Sim, sou teste.
        </PrimaryButton>

        <SecondaryButton onPress={() => router.push('/auth/Clientes/CadastroClientes')}>
          Não, quero me cadastrar!
        </SecondaryButton>
      </ButtonsArea>

      <LinkText onPress={() => router.push('/IndexLoja')}>
        Sou proprietário de uma farmácia.
      </LinkText>
      
    </GenericContainer>
  );
}

