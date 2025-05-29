import { View } from "react-native";
import "../../../global.css";
import { router } from "expo-router";
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

const LoginClientes = () => {
  return (
    <GenericContainer>
      <ReturnButton className='m-5' />

      <Heading1 className='text-center'>
        Login - Clientes
      </Heading1>


      <Form>
        <TextInputComponent label='E-mail:' />
        <TextInputComponent label='Senha' />

        <ButtonsArea>
          <PrimaryButton onPress={() => router.navigate('/pages/Clientes/HomeClientes')}>
            <Heading1>
              Logar
            </Heading1>
          </PrimaryButton>

          <SecondaryButton onPress={() => router.push('/auth/Clientes/CadastroClientes')}>
            <Heading1>
              Não tenho cadastro
            </Heading1>
          </SecondaryButton>
        </ButtonsArea>

      </Form>
    </GenericContainer>
  );
};

export default LoginClientes;
