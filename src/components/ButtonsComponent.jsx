import { TouchableOpacity, Text, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Heading1 } from './TextComponent';

export const PrimaryButton = ({ children, className = '', ...props }) => (
  <TouchableOpacity
    className={`
      w-full 
      mx-4 
      bg-primaryBlue 
      py-[13px] 
      rounded-lg 
      items-center 
      justify-center     
      ${className}
    `}
    activeOpacity={0.7}
    {...props}
  >
    <Text className="text-xl font-poppins_semibold text-white">
      {children}
    </Text>
  </TouchableOpacity>
);

export const SecondaryButton = ({ children, className = '', ...props }) => (
  <TouchableOpacity
    className={`
      w-full 
      mx-4 
      bg-white 
      border-2 border-primaryBlue
      py-[13px] 
      rounded-lg 
      items-center 
      justify-center
      ${className}
    `}
    activeOpacity={0.7}
    {...props}
  >
    <Text className="text-xl font-poppins_semibold text-primaryBlue">
      {children}
    </Text>
  </TouchableOpacity>
);


export const FillButton = ({ children, className = '', ...props }) => (
  <TouchableOpacity
    className={`
      flex-row
      bg-primaryBlue
      p-3
      rounded-lg
      gap-3
      justify-center
      items-center
      ${className}
    `}
    {...props}
  >
    {children}
  </TouchableOpacity>
)

export const ReturnButton = ({ className='' }) => (
  <TouchableOpacity
    className={`
      w-[50%]
      flex-row
      items-center
      gap-5
      bg-white
      ${className}
    `}
    onPress={
      () => router.back()
    }
  >
    <AntDesign name='left' size={25} color='#2f88ff' />
    <Text className='text-2xl font-poppins_bold'>Voltar</Text>
  </TouchableOpacity>
)

export const PagamentoPix = ({ produtoId }) => (
  <TouchableOpacity
    className='
      w-[90%]
      border-2
      border-primaryBlue 
      rounded-lg 
      flex-row
      items-center
      justify-center
      p-3
      gap-5
      bg-white     
    '
    onPress={() => {console.log(produtoId), router.push({ pathname: '/pages/Produtos/FinalizarCompra', params: { id: produtoId }})}}
  >
    <FontAwesome6 name='pix' size={45} color='#2ebdaf' />
    <Heading1>
      Pagar via PIX
    </Heading1>
  </TouchableOpacity>
)

export const GoogleButton = ({
  children = 'Entrar com Google',
  className = '',
  disabled = false,
  ...props
}) => (
  <TouchableOpacity
    className={`
      w-full 
      mx-4 
      bg-white 
      border-2 border-primaryBlue
      py-[13px] 
      rounded-lg 
      flex-row
      items-center 
      justify-center
      gap-3
      ${disabled ? 'opacity-50' : ''}
      ${className}
    `}
    activeOpacity={0.7}
    disabled={disabled}
    {...props}
  >
    <Image
      source={require('../../assets/images/google-icon-1.png')}
      style={{ width: 20, height: 20 }}
      resizeMode="contain"
    />
    <Text className="text-xl font-poppins_semibold text-primaryBlue">
      {children}
    </Text>
  </TouchableOpacity>
);
