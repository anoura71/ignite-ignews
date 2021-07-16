# Back-end no front-end

## 1. API Routes

- Criar a pasta `pages/api`
- Criar um arquivo `users.ts` nessa pasta, por exemplo

```ts
import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Um" },
    { id: 2, name: "Dois" },
    { id: 3, name: "Tres" },
  ];

  return response.json(users);
};
```

- **IMPORTANTE**: funciona também se o arquivo for `pages/api/users/index.ts`
- Acessar no browser <http:/localhost:3000/api/users>

## 2. NextAuth.js

https://next-auth.js.org/

```bash
yarn add next-auth
yarn add @types/next-auth -D
```

https://next-auth.js.org/getting-started/example

- Nas configurações do GitHub, `Developer settings > OAuth Apps > Register a new application`
- **IMPORTANTE**! Sempre reiniciar o servidor após alterar variáveis de ambiente

## 3. Banco de dados para aplicações _serverless_: **FaunaDB**

https://fauna.com/

### 3.1. Configuração do FaunaDB

- Criar conta gratuita
- Criar novo DB
- `Security` > `Keys` > `New Key`
  - Role: `Admin`
    - Pode ser criado um `Custom Role`, na aba `Roles`
  - Key Name: `ignews-next-app`
- Criar nova collection `users`
- Para buscar por campos específicos, criar índices (`Indexes`)
  - Criar índice
    - Name `user_by_email`
    - Terms `data.email`
    - Selecionar `Unique`, já que o email é único para cada usuário

#### Instalação no projeto

```bash
yarn add faunadb
```

#### JWT_AUTO_GENERATED_SIGNING_KEY (algoritmo HS512)

https://next-auth.js.org/warnings#jwt_auto_generated_signing_key

```
yarn add node-jose-tools

yarn jose newkey -s 256 -t oct -a HS512
```

#### Geração da `signing key JWT` usando HS512

https://mkjwk.org/

#### _Extra:_ Geração da `signing key JWT` usando MD5

http://www.md5.cz/

#### _Extra:_ FaunaDB Cheat Sheet

https://docs.fauna.com/fauna/current/api/fql/cheat_sheet

### 3.2. Outras opções:

- [Amazon: **DynamoDB**](https://aws.amazon.com/pt/dynamodb/)
- [Google: **Firebase**](https://firebase.google.com/?hl=pt-br)
- [OpenSource Firebase: **Supabase**](https://supabase.io/)

## 4. Pagamentos com o Stripe

### 4.1. Stripe Checkout Session

https://stripe.com/docs/api/checkout/sessions

### 4.2. Webhooks

https://dashboard.stripe.com/test/webhooks
Exemplo: Definir rota para quando o pagamento for recusado

#### Em desenvolvimento, instalar a `Stripe CLI`

https://github.com/stripe/stripe-cli
https://stripe.com/docs/stripe-cli

- Instalação no Windows (via EXE)
  https://github.com/stripe/stripe-cli/releases/latest

  - Instalar o scoop

  ```bash
  iwr -useb get.scoop.sh | iex
  ```

  - Instalar a CLI do Stripe

  ```bash
  scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git

  scoop install stripe
  ```

  - Executar a CLI do Stripe

  ```bash
  stripe login

  stripe listen --forward-to localhost:3000/api/webhooks
  ```

  - Alternativa: _**Ubuntu terminal**_

  ```bash
  cd /mnt/c/Desenv/Cursos/Rocketseat-Ignite2021/aulas/reactjs/03ab-ignews

  ./stripe listen --forward-to localhost:3000/api/webhooks
  ```

  - Exemplo de cartão para reste: **_4242 4242 4242 4242_** (demais dados podem ter qualquer valor)

## 5. Segurança no Next

- Usar `getServerSideProps` (SSR)
- Usar `getStaticProps` (SSG)
- API Routes (`pages/api/...`)
