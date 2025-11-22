import { ActivityIndicator, Alert, ScrollView, TouchableOpacity, View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { PrimaryButton, ReturnButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer, { Form } from '@/src/components/ViewComponents'
import { TextInputComponent } from '@/src/components/TextInputComponents'
import { useRouter } from 'expo-router'
import api from '@/src/services/api'
import { Ionicons } from '@expo/vector-icons';

const PasswordRequirement = ({ met, label }: { met: boolean, label: string }) => (
  <View className="flex-row items-center mb-1">
    <View className="w-6 items-center justify-center mr-2">
      <Ionicons
        name={met ? "checkmark-circle" : "close-circle"}
        size={18}
        color={met ? "#16a34a" : "#ef4444"}
      />
    </View>
    <Text className={`text-sm ${met ? "text-green-600 font-bold" : "text-red-500"}`}>
      {label}
    </Text>
  </View>
)

const CadastroClientes = () => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('') // 1. Novo estado
  const [senha, setSenha] = useState('')
  const [confirmasenha, setConfirmaSenha] = useState('')
  
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const requirements = {
    length: senha.length >= 12,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /\d/.test(senha),
    special: /[\W_]/.test(senha)
  }

  const isPasswordValid = Object.values(requirements).every(Boolean)

  // 2. Função de Máscara para Telefone (XX) XXXXX-XXXX
  const handleTelefoneChange = (text: string) => {
    // Remove tudo que não é número
    let cleaned = text.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);

    // Aplica a formatação
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    }

    setTelefone(formatted);
  }

  const clearCampos = () => {
    setLoading(false)
    setNome('')
    setEmail('')
    setTelefone('') // Limpa telefone
    setSenha('')
    setConfirmaSenha('')
    setError('')
  }

  const enviarInformacoes = async () => {
    setError('')

    // 3. Adicionado telefone na validação
    if (!nome || !email || !telefone || !senha || !confirmasenha) {
      setError('Todos os campos são obrigatórios!')
      Alert.alert('Há campos em branco', 'Todos os campos são obrigatórios!')
      return
    }

    if (!email.includes('@')) {
      setError('O e-mail inserido não é válido!')
      Alert.alert('E-mail inválido', 'O e-mail inserido não é válido!')
      return
    }

    // Validação simples de tamanho do telefone (mínimo 10 dígitos contando DDD)
    const telefoneNumerico = telefone.replace(/\D/g, '');
    if (telefoneNumerico.length < 10) {
      Alert.alert('Telefone inválido', 'Por favor, insira um número de telefone válido com DDD.');
      return;
    }

    if (!isPasswordValid) {
      Alert.alert(
        'Senha Fraca',
        'Por favor, atenda a todos os requisitos da senha antes de continuar.'
      );
      return;
    }

    if (senha !== confirmasenha) {
      setError('As senhas não são iguais!')
      Alert.alert('Erro', 'As senhas não coincidem!')
      return
    }

    setLoading(true)

    try {
      // 4. Envia telefone para a API
      // Nota: Enviamos apenas os números (telefoneNumerico) ou formatado, dependendo do seu backend.
      // Aqui estou enviando formatado, mas se o backend pedir números, use 'telefoneNumerico'
      const response = await api.post('/usuarios/auth/register', {
        nome,
        email,
        telefone, 
        senha,
        confirmasenha
      })

      Alert.alert('Sucesso', 'Usuário criado com sucesso!')
      clearCampos()
      router.push('/auth/Clientes/LoginClientes')
    } catch (error: any) {
      console.log(error)
      setError(error.response?.data?.msg || 'Erro ao cadastrar!')
      Alert.alert('Erro', `Erro ao cadastrar:\n${error.response?.data?.msg || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericContainer>
      <ReturnButton className='' />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          
          <Heading1 className='text-center mt-5'>
            Cadastre-se
          </Heading1>

          <Form className='mt-8'>
            <TextInputComponent 
              value={nome} 
              onChangeText={setNome} 
              label='Nome:' 
              rightIcon={null} 
            />
            
            <TextInputComponent 
              value={email} 
              onChangeText={setEmail} 
              label='E-mail:' 
              rightIcon={null} 
              keyboardType="email-address" 
              autoCapitalize="none" 
            />

            {/* 5. Novo Input de Telefone */}
            <TextInputComponent 
              value={telefone} 
              onChangeText={handleTelefoneChange} 
              label='Telefone:' 
              placeholder="(00) 00000-0000"
              keyboardType="numeric"
              maxLength={15} // (11) 91234-5678 tem 15 caracteres
              rightIcon={null} 
            />
            
            <TextInputComponent
              value={senha}
              onChangeText={setSenha}
              label='Senha:'
              secureTextEntry={!senhaVisivel}
              rightIcon={
                <TouchableOpacity onPress={() => setSenhaVisivel(v => !v)}>
                  <Ionicons name={senhaVisivel ? "eye" : "eye-off"} size={22} color="#888" />
                </TouchableOpacity>
              }
            />

            {senha.length > 0 && (
              <View className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-200">
                <Text className="text-slate-700 font-bold mb-2 text-sm">Requisitos da senha:</Text>
                <PasswordRequirement met={requirements.length} label="Mínimo de 12 caracteres" />
                <PasswordRequirement met={requirements.upper} label="Pelo menos uma letra maiúscula" />
                <PasswordRequirement met={requirements.lower} label="Pelo menos uma letra minúscula" />
                <PasswordRequirement met={requirements.number} label="Pelo menos um número" />
                <PasswordRequirement met={requirements.special} label="Pelo menos um caractere especial" />
              </View>
            )}

            <TextInputComponent
              value={confirmasenha}
              onChangeText={setConfirmaSenha}
              label='Repita sua senha:'
              secureTextEntry={!confirmaSenhaVisivel}
              rightIcon={
                <TouchableOpacity onPress={() => setConfirmaSenhaVisivel(v => !v)}>
                  <Ionicons name={confirmaSenhaVisivel ? "eye" : "eye-off"} size={22} color="#888" />
                </TouchableOpacity>
              }
            />

            <PrimaryButton onPress={enviarInformacoes} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                "Cadastrar"
              )}
            </PrimaryButton>

            <SecondaryButton onPress={() => router.push('/auth/Clientes/LoginClientes')}>
              Já tenho cadastro
            </SecondaryButton>

          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </GenericContainer>
  )
}

export default CadastroClientes