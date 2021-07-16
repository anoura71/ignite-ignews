import { query as q } from 'faunadb';

import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  // Busca o usuário no BD, através do customerId
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  );

  // Grava os dados de assinatura no BD
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  // Seleciona somente alguns dados da assinatura para gravar
  const subscriptionData = {
    id: subscriptionId,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };
  if (createAction) {
    // Se for uma ação de criação de nova assinatura
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    );
  } else {
    // Assinatura já existe, realiza uma atualização
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscription.id))
        ),
        { data: subscriptionData }
      )
    );
  }
}
