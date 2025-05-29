import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PagamentoPix, ReturnButton } from '@/src/components/ButtonsComponent';
import { Heading1 } from '@/src/components/TextComponent';
import { useLocalSearchParams, router } from 'expo-router';
import GenericContainer from '@/src/components/ViewComponents';

const Pagamento = () => {
    const { id } = useLocalSearchParams();

  return (
    <GenericContainer>        
        <ReturnButton className='m-5' />
        
        <Heading1 className='text-center'>
            Formas de pagamento:
        </Heading1>
        <View className='justify-center items-center m-5'>
            <PagamentoPix produtoId={id} />
        </View>
    </GenericContainer>
  )
}

export default Pagamento

const styles = StyleSheet.create({})