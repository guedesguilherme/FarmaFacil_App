import React, { useState, useEffect } from "react";
import {
  StyleSheet,  
  FlatList,
} from 'react-native'
import api from "../../../src/services/api";
import Produtos from "../../../src/components/Produto";
import { ActivityIndicator } from "react-native";
import GenericContainer from "@/src/components/ViewComponents";

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
      <GenericContainer className='justify-center items-center flex-1'>
        <ActivityIndicator 
          color='#2f88ff'
          size={45}
        />
      </GenericContainer>
    )
  } else {    
    return (
      <GenericContainer>        
        <FlatList
          data={produtos}          
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => <Produtos data={item} />}
        >
        </FlatList>        
      </GenericContainer>
    )
  }
}
