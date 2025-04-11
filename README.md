# Farma-Fácil expo

## Por onde começar?
### /app 📱 Estrutura geral do app (componentes e telas)
  - ### /app/auth 🔐 Estrutura geral de autenticação para os usuários
  - ### /app/views 👁️ Páginas em geral
### /context ⚒️ Ferramentas nativas para a API
### /assets 🖼️🔠 Imagens e fontes
### /scripts 🗒️ Backup do código de alguns componentes

---------------------------

## ‼️Importante‼️ - Rotas ↔️

O expo-router, método que gera rotas para o próprio app, se baseia no nome dos arquivos para criar as rotas. Ou seja:

- Temos um componente 'Login', e criamos um link para a url '/Login', seremos levados para o componente ao clicar no link.

-----------------------------

## O que falta? (TODO) 📝

### Farmácia:
- Integrar com a api:  
  - Cadastro de produtos (farmácia)
  - Editar dados do produto (farmácia)
  - Deletar produtos (farmácia)
  - Exibir produtos da loja (para cliente e farmacia)
  - Editar dados da loja
  - Mostrar pedidos da loja

### Cliente:

- Adicionar login social
- Integrar com a api:    
  - Exibir lojas
  - Exibir produtos da loja (para cliente e farmacia)
  - Editar dados do usuário
  - Deletar usuário (farmácia e cliente)
  - Adicionar carrinho de compras
  - Manipular carrinho (inserir e ou remover produtos)  
  - Mostrar detalhes do produto da loja (para cliente e farmacia)
<br />
<br />

### Outros:
- Ajustes no design - Web
- Ajustes na navegação do usuário (Exemplo: usuário logado **NÃO PODE** ter acesso à tela de login nem à de cadastro)
- Usuário deletado não pode ter acesso à plataforma

#### - FUTUROS/NÃO-PRIORIDADE:
- Trabalhar na componentização dos elementos das páginas

