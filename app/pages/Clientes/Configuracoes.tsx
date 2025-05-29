import { ScrollView, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Heading1 } from '@/src/components/TextComponent'
import GenericContainer from '@/src/components/ViewComponents'
import ListLinkItem from '@/src/components/ItemListComponents'
import AntDesign from '@expo/vector-icons/AntDesign'

const Configuracoes = () => {
    return (
        <GenericContainer>
            <Heading1 className='m-5'>
                Configurações
            </Heading1>
            <ScrollView className='m-5'>
                <ListLinkItem iconLib={AntDesign} primaryIcon={'edit'} label='Editar suas informações' destiny='/pages/Clientes/EditarDados' />                
                <Button title='Encerrar sessão' />
            </ScrollView>
        </GenericContainer>
    )
}

export default Configuracoes

const styles = StyleSheet.create({})