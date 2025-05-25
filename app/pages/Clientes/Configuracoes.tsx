import { ScrollView, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Heading1 } from '@/src/components/TextComponent'

const Configuracoes = () => {
    return (
        <View className='flex-1 bg-white'>
            <View className='m-5'>
                <View>
                    <Heading1>
                        Configurações
                    </Heading1>
                </View>
                <ScrollView>
                    <Button
                        title='Sair'
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default Configuracoes

const styles = StyleSheet.create({})