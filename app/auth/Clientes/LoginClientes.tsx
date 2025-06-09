import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert } from "react-native";
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
import GenericContainer, { Form, ButtonsArea } from "@/src/components/ViewComponents";
import { viacep } from '@/src/services/api.js'

const LoginClientes = () => { 

  const router = useRouter()

  return (
    <GenericContainer>
      <ReturnButton className='mb-5' />

      <Heading1 className='text-center'>
        Login - Clientes
      </Heading1>

      <Form>
        <TextInputComponent 
          label='E-mail:'  
          placeholder="Insira o e-mail cadastrado" 
        />
        <TextInputComponent 
          label='Senha' 
          placeholder="Insira a sua senha"
        />

        <ButtonsArea>
          <PrimaryButton onPress={() => router.navigate('/pages/Clientes/HomeClientes')}>
              Logar 
          </PrimaryButton>
          <SecondaryButton onPress={() => router.push('/auth/Clientes/CadastroClientes')}>
              Não tenho cadastro
          </SecondaryButton>
        </ButtonsArea>
      </Form>
    </GenericContainer>
  );
};

export default LoginClientes;
