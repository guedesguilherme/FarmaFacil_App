import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

const ListItemComponent = ({ className = '', label, value = '', onChangeText, placeholder = '' }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleEditToggle = () => {
    setIsEditing(true)
  }

  const handleEndEditing = () => {
    setIsEditing(false)
    if (onChangeText && inputValue !== value) {
      onChangeText(inputValue)
    }
  }

  return (
    <View className={`flex-col w-full ${className}`}>
      <Text className="font-poppins_bold text-xl mb-1">{label}</Text>

      <View className="flex-row items-center justify-between bg-white border-primaryBlue border-2 rounded-lg px-3 py-2">
        <TextInput
          className="flex-1 font-poppins_semibold text-lg text-slate-600"
          value={inputValue}
          onChangeText={setInputValue}
          editable={isEditing}
          onEndEditing={handleEndEditing}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
        />

        <TouchableOpacity onPress={isEditing ? handleEndEditing : handleEditToggle}>
          <AntDesign name={isEditing ? 'check' : 'edit'} size={24} color={isEditing ? '#22C55E' : '#2F88FF'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ListItemComponent
