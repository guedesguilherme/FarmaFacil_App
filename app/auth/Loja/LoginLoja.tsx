import { View } from "react-native";
import "../../../global.css";
import { Link, router } from "expo-router";
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

const LoginLoja = () => {
  return (
    <View className='flex-1 bg-white'>
      <ReturnButton className='m-5' />

      <View>
        <Heading1 className='text-center'>
          Login - Lojas
        </Heading1>
      </View>

      <View className='flex-col gap-5 ml-5 mr-5 mt-10'>
        <InputComponent label='CNPJ' />
        <InputComponent label='Senha' />

        <View className='flex-col gap-5 items-center mt-5'>
          <Link href='/pages/Lojas/HomeLojas'>
            Login
          </Link>
          <Link href='/auth/Loja/CadastroLoja1'>
            Não tenho cadastrto
          </Link>
        </View>
      </View>
      
    </View>
  );
};

export default LoginLoja;
