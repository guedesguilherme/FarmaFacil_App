import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heading1 } from '@/src/components/TextComponent'
import { SecondaryButton } from '@/src/components/ButtonsComponent'
import GenericContainer from '@/src/components/ViewComponents'
import { CardHomeLoja, SecondaryCard } from '@/src/components/CardComponents'

const HomeLojas = () => {
  return (
    <GenericContainer className='items-center gap-8'>

      <Heading1>Bem vindo</Heading1>

      <SecondaryButton className='mt-8'>
        Adicionar Novo Produto
      </SecondaryButton>

      <CardHomeLoja 
        CardHeader="Gerencie seu estoque" 
        CardItem1="Produtos em estoque" 
        CardDesc1="10"
        CardItem2="Produtos com menos unidades"
        CardDesc2="Dipirona">

      </CardHomeLoja>
    </GenericContainer>
  )
}

export default HomeLojas

const styles = StyleSheet.create({})