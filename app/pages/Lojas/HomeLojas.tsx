import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer from '@/src/components/ViewComponents'
import { GenericCard, SecondaryCard } from '@/src/components/CardComponents'

const HomeLojas = () => {
  return (
    <GenericContainer>
      <Heading1 className='m-5'>
        {`Olá {nome da loja}`}
      </Heading1>

      <Heading1 className='m-5'>
        Seus produtos:
      </Heading1>

      <ScrollView className='m-5'>
        <SecondaryCard label1='texto' label2='texto' label3='texto' />
      </ScrollView>

    </GenericContainer>
  )
}

export default HomeLojas

const styles = StyleSheet.create({})