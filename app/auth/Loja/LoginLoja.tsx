import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text } from 'react-native';
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
  Heading1,
} from "../../../src/components/TextComponent";
import GenericContainer, { Form } from "@/src/components/ViewComponents";
import api from '@/src/services/api';
import * as SecureStore from 'expo-secure-store'

const LoginLoja = () => {
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    
    setError('');

    if (!cnpj || !email || !senha) {
      const msg = 'Preencha todos os campos: CNPJ, Email e Senha.';
      setError(msg);
      Alert.alert('Erro', msg);
      return;
    }
    
    setLoading(true);

    try {
      const response = await api.post('farma/auth/login', { cnpj, email, senha });
      await SecureStore.setItemAsync('token', response.data.token)
      await SecureStore.setItemAsync('id_farmacia', response.data.farma_id)

      if (response.data?.msg) {
        // Navega para a página da loja após login bem-sucedido
        router.replace('/pages/Lojas/HomeLojas');
      } else {
        const msg = response.data?.msg || 'Erro ao fazer login';
        setError(msg);
        Alert.alert('Erro', msg);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.msg || 'Erro ao conectar no servidor.';
      setError(msg);
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <GenericContainer>
      <ReturnButton className='' />

      <Heading1 className='text-center mt-5'>
        Login
      </Heading1>

      <Form className='mt-8'>
        <TextInputComponent
          label='CNPJ'
          value={cnpj}
          onChangeText={setCnpj}
        />
        <TextInputComponent
          label='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInputComponent
          label='Senha'
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <PrimaryButton onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text>Login</Text>
          )}
        </PrimaryButton>

        <SecondaryButton onPress={() => router.push('/auth/Loja/CadastroLoja1')}>
          Não tenho cadastro
        </SecondaryButton>
      </Form>
    </GenericContainer>
  );
};

export default LoginLoja;
