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
      <ReturnButton className='' />

      <Heading1 className='text-center'>
        Login - Lojas
      </Heading1>


      <Form>
        <TextInputComponent label='CNPJ' />
        <TextInputComponent label='Senha' />
        
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
