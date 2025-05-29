import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import { useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
const FontAwesome = require('@expo/vector-icons/FontAwesome').default;
const FontAwesome5 = require('@expo/vector-icons/FontAwesome5').default;
const FontAwesome6 = require('@expo/vector-icons/FontAwesome6').default;
const MaterialIcons = require('@expo/vector-icons/MaterialIcons').default;
const MaterialCommunityIcons = require('@expo/vector-icons/MaterialCommunityIcons').default;
const Ionicons = require('@expo/vector-icons/Ionicons').default;
const Feather = require('@expo/vector-icons/Feather').default;
const SimpleLineIcons = require('@expo/vector-icons/SimpleLineIcons').default;
const Fontisto = require('@expo/vector-icons/Fontisto').default;
const Octicons = require('@expo/vector-icons/Octicons').default;
const EvilIcons = require('@expo/vector-icons/EvilIcons').default;
const Foundation = require('@expo/vector-icons/Foundation').default;
const Zocial = require('@expo/vector-icons/Zocial').default;

function ListLinkItem({ className='', iconLib, primaryIcon, label, destiny }) {
    const router = useRouter()

    function renderIcon() {
        const iconProps = { name: primaryIcon, size: 30, color: '#a3aab5' };
        switch (iconLib) {
            case Entypo:
                return <Entypo {...iconProps} />;
            case AntDesign:
                return <AntDesign {...iconProps} />;
            case FontAwesome:
                return <FontAwesome {...iconProps} />;
            case FontAwesome5:
                return <FontAwesome5 {...iconProps} />;
            case FontAwesome6:
                return <FontAwesome6 {...iconProps} />;
            case MaterialIcons:
                return <MaterialIcons {...iconProps} />;
            case MaterialCommunityIcons:
                return <MaterialCommunityIcons {...iconProps} />;
            case Ionicons:
                return <Ionicons {...iconProps} />;
            case Feather:
                return <Feather {...iconProps} />;
            case SimpleLineIcons:
                return <SimpleLineIcons {...iconProps} />;
            case Fontisto:
                return <Fontisto {...iconProps} />;
            case Octicons:
                return <Octicons {...iconProps} />;
            case EvilIcons:
                return <EvilIcons {...iconProps} />;
            case Foundation:
                return <Foundation {...iconProps} />;
            case Zocial:
                return <Zocial {...iconProps} />;
            default:
                return null;
        }
    }

  return (
    <TouchableOpacity 
        className={
            `border-b-2
            border-b-gray-400 
            pb-2
            mb-5
            flex-row
            justify-between 
            items-center
            ${className}
        `}
        onPress={() => router.push(destiny)}
    >
        <View className='flex-row gap-3 items-center'>
            <Text className='text-lg'>{label}</Text>
            {renderIcon()}
        </View>
            <Entypo name='chevron-right' size={35} color='#a3aab5' />            
    </TouchableOpacity>
  )
}

export default ListLinkItem