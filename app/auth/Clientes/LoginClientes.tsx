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
import GenericContainer, { Form, ButtonsArea } from "@/src/components/ViewComponents";


import { useEffect, useState } from "react";
import {GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes} from "@react-native-google-signin/google-signin";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LoginClientes = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: "149491902490-s2u7hv0hqfbm6odt8m3bp5svicrtafo4.apps.googleusercontent.com",
      webClientId: "149491902490-ovtp624kda7rlg6n4oag9j12g8j0v4tg.apps.googleusercontent.com",
      profileImageSize: 150
    })
  })

  const handGoogleSignIn = async () => {
    try {
      setIsSubmitting(true)
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)){
        const {idToken, user} = response.data
        const {name, email, photo} = user;
        router.navigate('/pages/Clientes/HomeClientes')
        console.log(name, email, photo)
      }
      else{
        // trocar depois para uma msg que aparece na tela
        alert('Não foi possível realizar a autentificação pelo Google')
      }
      setIsSubmitting(false)
      
    } catch (error) {
      if (isErrorWithCode(error)){
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Google auth is in progress")
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Os serviços do Google Play não estão disponíveis");
            break;
          default:
            console.log(error.code)
        }
      }
      else{
        console.log('Um erro aconteceu.')
      }
      setIsSubmitting(false)
    }
  }


  return (
    <GenericContainer>
      <ReturnButton className='m-5' />

      <Heading1 className='text-center'>
        Login - Clientes
      </Heading1>


      <Form>
        <InputComponent label='E-mail:' />
        <InputComponent label='Senha' />

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

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handGoogleSignIn}
            disabled={isSubmitting}
          />
        </ButtonsArea>

      </Form>
    </GenericContainer>
  );
};

export default LoginClientes;
