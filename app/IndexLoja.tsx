import { Text, Image } from "react-native";
import { router } from "expo-router";
import { PrimaryButton, SecondaryButton } from "@/src/components/ButtonsComponent";
import GenericContainer, { ButtonsArea } from "@/src/components/ViewComponents";
import { Heading1, Heading2, LinkText } from "@/src/components/TextComponent";

export default function Home() {
  return (
    <GenericContainer className='justify-evenly items-center bg-white'>
      <Image source={require('@/assets/images/LogoFarmaFacil.png')} style={{ width: 120, height: 120 }} />
      
      <Heading1 className="text-center">
        Bem vindo(a) ao FarmaFácil!
      </Heading1>

      <Heading2 className="text-center">
        <Text>Você possui cadastro em nosso aplicativo?</Text>
      </Heading2>

      <ButtonsArea>
        <PrimaryButton onPress={() => router.push('/auth/Loja/LoginLoja')} >
            Sim, minha farmácia está cadastrada.
        </PrimaryButton>

        <SecondaryButton onPress={() => router.push('/auth/Loja/CadastroLoja1')}>
          Não, quero cadastrar minha farmácia!
        </SecondaryButton>
      </ButtonsArea>

      <LinkText onPress={() => router.push('/')}>
        Sou cliente
      </LinkText>
      
    </GenericContainer>
  );
}

