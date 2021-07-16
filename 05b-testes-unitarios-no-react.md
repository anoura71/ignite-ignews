# 1. Preparação do ambiente de testes

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 1.1. Instalar

```bash
yarn add jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest -D
```

## 1.2. Arquivo de configurações do `jest`: `./jest.config.js`

```js
module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
};
```

## 1.3. Criar arquivo de configuração dos testes `./tests/setupTests.ts`

```ts
import '@testing-library/jest-dom/extend-expect';
```

## 1.4. Criar arquivo `./babel.config.js`

```js
module.exports = {
  presets: ['next/babel'],
};
```

# 2. Lidar com arquivos CSS, SCSS, SASS

## 2.1. Instalar

```bash
yarn add identity-obj-proxy -D
```

## 2.2. Editar `./jest.config.js`

```js
module.exports = {
  ...
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
  },
}
```

# 3. Utilitários para o Jest

```bash
yarn add ts-jest -D
```

# 4. `Coverage reports`

https://jestjs.io/pt-BR/docs/configuration#collectcoverage-boolean

https://jestjs.io/pt-BR/docs/configuration#collectcoveragefrom-array

https://jestjs.io/pt-BR/docs/configuration#coveragereporters-arraystring--string-options

## 4.1. Arquivo `./jest.config.js`

```js
module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/**/_app.tsx',
    '!src/**/_document.tsx',
  ],
  coverageReporters: ['lcov', 'json'],
};
```

## 4.2. Relatório

- Executar os testes

```bash
yarn test
```

- Acessar o relatório em `./coverage/lcov-report/index.html`

# 5. Testing playground

https://testing-playground.com/
