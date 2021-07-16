import Prismic from '@prismicio/client';

// eslint-disable-next-line no-undef
export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    // Endereço da aplicação no Prismic
    process.env.PRISMIC_ENDPOINT,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  return prismic;
}
