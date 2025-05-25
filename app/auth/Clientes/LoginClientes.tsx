import { View } from "react-native";
import "../../../global.css";
import { router } from "expo-router";
import {
  PrimaryButton,
  ReturnButton,
  SecondaryButton,
} from "../../../src/components/ButtonsComponent";
import {
  InputComponent
} from '../../../src/components/InputComponent'
import {  
  ErrorText,
  LinkText,
  Heading1,  
} from "../../../src/components/TextComponent";

const LoginClientes = () => {
  return (
    <View className='flex-1 bg-white'>

      <ReturnButton className='m-5' />
      <View className='mt-10'>
        <Heading1 className='text-center'>
          Login - Clientes
        </Heading1>
      </View>

      <View className='flex-col gap-5 ml-5 mr-5 mt-10'>
        <InputComponent label='E-mail:' />
        <InputComponent label='Senha' />

        <View className='flex-col gap-5 items-center mt-5'>
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
        </View>

      </View>
    </View>
  );
};

export default LoginClientes;
