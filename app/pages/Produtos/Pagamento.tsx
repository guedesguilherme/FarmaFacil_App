import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PagamentoPix, ReturnButton } from '@/src/components/ButtonsComponent';
import { Heading1 } from '@/src/components/TextComponent';
import { useLocalSearchParams, router } from 'expo-router';

const Pagamento = () => {
    const { id } = useLocalSearchParams();

  return (
    <View className='flex-col justify-center gap-10 m-5'>
        <View>
            <ReturnButton/>
        </View>
        <Heading1>
            Formas de pagamento
        </Heading1>
        <View className='justify-center items-center'>
            <PagamentoPix produtoId={id} />
        </View>
    </View>
  )
}

export default Pagamento

const styles = StyleSheet.create({})