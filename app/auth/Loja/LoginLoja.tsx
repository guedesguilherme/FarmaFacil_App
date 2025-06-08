import { View } from "react-native";
import "../../../global.css";
import { useRouter } from "expo-router";
import {
  PrimaryButton,
  ReturnButton,
  SecondaryButton,
} from "../../../src/components/ButtonsComponent";
import {
  TextInputComponent
} from '../../../src/components/TextInputComponents'
import {
  ErrorText,
  LinkText,
  Heading1,
} from "../../../src/components/TextComponent";
import GenericContainer, { Form, ButtonsArea } from "@/src/components/ViewComponents";

const LoginLoja = () => {
  const router = useRouter()
  return (
    <GenericContainer>
      <ReturnButton className='mb-5' />

      <Heading1 className='text-center mb-5'>
        Entre na sua conta
      </Heading1>


      <Form>
        <TextInputComponent 
          label='CNPJ' 
          placeholder="Insira o CNPJ da sua empresa"
        />
        <TextInputComponent 
          label='Senha' 
          placeholder="Insira a senha da sua conta"
        />
        
          <PrimaryButton onPress={() => router.push('/pages/Lojas/HomeLojas')}>
              Login
          </PrimaryButton>
          <SecondaryButton onPress={() => router.push('/auth/Loja/CadastroLoja1')}>
              Não tenho cadastro
          </SecondaryButton>
      </Form>

    </GenericContainer>
  );
};

export default LoginLoja;
