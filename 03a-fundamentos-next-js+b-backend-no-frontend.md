# 1. Preparação

## 1.1. Ferramentas usadas no projeto

- Stripe (Pagamentos)
- GitHub (Autenticação - OAuth)
- FaunaDB (Banco de dados)
- Prismic CMS (Content Management System)

## 1.2. Fluxo da aplicação

- Home -> Autenticação (`GitHub`) -> Inscrição (`Stripe`) -> Salvar informações da inscrição do usuário (`FaunaDB`) <- Consumir posts (servido pelo `Prismic`)

# 2. Preparação para o desenvolvimento da aplicação

## 2.1. Instalação do Next.js

```bash
yarn create next-app ignews
```

## 2.2. Refatorações

### Remover arquivos desnecessários

- `./README.md`
- pasta `styles`
- `public/favicon.ico`
- `public/vercel.svg`
- pasta `pages/api`

### Editar conteúdo dos arquivos restantes

- `pages/index.js`
  - remover imports de arquivos já excluídos
  - remover conteúdo do `return (...)`
- `pages/_app.js`
  - remover imports de arquivos já excluídos

### Criar pasta `src` e mover a pasta `pages` para dentro dela

## 2.3. Instalação do Typescript

```bash
yarn add typescript @types/react @types/node @types/next -D
```

### Consultar se o pacote já possui typescript incluído

Exemplo: pacote `react`:
http://www.npmjs.com/package/react

- O ícone ao lado do nome do pacote indica se já tem TS incluído (ícone _azul_) ou não (ícone **branco**, com a dica de tela informando o que fazer para instalar)

### Alterar as extensões dos arquivos

- `pages/_app.tsx`
- `pages/index.tsx`

### Iniciar o servidor

```bash
yarn dev
```

#### Serão criados automaticamente os arquivos

- `next-env.d.ts`
- `tsconfig.json`

# 3. Conceitos do Next.js

## 3.1. Arquivo principal

O arquivo `_app.ts` "é a aplicação"

- Tudo roda "dentro" dele
- É recarregado/reexecutado toda vez que o usuário troca de página
- Para carregar arquivos externos, por exemplo, uma _fonte externa_, é necessário criar um outro arquivo: `pages/_document.tsx`, que será carregado apenas uma única vez durante a execução da aplicação

## 3.2. Localização das páginas

A pasta `pages` é obrigatória (não pode ser renomeada) e deve obrigatoriamente ficar na raiz do projeto, ou dentro de `src`

## 3.3. _File System Routing_

- Qualquer arquivo dentro da pasta `pages` adiciona automaticamente uma rota para aquela página
  - Exemplo: `pages/products.tsx` pode ser acessado no browser com `http://localhost:3000/products`

## 3.4. Extra: Tornar variáveis públicas no Next

- O nome da variável deve começar com `NEXT_PUBLIC_`
  - Exemplo: `NEXT_PUBLIC_MY_PUBLIC_KEY`

# 4. Aspectos visuais

## 4.1. Estilização

- Arquivos para CSS "de domínio limitado" (`scoped`) devem ser nomeados no padrão `<nome>.module.css`
  - _Exceção_: Arquivo de CSS global deve ter o nome `global.css`
- Estilização deve sempre partir de uma classe (Exemplo: `.title`)

### Instalação do SASS

```bash
yarn add sass
```

- A extensão dos arquivos de estilos deve ser `.scss`

### React Icons

```bash
yarn add react-icons
```

### _Extra:_ Chakra UI Design System

https://chakra-ui.com/

# 5. Plataforma para pagamentos: **Stripe**

https://stripe.com/br

## 5.1. Preparação

### No VSCode

- Criar no projeto o arquivo `.env.local`

### No Stripe

- Cadastrar e criar conta `ignews`
- Criar um _Produto_ de teste e guardar o `id da API`
- `Desenvolvedores` > `Chaves da API` > Revelar e copiar **chave secreta**

### No VSCode

- Criar no arquivo `.env.local` as variáveis de ambiente
  - `STRIPE_API_KEY`, para armazenar o valor da chave secreta
  - `STRIPE_PRODUCT_SUBSCRIPTION_ID`, para armazenar o valor do id da API

### Instalação

```bash
yarn add stripe
yarn add @types/stripe -D

yarn add @stripe/stripe-js
```

# 6. Acesso à API

## 6.1. Tipos de acesso à API

#### Server Side Rendering (SSR)

- _Exemplo_: consumo da API do Stripe, para exibir o preço cadastrado no serviço, com a função `getServerSideProps`
  - **Aplicação**: páginas com necessidade de atualização constante de informação

#### Static Site Generation (SSG)

- _Exemplo_: consumo da API do Stripe, para exibir o preço cadastrado no serviço, com a função `getStaticProps`
  - **Aplicação**: páginas com pouca necessidade de atualização de informação, mas com volume alto de acessos

#### Client Side

- Método _tradicional_, com o processamento feito no **browser**
- _Exemplo_: comentários em um post do blog, que não precisam ser arregados exatamente quando a página é carregada

### Biblioteca para acesso à API - **Axios**

```bash
yarn add axios
```
