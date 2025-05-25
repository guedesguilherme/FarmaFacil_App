import { ActivityIndicator, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router, } from "expo-router";
import api from "@/src/services/api";
import { Heading1, Heading2 } from "@/src/components/TextComponent";
import { FillButton, PrimaryButton, ReturnButton } from "@/src/components/ButtonsComponent";
import AntDesign from '@expo/vector-icons/AntDesign';

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
      <View className='m-5 flex-col'>
        <View className='gap-5'>
          <ReturnButton />
          <Heading1>
            Comprar este produto
          </Heading1>
        </View>

        <View className='
            border-2
            border-primaryBlue
            rounded-lg
            mt-3
            p-3
            h-[75%]
          '
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
        </View>


      </View>
    );
  }
};

export default Detalhes;
