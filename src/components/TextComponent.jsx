import { Text, View } from 'react-native';

/**
 * COMPONENTE BASE (reutilizado pelos demais)
 * 
 * @param {string} children - Conteúdo de texto
 * @param {string} className - Classes adicionais do NativeWind
 * @param {object} props - Outras propriedades do componente Text
 */
const BaseText = ({ children, className = '', ...props }) => {
  return (
    <Text 
      className={`${className}`} 
      {...props}
    >
      {children}
    </Text>
  );
};

export const Heading1 = ({ children, className = '', ...props }) => (
  <BaseText 
    className={`text-3xl font-poppins_bold ${className}`} 
    {...props}
  >
    {children}
  </BaseText>
);

export const Heading2 = ({ children, className = '', ...props }) => (
  <BaseText 
    className={`text-2xl font-poppins_semibold ${className}`} 
    {...props}
  >
    {children}
  </BaseText>
);

export const Heading3 = ({ children, className = '', ...props }) => (
  <BaseText 
    className={`text-xl font-poppins_medium ${className}`} 
    {...props}
  >
    {children}
  </BaseText>
);

// text-base font-medium text-slate-600 

export const BodyText = ({ children, className = '', ...props }) => (
  <BaseText 
    className={`text-base font-poppins_medium ${className}`} 
    {...props}
  >
    {children}
  </BaseText>
);

export const LinkText = ({ children, className = '', ...props }) => (
  <BaseText 
    className={`text-xl font-poppins_semibold text-primaryBlue ${className}`} 
    {...props}
  >
    {children}
  </BaseText>
);

export const ErrorText = ({ children, className = '', ...props }) => (
  <View className="mt-1">
    <BaseText 
      className={`text-xs font-poppins_medium text-error ${className}`} 
      {...props}
    >
      {children}
    </BaseText>
  </View>
);