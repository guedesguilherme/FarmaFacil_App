import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export const TextInputComponent = ({ className='', label, ...props }) => (
    <View className={`flex-col gap-2 ${className}`}>
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
                p-2
                font-bold
                text-lg
            '
            {...props} 
        />
    </View>
)

export const DisabledTextInputComponent = ({ className='', label, ...props }) => (
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
                bg-gray-200
                border-primaryBlue
                border-2
                rounded-lg
            '
            editable={false}
            {...props} 
        />
    </View>
)
