
## Rotas e URLS de praxe da API 💾:

### ConnectionString do mongo 🍃: 

### URL base: https://api-cadastro-farmacias.onrender.com/

---------------------------------------------------------------------------

## Rotas ↔️:

### • CLIENTES 👨‍🦳:

- **URL: Cadastro Clientes:**
    **Method:** <span style="color: limegreen; font-weight: bold">POST</span>
    https://api-cadastro-farmacias.onrender.com/usuarios/auth/register
    <br />

- **URL: Login Clientes:**
    **Method:** <span style="color: limegreen; font-weight: bold">POST</span>
    https://api-cadastro-farmacias.onrender.com/usuarios/auth/login
    <br />

- **URL: Editar Cliente:**
    **Method:** <span style="color: purple; font-weight: bold">PATCH</span>
    https://api-cadastro-farmacias.onrender.com/usuarios/:id
    <br />

- **URL: Deletar Cliente:**
    **Method:** <span style="color: red; font-weight: bold">DELETE</span>
    https://api-cadastro-farmacias.onrender.com/usuarios/:id
    <br />

- URL: Login Google: **None**

---------------------------------------------------------------------------

### • FARMACIAS 🏪:

- **URL: Cadastro Farmácias:**
    **Method:** <span style="color: limegreen; font-weight: bold">POST:</span>
    https://api-cadastro-farmacias.onrender.com/farma/auth/register
    <br />

- **URL: Login Farmácias:**
    **Method:** <span style="color: limegreen; font-weight: bold">POST</span>
    https://api-cadastro-farmacias.onrender.com/farma/auth/login
    <br />

- **URL: Editar Farmácias:**
    **Method:** <span style="color: purple; font-weight: bold">PATCH</span>
    https://api-cadastro-farmacias.onrender.com/farma/:id
    <br />

- **URL: Deletar Farmácias:**
    **Method:** <span style="color: red; font-weight: bold">DELETE</span>
    https://api-cadastro-farmacias.onrender.com/farma/:id
    <br />

--------------------------------------------------------------------------

### • PRODUTOS 💊:

- **URL: Cadastro Produtos:**
    **Method:** <span style="color: limegreen; font-weight: bold">POST</span>
    **URL:** https://api-cadastro-farmacias.onrender.com/produtos/auth/register
    <br />

- **URL: Ver produtos da farmacia:**
    **Method:** <span style="color: #f5d700; font-weight: bold">GET</span>
    https://api-cadastro-farmacias.onrender.com/produtos/farmacia/:farmaciaId
    <br />

- **URL: Editar Produtos:**
    **Method:** <span style="color: purple; font-weight: bold">PATCH</span>
    https://api-cadastro-farmacias.onrender.com/produtos/:id
    <br />

- **URL: Deletar Produtos:**
    **Method:** <span style="color: red; font-weight: bold">DELETE</span>
    https://api-cadastro-farmacias.onrender.com/produtos/:id    
