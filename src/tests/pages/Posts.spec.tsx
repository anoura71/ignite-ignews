import { mocked } from 'ts-jest/utils';

import { render, screen } from '@testing-library/react';

import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

const posts = [
  {
    slug: 'my-new-post',
    title: 'My New Post',
    excerpt: 'Post excerpt',
    updatedAt: '01 de julho de 2021',
  },
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    // Mock para buscar os posts no Prismic
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      // O retorno da query é uma Promise
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My new post' }],
              content: [{ type: 'paragraph', text: 'Post excerpt' }],
            },
            last_publication_date: '07-01-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    // console.log(JSON.stringify(response));
    expect(response).toEqual(
      // Permite verificar somente algumas das propriedades do objeto
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de julho de 2021',
            },
          ],
        },
      })
    );
  });
});
