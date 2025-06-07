import { ActivityIndicator, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router, } from "expo-router";
import api from "@/src/services/api";
import { Heading1, Heading2 } from "@/src/components/TextComponent";
import { FillButton, PrimaryButton, ReturnButton } from "@/src/components/ButtonsComponent";
import AntDesign from '@expo/vector-icons/AntDesign';
import GenericContainer, { DetalhesCompra } from "@/src/components/ViewComponents";

const Detalhes = () => {
  const { id } = useLocalSearchParams();

  const [informacoes, setInformacoes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInformacoes() {
      const response = await api.get(`produtos/${id}`);
      setInformacoes(response.data);
      setLoading(false);
    }

    loadInformacoes();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#2f88ff" size={45} />
      </View>
    );
  } else {
    return (
      <GenericContainer>
        <ReturnButton className='m-5' />
        <Heading1 className='text-center'>
          Comprar este produto:
        </Heading1>

        <DetalhesCompra
        >
          <View className='justify-center items-center'>
            <Image
              source={{ uri: informacoes.produto.imagem_url }}
              className='w-[60%] h-[60%]'
            />
          </View>
          {/* Info */}
          <View className='pb-2 mb-3 border-b border-primaryBlue'>
            <Heading1>{informacoes.produto.nome}</Heading1>
            <Heading2>{informacoes.produto.nome_quimico}</Heading2>
            <Heading2>{informacoes.produto.label}</Heading2>
          </View>

          {/* Preço + btnComprar */}
          <View className='flex-row justify-between items-center'>
            <Heading1>R$ {parseFloat(informacoes.produto.preco).toFixed(2)}</Heading1>
            <FillButton onPress={() => router.push({ pathname: '/pages/Produtos/Pagamento', params: { id: informacoes.produto._id } })}>
              <AntDesign name='shoppingcart' size={24} color='#FFFF' />
              <Heading1 className='color-white'>
                Comprar
              </Heading1>
            </FillButton>
          </View>
        </DetalhesCompra>


      </GenericContainer>
    );
  }
};

export default Detalhes;
