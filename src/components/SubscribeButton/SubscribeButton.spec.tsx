import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';

import { render, screen, fireEvent } from '@testing-library/react';

import { SubscribeButton } from '.';

jest.mock('next-auth/client');

jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    // Mock para usuário não autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    // Mock para função de sign in
    const signInMocked = mocked(signIn);

    // Mock para usuário não autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    // "Clica" no botão de sign in
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user has already subscribed', () => {
    // Mock para direcionamento de página
    const pushMock = jest.fn();
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    // Mock para usuário autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'john.doe"email.com' },
        activeSubscription: 'fake-ative-subscription',
        expires: 'fake-expires',
      },
      false,
    ]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    // "Clica" no botão de sign in
    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
