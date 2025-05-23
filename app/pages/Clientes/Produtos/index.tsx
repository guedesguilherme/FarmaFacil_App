import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'

export default function Produtos({ data }) {    
    return (
        <View>
            <View style={styles.card}>
                <Image 
                    source={{ uri: data.imagem_url }}
                    style={styles.imagem}
                />
                <Text style={styles.nomeProduto}>
                    {data.nome}
                </Text>
                <Text style={styles.nomeQuimico}>
                    {data.nome_quimico}
                </Text>
                <Text style={styles.categoria}>
                    {data.label}
                </Text>
                <Text style={styles.preco}>
                    R$ {data.preco}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {},
    titulo: {},
    imagem: {
        height: 250,
    },
})
