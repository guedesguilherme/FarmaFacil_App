import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { BodyText, DescText, Heading1, Heading2, Heading3 } from './TextComponent'
import Entypo from '@expo/vector-icons/Entypo'
import { PrimaryButton } from './ButtonsComponent'
import { Ionicons } from '@expo/vector-icons';


export const GenericCard = ({ label1, label2, label3 /*imgUrl*/ }) => (
  <TouchableOpacity
    className='
            bg-gray-300
            flex-1
            flex-row
            p-5
            items-center            
            justify-between
            mb-5
            rounded-lg
        '
  >

    <View className='flex-row gap-10 items-center'>
      <Image
        //! FIXME: Substituir a linha abaixo por:
        //! source={{ uri: imgUrl }}
        source={{ uri: 'https://picsum.photos/100/100' }}
        style={{ width: 100, height: 100 }}
      />

      <View className='flex-col'>
        <Heading1>{label1}</Heading1>
        <Heading2>{label2}</Heading2>
        <Heading1>R$ {label3}</Heading1>
      </View>
    </View>

    <Entypo name='chevron-right' size={45} color='#a3aab5' />
  </TouchableOpacity>
)

export const SecondaryCard = ({ label1, label2, label3 }) => (
  <TouchableOpacity
    className='
            bg-white
            border-primaryBlue
            border-2
            flex-1
            flex-row
            p-5
            items-center            
            justify-between
            mb-5
            rounded-lg
        '
  >

    <View className='flex-row gap-10 items-center'>
      <Image
        //! FIXME: Substituir a linha abaixo por:
        //! source={{ uri: imgUrl }}
        source={{ uri: 'https://picsum.photos/100/100' }}
        style={{ width: 100, height: 100 }}
      />

      <View className='flex-col'>
        <Heading1>{label1}</Heading1>
        <Heading2>{label2}</Heading2>
        <Heading1>R$ {label3}</Heading1>
      </View>
    </View>

    <Entypo name='chevron-right' size={45} color='#000' />
  </TouchableOpacity>
)

export const CardHomeLoja = ({
  CardHeader,
  CardItem1,
  CardDesc1,
  CardItem2,
  CardDesc2,
  ButtonDesc,
  onPress,
}) => (
  <View
    className='
      bg-white
      border-primaryBlue
      border-2
      p-5
      justify-between
      mx-[20px]
      w-[90%]
      max-h-[335px]
      rounded-lg
    '
  >
    <View className='items-start'>
      <Heading2 className='mb-6'>{CardHeader}</Heading2>
      <Heading3>{CardItem1}</Heading3>
      <BodyText className='color-slate-500'>{CardDesc1}</BodyText>
      <Heading3 className='mt-2'>{CardItem2}</Heading3>
      <BodyText className='color-slate-500'>{CardDesc2}</BodyText>
    </View>

    <View className='items-center mt-7'>
      {/* Passa a função onPress para o botão */}
      <PrimaryButton onPress={onPress}>
        {ButtonDesc}
      </PrimaryButton>
    </View>
  </View>
);


export const PedidoCard = ({ nome, preco, cliente, imgUrl, onPress }) => {
  
  // Formatação de preço
  const precoFormatado = preco ? String(preco).replace('.', ',') : '0,00';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className='
        w-full
        bg-white
        p-3
        rounded-2xl
        shadow-sm
        border
        border-slate-100
        flex-row
        items-center
        mb-3
      '
    >
      {/* Container da Imagem */}
      <View className="w-20 h-20 bg-slate-50 rounded-xl items-center justify-center mr-4 border border-slate-100">
        <Image
          source={{ uri: imgUrl || 'https://picsum.photos/80' }}
          className='w-16 h-16'
          resizeMode='contain'
        />
      </View>

      {/* Informações */}
      <View className='flex-1 py-1'>
        <Text 
          className='font-poppins_bold text-slate-800 text-base leading-5 mb-1' 
          numberOfLines={2}
        >
          {nome}
        </Text>

        <View className="flex-row items-center mb-2">
          <Ionicons name="person-outline" size={12} color="#64748b" style={{ marginRight: 4 }} />
          <Text className='font-poppins_regular text-slate-500 text-xs'>
            {cliente}
          </Text>
        </View>

        <Text className='font-poppins_bold text-green-600 text-lg'>
          R$ {precoFormatado}
        </Text>
      </View>

      {/* Ícone de Seta */}
      <View className="ml-2">
         <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      </View>
    </TouchableOpacity>
  );
}

