// import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>
            News about the <span>React</span> world.
          </h1>

          <p>
            Get access to all the publications
            <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

// /** Server Side Rendering. */
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve(process.env.STRIPE_PRODUCT_SUBSCRIPTION_ID, {
//     expand: ['product'],
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100),
//   }

//   return {
//     props: {
//       product,
//     }
//   };
// }

/** Static Site Generation, para economizar na quantidade de acessos à API. */
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(
    process.env.STRIPE_PRODUCT_SUBSCRIPTION_ID,
    {
      expand: ['product'],
    }
  );

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    // Tempo em segundos que a página permanece sem ser reconstruída
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
