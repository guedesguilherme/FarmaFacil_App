import { ActivityIndicator, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/src/services/api";
import { ReturnButton, FillButton } from "@/src/components/ButtonsComponent";
import { Ionicons } from '@expo/vector-icons';
import GenericContainer from "@/src/components/ViewComponents";

const Detalhes = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [informacoes, setInformacoes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Estado da Quantidade
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    async function loadInformacoes() {
      try {
        const response = await api.get(`produtos/${id}`);
        setInformacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar produto", error);
      } finally {
        setLoading(false);
      }
    }

    loadInformacoes();
  }, [id]);

  // 2. Funções de controle
  const incrementar = () => {
    // Opcional: Verificar estoque aqui se tiver essa info (ex: if quantidade < produto.estoque)
    setQuantidade(prev => prev + 1);
  };

  const decrementar = () => {
    setQuantidade(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <GenericContainer>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#2f88ff" size={45} />
        </View>
      </GenericContainer>
    );
  }

  if (!informacoes || !informacoes.produto) {
    return (
      <GenericContainer>
        <ReturnButton />
        <View className="flex-1 items-center justify-center">
          <Text className="font-poppins_medium text-slate-500">Produto não encontrado.</Text>
        </View>
      </GenericContainer>
    );
  }

  const { produto } = informacoes;
  
  // 3. Cálculo do Preço Total Dinâmico
  const precoUnitario = Number(produto.preco);
  const precoTotal = precoUnitario * quantidade;
  const precoFormatado = precoTotal.toFixed(2).replace('.', ',');

  return (
    <GenericContainer>
      <View className="mt-5 mb-2">
        <ReturnButton />
      </View>
      
      <Text className="text-center font-poppins_bold text-xl text-slate-800 mb-6">
        Detalhes do Produto
      </Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Aumentei o padding para caber o footer
      >
        {/* Container da Imagem */}
        <View className="w-full h-72 bg-white rounded-2xl border-2 border-primaryBlue items-center justify-center p-4 mb-6 shadow-sm">
          <Image
            source={{ uri: produto.imagem_url }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Informações do Produto */}
        <View className="px-2">
          <Text className="font-poppins_medium text-slate-400 text-sm uppercase tracking-widest mb-1">
            {produto.nome_quimico}
          </Text>

          <Text className="font-poppins_bold text-slate-800 text-2xl leading-8 mb-4">
            {produto.nome}
          </Text>

          <View className="h-[1px] bg-slate-200 w-full mb-4" />

          {/* 4. Seletor de Quantidade */}
          <View className="flex-row items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Text className="font-poppins_bold text-slate-700 text-lg">
              Quantidade
            </Text>

            <View className="flex-row items-center bg-white rounded-lg border border-slate-200 shadow-sm">
              <TouchableOpacity 
                onPress={decrementar}
                className="p-3 border-r border-slate-100"
              >
                <Ionicons name="remove" size={24} color={quantidade > 1 ? "#2f88ff" : "#cbd5e1"} />
              </TouchableOpacity>

              <View className="w-12 items-center justify-center">
                <Text className="font-poppins_bold text-slate-800 text-lg">
                  {quantidade}
                </Text>
              </View>

              <TouchableOpacity 
                onPress={incrementar}
                className="p-3 border-l border-slate-100"
              >
                <Ionicons name="add" size={24} color="#2f88ff" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="font-poppins_bold text-slate-700 text-lg mb-2">
            Sobre o produto
          </Text>
          <Text className="font-poppins_regular text-slate-600 text-base leading-6 text-justify">
            {produto.label || "Sem descrição disponível para este produto."}
          </Text>
        </View>
      </ScrollView>

      {/* Barra Inferior Fixa */}
      <View className="absolute bottom-5 left-0 right-0 px-5">
        <View className="flex-row justify-between items-center bg-white pt-4 border-t border-slate-100">
          
          <View>
            <Text className="font-poppins_medium text-slate-400 text-xs">Total ({quantidade} un)</Text>
            <Text className="font-poppins_bold text-green-600 text-3xl">
              R$ {precoFormatado}
            </Text>
          </View>

          <FillButton 
            className="flex-row items-center px-6 py-3 rounded-xl"
            onPress={() => router.push({ 
              pathname: '/pages/Produtos/Pagamento', 
              params: { 
                id: produto._id,
                quantidade: quantidade // 5. Passando a quantidade para a próxima tela
              } 
            })}
          >
            <Ionicons name="cart" size={24} color="#FFF" style={{ marginRight: 8 }} />
            <Text className="font-poppins_bold text-white text-lg">
              Comprar
            </Text>
          </FillButton>

        </View>
      </View>

    </GenericContainer>
  );
};

export default Detalhes;