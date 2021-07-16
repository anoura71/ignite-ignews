import { render } from '@testing-library/react';

import { ActiveLink } from '.';

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

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    // Exibe o HTML gerado
    debug();

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('adds active class if the link is currently active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toHaveClass('active');
  });
});
