import { ScrollView, View } from 'react-native'
import React from 'react'
import GenericContainer from '@/src/components/ViewComponents'
import { PrimaryButton, ReturnButton } from '@/src/components/ButtonsComponent'
import { Heading1 } from '@/src/components/TextComponent'
import { TextInputComponent } from '@/src/components/TextInputComponents'

const EditarDados = () => {
  return (
    <GenericContainer>
      <ReturnButton className='m-5' />
      <Heading1 className='ml-5'>
        Editar suas informações:
      </Heading1>

      <ScrollView className='m-5'>
        <TextInputComponent label='Nome:' className='mb-5' />
        <TextInputComponent label='E-mail:' />

        <View className='mt-5 flex-1 justify-end'>
          <View className='items-center justify-center'>
            <PrimaryButton>
              <Heading1>
                Editar
              </Heading1>
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </GenericContainer>
  )
}

export default EditarDados
