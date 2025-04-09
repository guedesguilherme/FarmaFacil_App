import { Stack } from "expo-router";
import { CadastroLojaProvider } from "../context/CadastroLojaContext";

export default function RootLayout() {
  return (
    <CadastroLojaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CadastroLojaProvider>
  );
}
