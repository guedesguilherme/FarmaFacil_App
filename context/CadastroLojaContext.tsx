import React, { createContext, useContext, useState } from "react";

interface DadosCadastroLoja {
  nome: string;
  cnpj: string;
  email: string;
  nomeRede: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  cidade: string;
  uf: string;
  senha: string;
}

interface CadastroLojaContextProps {
  dados: Partial<DadosCadastroLoja>;
  setDados: (novosDados: Partial<DadosCadastroLoja>) => void;
  limparDados: () => void;
}

const CadastroLojaContext = createContext<CadastroLojaContextProps | undefined>(undefined);

export const CadastroLojaProvider = ({ children }: { children: React.ReactNode }) => {
  const [dados, setDadosState] = useState<Partial<DadosCadastroLoja>>({});

  const setDados = (novosDados: Partial<DadosCadastroLoja>) => {
    setDadosState((prev) => ({ ...prev, ...novosDados }));
  };

  const limparDados = () => {
    setDadosState({});
  };

  return (
    <CadastroLojaContext.Provider value={{ dados, setDados, limparDados }}>
      {children}
    </CadastroLojaContext.Provider>
  );
};

export const useCadastroLoja = () => {
  const context = useContext(CadastroLojaContext);
  if (!context) throw new Error("useCadastroLoja precisa estar dentro do CadastroLojaProvider");
  return context;
};
