import { StyleSheet, Text, View, TextInput } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'

export const TextInputComponent = ({ 
  className = '', 
  label, 
  rightIcon = null,
  ...props 
}) => (
  <View className={`flex-col w-full mx-0 ${className}`}>
    <Text className='font-poppins_bold text-xl'>
      {label}
    </Text>
    <View className="flex-row items-center bg-white border-primaryBlue border-2 rounded-lg">
      <TextInput
        className="flex-1 font-poppins_semibold text-lg p-2 bg-white"
        {...props}
      />
      
      {rightIcon && (
        <View className="pr-3">
          {rightIcon}
        </View>
      )}
    </View>
  </View>
)

export const DisabledTextInputComponent = ({ className = '', label, ...props }) => (
  <View className={`flex-col w-full mx-0 ${className}`}>
    <Text
      className='
        font-poppins_bold
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
        font-poppins_semibold
        p-2
        text-lg
      '
      editable={false}
      {...props}
    />
  </View>
)
