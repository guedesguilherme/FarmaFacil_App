import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export const InputComponent = ({ className='', label, ...props }) => (
    <View>
        <Text
            className='
                font-bold
                text-xl
            '
        >
            {label}
        </Text>
        <TextInput
            className='
                bg-white
                border-primaryBlue
                border-2
                rounded-lg
            '
            {...props} 
        />
    </View>
)

const styles = StyleSheet.create({})