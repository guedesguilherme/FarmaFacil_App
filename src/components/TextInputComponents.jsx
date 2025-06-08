import { Text, View, TextInput } from 'react-native'
import React from 'react'

export const TextInputComponent = ({ className = '', label, placeholder, ...props }) => (
  <View className={`flex-col w-full mx-5 ${className}`}>
    <Text className='font-poppins_bold text-xl'>
      {label}
    </Text>
    <TextInput
      placeholder={placeholder || label}
      className='
        bg-white
        border-primaryBlue
        border-2
        rounded-lg
        p-2
        font-poppins_medium
        text-lg
      '
      {...props}
    />
  </View>
)

export const DisabledTextInputComponent = ({ className = '', label, placeholder, ...props }) => (
  <View className={`flex-col w-full mx-5 ${className}`}>
    <Text className="font-poppins_bold text-xl text-gray-600">
      {label}
    </Text>
    <TextInput
      placeholder={placeholder || label}
      editable={false}
      className="
        bg-gray-100
        border-2
        border-primaryBlue-200
        rounded-lg
        p-2
        text-gray-500
        font-poppins_medium
        text-lg
      "
      {...props}
    />
  </View>
)

