import { render, screen } from '@testing-library/react';

import { Header } from '.';

// Mock para direcionamento para página Home
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

// Mock para usuário não autenticado
jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
