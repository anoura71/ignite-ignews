import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    // Busca o usuário pelo email no FaunaDB
    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
    );

    // Verifica se o cliente já fez a assinatura do serviço
    let customerId = user.data.stripe_customer_id;
    if (!customerId) {
      // Cria um novo cliente no Stripe
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata
      });

      // Atualiza o usuário no FaunaDB
      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: process.env.STRIPE_PRODUCT_SUBSCRIPTION_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed.');
};
