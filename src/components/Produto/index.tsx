import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { BodyText, BodyTextBold, Heading2, Heading3 } from "../TextComponent";
import { router } from 'expo-router'

export default function Produtos({ data, className = '', ...props }) {
  return (
    <TouchableOpacity 
      className="
        flex
        flex-row
        w-full 
        mb-3
        bg-white 
        border-2 border-primaryBlue
        py-4
        px-3
        rounded-lg 
        items-center 
        ${className}
      "
      onPress={() => router.push({ pathname: '/pages/Produtos/Detalhes', params: { id: data._id } })}>
      <Image 
      className="
        w-20
        h-20
        mr-3
      "
      source={{ uri: data.imagem_url }}/>
      <View>
        <View>
          <Heading2>{data.nome}</Heading2>
          <Heading3>{data.nome_quimico}</Heading3>
          <BodyText>{data.label}</BodyText>
        </View>

        <BodyTextBold className="color-green-600">R$ {parseFloat(data.preco).toFixed(2)}</BodyTextBold>
      </View>
    </TouchableOpacity>
  );
}

