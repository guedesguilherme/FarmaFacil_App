import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Heading1, Heading2 } from './TextComponent'
import Entypo from '@expo/vector-icons/Entypo'

export const GenericCard = ({ label1, label2, label3 /*imgUrl*/ }) => (
    <TouchableOpacity
        className='
            bg-gray-300
            flex-1
            flex-row
            p-5
            items-center            
            justify-between
            mb-5
            rounded-lg
        '
    >

        <View className='flex-row gap-10 items-center'>
            <Image
                //! FIXME: Substituir a linha abaixo por:
                //! source={{ uri: imgUrl }}
                source={{ uri: 'https://picsum.photos/100/100' }}
                style={{ width: 100, height: 100 }}
            />

            <View className='flex-col'>
                <Heading1>{label1}</Heading1>
                <Heading2>{label2}</Heading2>
                <Heading1>R$ {label3}</Heading1>
            </View>
        </View>

        <Entypo name='chevron-right' size={45} color='#a3aab5' />
    </TouchableOpacity>
)

export const SecondaryCard = ({ label1, label2, label3 }) => (
    <TouchableOpacity
        className='
            bg-white
            border-primaryBlue
            border-2
            flex-1
            flex-row
            p-5
            items-center            
            justify-between
            mb-5
            rounded-lg
        '
    >

        <View className='flex-row gap-10 items-center'>
            <Image
                //! FIXME: Substituir a linha abaixo por:
                //! source={{ uri: imgUrl }}
                source={{ uri: 'https://picsum.photos/100/100' }}
                style={{ width: 100, height: 100 }}
            />

            <View className='flex-col'>
                <Heading1>{label1}</Heading1>
                <Heading2>{label2}</Heading2>
                <Heading1>R$ {label3}</Heading1>
            </View>
        </View>

        <Entypo name='chevron-right' size={45} color='#000' />
    </TouchableOpacity>
)

