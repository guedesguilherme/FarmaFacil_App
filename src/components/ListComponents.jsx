import { Entypo } from '@expo/vector-icons'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const ListItemComponent = ({ className = '', icone, titulo, ...props }) => {
    return (
        <TouchableOpacity
            className={`
                border-b-2
                pb-2
                flex-row
                justify-between 
                items-center
                border-gray-600
                mb-6
                ${className}
            `}            
                {...props}
            >
            <View className='flex-row gap-3 items-center'>
                {icone}
                <Text className='font-bold text-xl'>{titulo}</Text>
            </View>
            <Entypo name='chevron-right' size={24} color='gray' />
        </TouchableOpacity>
    )
}

export default ListItemComponent
