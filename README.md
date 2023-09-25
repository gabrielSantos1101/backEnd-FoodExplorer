# 🍕 Back End Food Explorer.

## Sobre o Projeto

O **Food Explorer** é um Web App que simula um menu interativo de um restaurante fictício. Ele oferece uma experiência envolvente e informativa aos usuários, permitindo que eles explorem os pratos, bebidas e opções do cardápio de forma interativa e visualmente atraente. Com o **Food Explorer**, os clientes podem navegar pelos pratos, ver imagens, descrições e informações detalhadas sobre cada item, criando uma experiência gastronômica virtual única.

## 📋 Índice

- 📦 [Pré-requisitos](#-pré-requisitos)
- 🛠️ [Instalação](#%EF%B8%8F-instalação)
- 💻 [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- 🤝 [Contribuições](#-contribuições)
- 📄 [Licença](#-licença)

##  preview 💻
![Preview do projeto](https://cdn.discordapp.com/attachments/1135990801948745979/1154859433684381716/Mockups.png)
<<<<<<< HEAD
[Acesse o front end aqui](https://github.com/gabrielSantos1101/Front-foodExplorer)
=======
[acesse o front end aqui](https://github.com/gabrielSantos1101/Front-FoodExplorer)
>>>>>>> 418aa9403a13b9ce1743a3cb98467489ef7065c6

## 📦 Pré-requisitos

Liste de pré-requisitos necessários para que o projeto seja executado com sucesso:

- [Node.js](https://nodejs.org/) - Versão v18.18.0 ou superior.
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) - Versão 9.5.1 ou superior.

## 🛠️ Instalação

Siga os passos abaixo para instalar e configurar a aplicação em um ambiente local:

1. 📥 **Clone o repositório:**

    ```bash
    git clone https://github.com/gabrielSantos1101/backEnd-FoodExplorer.git

    ou a CLI:
    gh repo clone gabrielSantos1101/backEnd-FoodExplorer
    ```

2. 📂 **Navegue para o diretório do projeto:**

    ```bash
    cd ./BackEnd-foodExplorer
    ```

3. 📦 **Instale as dependências:**

    ```bash
    npm install
     ou
    npm i
    ```

4. ⚙️ **Crie um arquivo de configuração:**

    Crie um arquivo `.env` como mostra no arquivo `.env.example` na raiz do projeto e configure as variáveis de ambiente necessárias. Por exemplo:

    ```dotenv
    PORT=
    FRONTEND_URL=
    AUTH_SECRET=
    ```

5. ▶️ **Inicie o servidor:**

    ```bash
    npm run dev
    ```

Agora a **Aplicação Food Explorer** está instalada, configurada e em execução no seu ambiente local. Você pode começar a usá-la para testes e desenvolvimento.

## Rotas
[Principais Rotas](./.github/routes.md)

## 💻 Tecnologias Utilizadas

Liste as principais tecnologias e bibliotecas que você usou no projeto, como:

- [**sqlite**](https://www.sqlite.org/index.html)
- [**bcryptjs**](https://www.npmjs.com/package/bcrypt/)
- [**cors**](https://www.npmjs.com/package/cors)
- [**expless**](https://www.npmjs.com/package/express)
- [**express-async-errors**](https://www.npmjs.com/package/express-async-errors)
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)
- [**knex**](https://www.npmjs.com/package/knex)
- [**pm2**](https://www.npmjs.com/package/pm2)

## Serviços
- [**koyeb**](https://www.koyeb.com/)


## 🤝 Contribuições

Agradeço por considerar contribuir para a **Food Explorer API**! Contribuições são importantes para melhorar e evoluir o projeto. Aqui estão algumas maneiras pelas quais você pode contribuir:

### 1. Abertura de Issues

Se você encontrar problemas, bugs ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue. Certifique-se de incluir detalhes suficientes para que possamos entender o problema ou a sugestão.

### 2. Envio de Pull Requests (PRs)

Se você deseja fazer alterações no código, pode criar um fork deste repositório, fazer suas alterações no seu fork e, em seguida, enviar um Pull Request. Certifique-se de descrever as alterações que você fez e explicar como isso beneficia o projeto.

### 3. Melhoria da Documentação

A documentação é fundamental para manter a API acessível e fácil de entender. Se você identificar partes do código que precisam de documentação adicional, pode contribuir adicionando comentários claros ou atualizando o README.

### Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma nova branch para suas alterações: `git checkout -b feature/nome-da-sua-feature`.
3. Faça suas alterações e commit: `git commit -m 'Adiciona nova funcionalidade'`.
4. Envie suas alterações para o GitHub: `git push origin feature/nome-da-sua-feature`.
5. Abra um Pull Request para este repositório.

🤝 Agradeço por sua contribuição!
## 📄 Licença

O app **Food Explorer** é distribuída sob a licença MIT. Isso significa que você pode usar, modificar e distribuir o código desta API livremente, desde que inclua a declaração de direitos autorais e a licença MIT em qualquer cópia ou parte dela.