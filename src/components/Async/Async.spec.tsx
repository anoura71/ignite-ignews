import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Async } from '.';

test('it renders correctly', async () => {
  render(<Async />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText('Hello World')).toBeInTheDocument();

  // Opção 1 para verificar se o botão está na tela - assíncrono
  expect(await screen.findByText('Button')).toBeInTheDocument();

  // Opção 2 para verificar se o botão está na tela - síncrono, erro ao não encontrar
  await waitFor(() => {
    return expect(screen.getByText('Button')).toBeInTheDocument();
  });

  // Opção 3 para verificar se o botão está na tela - síncrono, não acusa erro ao não encontrar
  await waitForElementToBeRemoved(screen.queryByText('Button'));

  // Outros métodos:
  // - getByLabelText
  // - getByPlaceholderText
  // - getByRole
  // - getByTestId
  // - getByTitle
  // ...
});
