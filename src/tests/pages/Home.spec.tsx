import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';

import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');

// Mock para usuário não autenticado
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock('../../services/stripe');

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 9.99 }} />);

    expect(screen.getByText('for 9.99 month')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    // Mock para buscar o preço no Stripe
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);
    // O retorno do Stripe é uma Promise
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 999,
    } as any);

    const response = await getStaticProps({});

    // console.log(response);
    expect(response).toEqual(
      // Permite verificar somente algumas das propriedades do objeto
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$9.99',
          },
        },
      })
    );
  });
});
