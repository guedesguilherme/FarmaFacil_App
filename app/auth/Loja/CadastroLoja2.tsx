import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Heading1 } from '@/src/components/TextComponent'
import { DisabledTextInputComponent, TextInputComponent } from '@/src/components/TextInputComponents'
import { ReturnButton, PrimaryButton, SecondaryButton } from '@/src/components/ButtonsComponent'
import { useRouter } from 'expo-router'
import GenericContainer, { Form, ButtonsArea } from '@/src/components/ViewComponents'

const CadastroLoja2 = () => {
    const router = useRouter()
    return (
        <GenericContainer>
            <ReturnButton className='m-5' />

            <Heading1 className='text-center'>
                Cadastro de Lojas - Endereço
            </Heading1>

            <ScrollView>
                <Form>
                    <TextInputComponent label='CEP:' maxLength={8} />
                    <DisabledTextInputComponent label='Rua:' />
                    <DisabledTextInputComponent label='Bairro:' />
                    <TextInputComponent label='Número:' />
                    <DisabledTextInputComponent label='Estado:' />
                    <DisabledTextInputComponent label='Cidade:' />


                    <ButtonsArea>
                        <PrimaryButton onPress={() => router.push('/auth/Loja/CadastroLoja3')}>
                            <Heading1>
                                Próxima
                            </Heading1>
                        </PrimaryButton>
                    </ButtonsArea>
                </Form>
            </ScrollView>

        </GenericContainer>
    )
}

export default CadastroLoja2