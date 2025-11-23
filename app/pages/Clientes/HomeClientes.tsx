import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import api from "../../../src/services/api";
import Produtos from "../../../src/components/Produto";
import GenericContainer from "@/src/components/ViewComponents";
import { Heading1, Heading2 } from "@/src/components/TextComponent";
import { TextInputComponent } from '../../../src/components/TextInputComponents'; // Importando seu input
import { Ionicons } from '@expo/vector-icons'; // Ícone de lupa

type Produto = {
  _id: string;
  nome: string;
  // adicione outras propriedades se necessário (preço, imagem, etc)
};

export default function HomeCliente() {
  const [produtos, setProdutos] = useState<Produto[]>([]); // Lista completa (backup)
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]); // Lista exibida
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProdutos() {
      try {
        const response = await api.get('produtos');
        setProdutos(response.data);
        setFilteredProdutos(response.data); // Inicializa a lista filtrada com todos os produtos
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      } finally {
        setLoading(false);
      }
    }
    loadProdutos();
  }, []);

  // Função que filtra a lista localmente
  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text) {
      const newData = produtos.filter(item => {
        const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProdutos(newData);
    } else {
      // Se o campo estiver vazio, restaura a lista completa
      setFilteredProdutos(produtos);
    }
  };

  if (loading) {
    return (
      <GenericContainer>
        <Heading1>Seja bem vindo(a)</Heading1>
        <Heading2>Procure por um medicamento</Heading2>
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator color='#2f88ff' size={45} />
        </View>
      </GenericContainer>
    );
  }

  return (
    <GenericContainer>
      <Heading1>Seja bem vindo(a)</Heading1>
      <Heading2 className="mt-2 mb-4">Procure por um medicamento</Heading2>

      {/* Barra de Pesquisa */}
      <View className="mb-6">
        <TextInputComponent
            label="Pesquisar"
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Digite o nome do remédio..."
            rightIcon={
                <Ionicons name="search" size={24} color="#64748b" />
            }
        />
      </View>

      <FlatList
        data={filteredProdutos} // Usa a lista filtrada
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Produtos data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
            <View className="mt-10 items-center">
                <Ionicons name="search-outline" size={48} color="#cbd5e1" />
                <Text className="text-slate-400 mt-2 font-poppins_regular">
                    Nenhum produto encontrado.
                </Text>
            </View>
        )}
      />
    </GenericContainer>
  );
}