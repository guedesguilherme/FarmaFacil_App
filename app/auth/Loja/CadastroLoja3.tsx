import { View, Text } from 'react-native'
import React from 'react'
import GenericContainer, { Form, ButtonsArea } from '../../../src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { InputComponent } from '@/src/components/InputComponent'

const CadastroLoja3 = () => {
  return (
    <GenericContainer>
        <ReturnButton className='m-5' />

        <Heading1 className='text-center'>
            Cadastro de Lojas - Senha
        </Heading1>

        <Form>
            <InputComponent label='Senha:' />
            <InputComponent label='Repita a senha:' />
            
            <ButtonsArea>
                <PrimaryButton>
                    <Heading1>
                        Cadastrar Loja
                    </Heading1>
                </PrimaryButton>
            </ButtonsArea>

        </Form>
    </GenericContainer>
  )
}

export default CadastroLoja3