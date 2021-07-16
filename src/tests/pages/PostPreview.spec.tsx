import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '01 de julho de 2021',
};

jest.mock('../../services/prismic');

jest.mock('next-auth/client');

jest.mock('next/router');

describe('Post preview page', () => {
  it('renders correctly', () => {
    // Mock para usuário não autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
    expect(screen.getByText('Want to continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post when user is a subscriber', async () => {
    // Mock para usuário autenticado
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false,
    ] as any);

    // Mock para direcionamento de página
    const pushMock = jest.fn();
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('loads initial data', async () => {
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

    const response = await getStaticProps({
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
