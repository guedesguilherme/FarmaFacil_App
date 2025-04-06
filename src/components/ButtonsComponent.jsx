import { TouchableOpacity, Text } from 'react-native';

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