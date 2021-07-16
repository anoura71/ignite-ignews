# JAM Stack

- Javascript
- API
- Markup

## 1. CMS - Content Management System

### 1.1. Exemplos

- Antigos:
  - Wordpress
  - x Drupal
  - x Joomla
  - x Magento (e-commerce)
- Headless CMS: Painel de administração + API HTTP, GraphQL, SDK
  - Gratuitos:
    - Strapi (propósito geral, projetos menores)
    - Ghost (blog)
    - Keystone (propósito geral)
  - Pagos:
    - GraphCMS
    - Prismic CMS (melhor preço)
    - Contentful (projetos maiores)
    - Shopify (e-commerce)
    - Saleor (e-commerce)

### 1.2. Prismic: configuração

https://prismic.io

- Criar o `Custom Type`
- Criar os `Documents` (Posts)
- `Settings` > `API & Security`:
  - `Repository Security` > mudar para `Private API`
  - `Generate an Access Token` : `Application Name`: **ignews Mext.js App**, e confirmar
  - Copiar o `Permanent access token` criado e guardar na aplicação como variável de ambiente

### 1.3. Prismic: API

https://prismic.io/docs
https://prismic.io/docs/technologies/reactjs
https://prismic.io/docs/technologies/home-prismic-and-nextjs
https://prismic.io/docs/technologies/integrating-with-an-existing-project-javascript

```bash
yarn add @prismicio/client
```

### 1.4. Prismic DOM

```bash
yarn add prismic-dom
yarn add @types/prismic-dom -D
```

## 2. Dicas extras

### 2.1. Visualizar objeto completo com `console.log`

```ts
console.log(JSON.stringify(object, null, 2));

// 2 é a indentação
```
