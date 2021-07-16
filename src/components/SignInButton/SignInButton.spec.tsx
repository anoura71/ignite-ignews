import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';

import { SingInButton } from '.';

jest.mock('next-auth/client');

describe('SingInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    // Mock para usuário não autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SingInButton />);

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    // Mock para usuário autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'john.doe"email.com' },
        expires: 'fake-expires',
      },
      false,
    ]);

    render(<SingInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
