import { useState, useEffect } from "react";
import { GoogleSignin, GoogleSigninButton, isSuccessResponse, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { saveSecureItem } from "../../../utils/secureStore"

const GoogleLoginButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: "149491902490-s2u7hv0hqfbm6odt8m3bp5svicrtafo4.apps.googleusercontent.com",
      webClientId: "149491902490-ovtp624kda7rlg6n4oag9j12g8j0v4tg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;

        //console.log(idToken)

          // Envia o token para sua API
        const apiResponse = await fetch('https://api-cadastro-farmacias.onrender.com/usuarios/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
        throw new Error(data.msg || 'Erro na autenticação com Google');
        }

        //await saveSecureItem(data.token)
        //await saveSecureItem(data.user.id)
        console.log(data.user.id)
        console.log(data.token)

        router.navigate("/pages/Clientes/HomeClientes");
      } else {
        alert("Não foi possível realizar a autentificação pelo Google");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Google auth is in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Os serviços do Google Play não estão disponíveis");
            break;
          default:
            console.log(error.code);
        }
      } else {
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleGoogleSignIn}
      disabled={isSubmitting}
    />
  );
};

export default GoogleLoginButton;
