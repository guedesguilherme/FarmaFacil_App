import { Text, Image } from "react-native";
import "../../../global.css";
import { router } from "expo-router";
import { PrimaryButton, SecondaryButton } from "../../../src/components/ButtonsComponent";
import GenericContainer, { ButtonsArea } from "@/src/components/ViewComponents";
import { Heading1, Heading2, LinkText } from "../../../src/components/TextComponent";

export default function HomeLoja() {
  return (
    <GenericContainer className='justify-evenly items-center bg-white'>
      <Image source={require('../../../assets/images/LogoFarmaFacil.png')} style={{ width: 120, height: 120 }} />
      
      <Heading1 className="text-center">
        Bem vindo(a) ao FarmaFácil!
      </Heading1>

      <Heading2 className="text-center">
        <Text>Sua farmácia está cadastrada em nosso App?</Text>
      </Heading2>

      <ButtonsArea>
        <PrimaryButton onPress={() => router.push('/auth/Loja/LoginLoja')} >
            Sim, está.
        </PrimaryButton>

        <SecondaryButton onPress={() => router.push('/auth/Loja/CadastroLoja2')}>
          Não, quero me cadastrar!
        </SecondaryButton>
      </ButtonsArea>

      <LinkText onPress={() => router.push('/')}>
        Não sou propriétario de uma farmácia.
      </LinkText>
      
    </GenericContainer>
  );
}