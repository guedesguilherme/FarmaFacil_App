import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Heading1, Heading2 } from "../TextComponent";
import { router } from 'expo-router'

export default function Produtos({ data }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: '/pages/Produtos/Detalhes', params: { id: data._id } })}>
      <Image source={{ uri: data.imagem_url }} style={styles.imagem} />
      <View style={styles.card}>
        <View>
          <Heading1>{data.nome}</Heading1>
          <Heading2>{data.nome_quimico}</Heading2>
          <Heading2>{data.label}</Heading2>
        </View>

        <Heading1>R$ {parseFloat(data.preco).toFixed(2)}</Heading1>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,    
    borderBottomWidth: 1,
    borderBottomColor: '#2f88ff'
  },
  card: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titulo: {},
  imagem: {
    height: 250,
  },
});
