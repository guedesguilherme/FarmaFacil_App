import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from 'react-native';
import api from "../../../src/services/api";
import Produtos from "../../../src/components/Produto";
import GenericContainer from "@/src/components/ViewComponents";
import { Heading1, Heading2 } from "@/src/components/TextComponent";

type Produto = {
  _id: string;
  nome: string;
  // defina outras propriedades conforme sua API retorna
};

export default function HomeCliente() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('produtos');
      setProdutos(response.data);
      setLoading(false);
    }
    loadProdutos();
  }, []);

  if (loading) {
    return (
      <GenericContainer>
        <Heading1>Seja bem vindo(a)</Heading1>
        <Heading2>Procure por um medicamento</Heading2>
        <ActivityIndicator color='#2f88ff' size={45} />
      </GenericContainer>
    );
  }

  return (
    <GenericContainer>
      <Heading1>Seja bem vindo(a)</Heading1>
      <Heading2 className="mt-5 mb-8">Procure por um medicamento</Heading2>
      <FlatList
        data={produtos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Produtos data={item} />}
      />
    </GenericContainer>
  );
}
