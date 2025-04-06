import { View, Text, TextInput } from 'react-native';

export const StyledInput = ({
  label,
  placeholder,
  className = '',
  inputClassName = '',
  ...props
}) => {
  return (
    <View className={`w-[80%] max-w-[300px] ${className}`}>
      {/* Se tiver label, mostra */}
      {label && (
        <Text className="text-base font-poppins_medium text-black mb-1">
          {label}
        </Text>
      )}
      
      {/* Campo de input */}
      <TextInput
        className={`
          w-full 
          bg-white 
          border-2 border-primaryBlue 
          rounded-lg 
          px-4 py-[13px]
          text-base
          ${inputClassName}
        `}
        placeholder={placeholder}
        placeholderTextColor="#00000080"  // Preto com 50% de transparência
        {...props}
      />
    </View>
  );
};