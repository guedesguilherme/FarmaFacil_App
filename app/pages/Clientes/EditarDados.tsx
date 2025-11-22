import React, { useEffect, useState } from 'react'
import { View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import GenericContainer, { Form } from '@/src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { getSecureItem } from "../../../utils/secureStore"
import api from '@/src/services/api'

const EditarDados = () => {
  const router = useRouter()

  // Estados de Dados
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  
  // Estados de Senha
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estados de Controle
  const [loadingData, setLoadingData] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // Máscara de Telefone
  const handleTelefoneChange = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 2) formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    if (cleaned.length > 7) formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    setTelefone(formatted);
  }

  // Validação de Senha Forte (Reutilizada)
  const isPasswordStrong = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    return regex.test(pass);
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        const token = await getSecureItem('token')
        const userId = await getSecureItem('userId')
        
        if (!token || !userId) {
          Alert.alert('Erro', 'Sessão expirada. Faça login novamente.')
          router.replace('/auth/Clientes/LoginClientes')
          return
        }

        const response = await api.get(`/usuarios/${userId}`, {
          headers: {
          Authorization: `Bearer ${token}`,
        },
        })
        const userData = response.data.user || response.data.usuario || response.data;

        setNome(userData.nome || '')
        setEmail(userData.email || '')
        
        // Carrega e formata o telefone existente
        if (userData.telefone) {
            handleTelefoneChange(userData.telefone)
        }

      } catch (e) {
        console.error(e)
        Alert.alert('Erro', 'Não foi possível carregar seus dados.')
        router.back()
      } finally {
        setLoadingData(false)
      }
    }
    carregarDados()
  }, [])

  const handleEditar = async () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Atenção', 'Nome, E-mail e Telefone são obrigatórios.')
      return
    }

    // Validação de Senha (apenas se o usuário digitou algo no campo senha)
    if (senha) {
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem.')
        return
      }
      if (!isPasswordStrong(senha)) {
        Alert.alert('Senha Fraca', 'A nova senha deve ter no mínimo 12 caracteres, letras maiúsculas, minúsculas, números e símbolos.')
        return
      }
    }

    setLoadingSubmit(true)

    try {
      const userId = await getSecureItem('userId')
      
      // Monta o objeto de atualização
      const updateData: any = { 
        nome, 
        email, 
        telefone 
      }
      
      // Só envia a senha se ela foi alterada
      if (senha) {
        updateData.senha = senha
      }

      await api.patch(`/usuarios/${userId}`, updateData)
      
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!')
      router.back()
      
    } catch (e: any) {
      console.log('Erro ao atualizar:', e?.response?.data || e);
      Alert.alert('Erro', e?.response?.data?.msg || 'Não foi possível atualizar seus dados.');
    } finally {
      setLoadingSubmit(false)
    }
  }

  if (loadingData) {
    return (
      <GenericContainer className="justify-center items-center">
        <ActivityIndicator size={45} color="#2f88ff" />
      </GenericContainer>
    )
  }

  return (
    <GenericContainer>
      <ReturnButton className='m-5' />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          <Heading1 className='text-center mt-2 mb-8'>
            Editar Meus Dados
          </Heading1>

          <Form>
            <TextInputComponent
              label='Nome:'
              value={nome}
              onChangeText={setNome}
            />
            
            <TextInputComponent
              label='E-mail:'
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInputComponent
              label='Telefone:'
              value={telefone}
              onChangeText={handleTelefoneChange}
              keyboardType="numeric"
              maxLength={15}
              placeholder="(00) 00000-0000"
            />

            <View className="h-[1px] bg-slate-200 my-4 w-full" />
            
            <Text className="text-slate-500 font-poppins_medium mb-4 text-center">
              Alterar Senha (Opcional)
            </Text>

            <TextInputComponent
              label='Nova senha:'
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              placeholder="Deixe vazio para manter a atual"
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye" : "eye-off"} size={22} color="#888" />
                </TouchableOpacity>
              }
            />

            {/* Só mostra o campo de confirmação se o usuário começou a digitar a senha */}
            {senha.length > 0 && (
              <TextInputComponent
                label='Confirmar nova senha:'
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!showConfirmPassword}
                placeholder="Repita a nova senha"
                rightIcon={
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={22} color="#888" />
                  </TouchableOpacity>
                }
              />
            )}

            <View className="mt-6">
              <PrimaryButton onPress={handleEditar} disabled={loadingSubmit}>
                {loadingSubmit ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text>Salvar Alterações</Text>
                )}
              </PrimaryButton>
            </View>

          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </GenericContainer>
  )
}

export default EditarDados