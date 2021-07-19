# 1. Estratégias de deploy

- SPA (create-react-app)\
  https://create-react-app.dev/docs/deployment

  - Firebase
  - **Netlify** (++)
    - https://www.netlify.com/with/nextjs
  - Guithub Pages
  - CDN (Amazon S3) (+)
    - https://www.youtube.com/watch?v=SrY8qV6UJ1M
  - **Vercel** (++)
  - ...

- Next.js\
  - _Self hosting_ (-)
  - **Vercel** (++)
  - AWS Amplify
  - Serverless component (AWS) (+)
    - https://www.serverless.com/plugins/serverless-nextjs-plugin
  - Terraform Next.js (AWS)
    - https://github.com/dealmore/terraform-aws-next-js

(++) Serviço muito recomendado\
(+) Serviço recomendado\
(-) Serviço não recomendado

# 2. Deploy de uma aplicação SPA tradicional

```bash
yarn create react-app cranetlify --template typescript
```

# 3. Publicação na Vercel

## 3.1. Vercel CLI

https://vercel.com/cli

### 3.1.1. Instalação

```bash
yarn global add vercel@latest
```

### 3.1.2. Execução

```bash
vercel login

vercel
```
