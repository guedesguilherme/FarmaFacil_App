import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,  
  FlatList,
} from 'react-native'
import api from "../../../src/services/api";
import Produtos from "./Produtos";
import { ActivityIndicator } from "react-native";

export default function HomeCliente() {

  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('produtos')
      setProdutos(response.data)
      setLoading(false)
    }

    loadProdutos()
  }, [])

  if (loading === true) { 
    return (
      <View
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <ActivityIndicator 
          color='#2f88ff'
          size={45}
        />
      </View>
    )
  } else {    
    return (
      <View style={styles.container}>
        <Text>Produtos:</Text>
        <FlatList
          data={produtos}          
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => <Produtos data={item} />}
        >
        </FlatList>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
