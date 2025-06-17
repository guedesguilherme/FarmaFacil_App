import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View, TouchableOpacity, TextInput } from 'react-native'

const ListItemComponent = ({ className = '', label, placeholder, ...props }) => {
    return (
        <TouchableOpacity
            className={`
                flex-col
                w-full
                ${className}
            `}            
                {...props}
            >
            <Text
                className='
                    font-poppins_bold
                    text-xl
                '
            >
                {label}
            </Text>
            <View className='
                flex-row 
                items-center 
                justify-between 
                bg-white
                border-primaryBlue
                border-2
                rounded-lg
                p-2
                w-full
            '>
            <TextInput
            className='font-poppins_semibold text-lg color-slate-600'
            {...props} 
            >
            {placeholder}    

            </TextInput>                
            <AntDesign name='edit' size={24} color='#2F88FF'/>    
            </View>
        </TouchableOpacity>
    )
}

export default ListItemComponent
