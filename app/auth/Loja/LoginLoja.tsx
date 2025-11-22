import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity } from 'react-native'; // 1. Adicionado TouchableOpacity
import "../../../global.css";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons' // 1. Importação alterada
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
  const [senha, setSenha] = useState('');
  
  // 3. Novo estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    
    setError('');

    const cnpjLimpo = cnpj.replace(/\D/g, '');

    if (!cnpjLimpo || !senha) {
      const msg = 'Preencha todos os campos: CNPJ e Senha.';
      setError(msg);
      Alert.alert('Erro', msg);
      return;
    }
    
    setLoading(true);

    try {
      const response = await api.post('farma/auth/login', { cnpj: cnpjLimpo, senha });
      
      await SecureStore.setItemAsync('token', response.data.token)
      await SecureStore.setItemAsync('id_farmacia', response.data.farma_id.toString())

      if (response.data?.msg) {
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
          placeholder="00.000.000/0000-00"
          keyboardType="numeric" // Adicionado para facilitar digitação
        />
        
        <TextInputComponent
          label='Senha'
          value={senha}
          onChangeText={setSenha}
          // 4. secureTextEntry agora depende do estado
          secureTextEntry={!showPassword}
          // 5. Ícone do olho clicável
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                    name={showPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color="#64748b" 
                />
            </TouchableOpacity>
          }
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