import { Stack } from "expo-router";
import { CadastroLojaProvider } from "../context/CadastroLojaContext";

export default function RootLayout() {
  return (    
    <Stack screenOptions={{ headerShown: false }}>    
      <Stack.Screen 
        name='views/cliente/homeCliente'
      />      
    </Stack>
  );
}
