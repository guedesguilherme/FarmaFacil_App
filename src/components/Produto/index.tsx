import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useRouter } from 'expo-router'; // 1. Importe o Hook useRouter
import { Ionicons } from '@expo/vector-icons';

export default function Produtos({ data, className = '', ...props }) {
  
  const router = useRouter(); // 2. Inicialize o hook aqui dentro

  const precoFormatado = data.preco 
    ? Number(data.preco).toFixed(2).replace('.', ',') 
    : '0,00';

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className={`
        flex-row
        w-full 
        mb-4
        bg-white 
        p-3
        rounded-2xl
        shadow-sm
        elevation-sm
        border border-slate-100
        items-center
        ${className}
      `}
      // 3. Use a variável 'router' criada pelo hook
      onPress={() => router.push({ pathname: '/pages/Produtos/Detalhes', params: { id: data._id } })}
      {...props}
    >
      <View className="bg-slate-50 rounded-xl p-2 mr-4 border border-slate-100">
        <Image 
          className="w-16 h-16"
          source={{ uri: data.imagem_url }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 justify-between py-1">
        <View>
          <Text 
            className="font-poppins_bold text-slate-800 text-base leading-5 mb-1" 
            numberOfLines={2}
          >
            {data.nome}
          </Text>

          <Text 
            className="font-poppins_medium text-slate-400 text-xs uppercase tracking-wide mb-1" 
            numberOfLines={1}
          >
            {data.nome_quimico}
          </Text>

          {data.label && (
            <Text 
              className="font-poppins_regular text-slate-500 text-xs mb-2" 
              numberOfLines={1}
            >
              {data.label}
            </Text>
          )}
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="font-poppins_bold text-green-600 text-lg">
            R$ {precoFormatado}
          </Text>
          
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </View>
      </View>
    </TouchableOpacity>
  );
}