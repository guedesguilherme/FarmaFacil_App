import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { BodyText, DescText, Heading1, Heading2 } from './TextComponent'
import Entypo from '@expo/vector-icons/Entypo'
import { PrimaryButton } from './ButtonsComponent'

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

export const CardHomeLoja = ({ CardHeader, CardItem1, CardDesc1, CardItem2, CardDesc2 }) => (
    <View
        className='
        bg-white
        border-primaryBlue
        border-2
        p-5
        items-center
        justify-between
        mb-5
        mx-[20px]
        w-[80%] max-w-[300px] 
        max-h-[335px]
        rounded-lg
        '
    >

        <Heading1>{CardHeader}</Heading1>
        <Heading2>{CardItem1}</Heading2>
        <BodyText>{CardDesc1}</BodyText>
        <Heading2>{CardItem2}</Heading2>
        <BodyText>{CardDesc2}</BodyText>

        <PrimaryButton>Gerenciar Estoque</PrimaryButton>

    </View>
)

