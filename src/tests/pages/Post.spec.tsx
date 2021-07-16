import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '01 de julho de 2021',
};

jest.mock('../../services/prismic');

jest.mock('next-auth/client');

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    // Mock para usuário não autenticado
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post',
      },
    } as any);

    // console.log(JSON.stringify(response));
    expect(response).toEqual(
      // Permite verificar somente algumas das propriedades do objeto
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    );
  });

  it('loads initial data', async () => {
    // Mock para usuário autenticado
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    // Mock para buscar o post no Prismic
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      // O retorno da query é uma Promise
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new post' }],
          content: [{ type: 'paragraph', text: 'Post content' }],
        },
        last_publication_date: '07-01-2021',
      }),
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post',
      },
    } as any);

    // console.log(JSON.stringify(response));
    expect(response).toEqual(
      // Permite verificar somente algumas das propriedades do objeto
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de julho de 2021',
          },
        },
      })
    );
  });
});
