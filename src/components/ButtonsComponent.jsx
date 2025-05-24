import { TouchableOpacity, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { Heading1 } from './TextComponent';

export const PrimaryButton = ({ children, className = '', ...props }) => (
  <TouchableOpacity
    className={`
      w-[80%] max-w-[300px] 
      bg-primaryBlue 
      py-[13px] 
      rounded-lg 
      items-center justify-center     
      ${className}
    `}
    activeOpacity={0.7}
    {...props}
  >
    <Text className="text-base font-poppins_semibold text-white">
      {children}
    </Text>
  </TouchableOpacity>
);

export const SecondaryButton = ({ children, className = '', ...props }) => (
  <TouchableOpacity
    className={`
      w-[80%] max-w-[300px] 
      bg-white 
      border-2 border-primaryBlue
      py-[13px] 
      rounded-lg 
      items-center justify-center
      ${className}
    `}
    activeOpacity={0.7}
    {...props}
  >
    <Text className="text-base font-poppins_semibold text-primaryBlue">
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

export const ReturnButton = () => (
  <TouchableOpacity 
    className='
      w-[50%]
      border-2
      border-primaryBlue 
      rounded-lg 
      flex-row
      items-center
      p-2
      gap-5
      bg-white
    '
    onPress={
      () => router.back()
    }
  >
    <AntDesign name='left' size={25} color='#2f88ff' />
    <Text className='text-2xl font-bold'>Voltar</Text>
  </TouchableOpacity>
)
