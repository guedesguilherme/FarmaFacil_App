import React from 'react'
import { View, Text, ScrollView } from 'react-native'

const GenericContainer = ({ children, className = '' }) => {
    return (
        <View className={`flex-1 bg-white ${className} `}>
            {children}
        </View>
    )
}

export const Form = ({ children, className = '' }) => (
    <View className={`mt-5 ml-5 mr-5 flex-col gap-5 ${className}`}>
        {children}
    </View>
)

export const ButtonsArea = ({ children, className = '' }) => (
    <View className={`items-center justify-center flex-col gap-5 mb-10 ${className}`}>
        {children}
    </View>
)

export const BorderContainer = ({ children, className = '' }) => (
    <ScrollView
        className={`
            m-5
            p-5
            border-2
            border-primaryBlue
            rounded-lg
            ${className}
        `}
    >
        ${children}
    </ScrollView>
)

export const DetalhesCompra = ({ children, className = '' }) => (
    <View className={
        `
            border-2
            border-primaryBlue
            rounded-lg
            mt-3
            ml-5
            mr-5
            mb-5
            p-3
            h-[75%]
            ${className}
        `}
    >
        {children}
    </View>
)

export default GenericContainer