// Componente auxiliar interno para as linhas
const LinhaItem = ({ label, valor, isLast = false, isPrice = false }) => (
  <View 
    className={`
      flex-row 
      justify-between 
      items-start 
      py-3 
      ${isLast ? '' : 'border-b border-slate-100'}
    `}
  >
    <Text className="font-poppins_medium text-slate-500 text-sm">
      {label}
    </Text>
    <Text 
      className={`
        font-poppins_bold 
        text-right 
        flex-1 
        ml-4 
        ${isPrice ? 'text-green-600 text-base' : 'text-slate-800 text-sm'}
      `}
      numberOfLines={2}
    >
      {valor}
    </Text>
  </View>
);

export const PedidoDetalhesCard = ({ pedido }) => {
  // Tratamento seguro para o ID (caso venha undefined)
  const numeroPedido = pedido.numero ? `#${String(pedido.numero).slice(-6).toUpperCase()}` : 'N/A';

  return (
    <View className='bg-white rounded-2xl border border-slate-200 shadow-sm mx-1 mb-6 p-5'>
      
      {/* Cabeçalho do Card */}
      <View className='flex-row items-center mb-2 pb-3 border-b border-slate-100'>
        <View className="bg-blue-50 p-2 rounded-lg mr-3">
          <Ionicons name="receipt-outline" size={20} color="#2f88ff" />
        </View>
        <Text className='font-poppins_bold text-slate-800 text-lg'>
          {pedido.titulo || 'Resumo do Pedido'}
        </Text>
      </View>

      {/* Lista de Detalhes */}
      <View>
        <LinhaItem label="Nº Pedido" valor={numeroPedido} />
        <LinhaItem label="Produto" valor={pedido.produto} />
        <LinhaItem label="Quantidade" valor={`${pedido.quantidade} un.`} />
        <LinhaItem label="Cliente" valor={pedido.cliente} />
        
        {/* Preço com destaque */}
        <LinhaItem 
          label="Valor Total" 
          valor={`R$ ${pedido.preco}`} 
          isPrice={true} 
          isLast={true} 
        />
      </View>
    </View>
  );
};

export const PedidoCardCliente = ({ nome, preco, dataPedido, imgUrl, onPress, status }) => {
  
  // Garante a formatação do preço com vírgula
  const precoFormatado = preco ? String(preco).replace('.', ',') : '0,00';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className='
        w-full
        bg-white
        p-3
        rounded-2xl
        shadow-sm
        border
        border-slate-100
        flex-row
        items-center
        mb-3
      '
    >
      {/* Container da Imagem */}
      <View className="w-20 h-20 bg-slate-50 rounded-xl items-center justify-center mr-4 border border-slate-100">
        <Image
          source={{ uri: imgUrl || 'https://picsum.photos/80' }}
          className='w-16 h-16'
          resizeMode='contain'
        />
      </View>

      {/* Informações */}
      <View className='flex-1 py-1'>
        <View className="flex-row justify-between items-start">
           <Text 
             className='font-poppins_bold text-slate-800 text-base leading-5 mb-1 flex-1 mr-2' 
             numberOfLines={2}
           >
             {nome}
           </Text>
        </View>

        <Text className='font-poppins_regular text-slate-400 text-xs mb-2'>
          {dataPedido}
        </Text>

        <Text className='font-poppins_bold text-green-600 text-lg'>
          R$ {precoFormatado}
        </Text>
      </View>

      {/* Ícone de Seta */}
      <View className="ml-2">
         <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      </View>
    </TouchableOpacity>
  );
}