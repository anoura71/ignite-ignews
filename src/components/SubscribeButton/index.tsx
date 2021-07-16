import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      // Se não estiver logado, direciona para o login com o GitHub
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      // Usuário já tem uma assinatura ativa, redireciona para a listagem de posts
      router.push('/posts');
      return;
    }

    // Usuário está logado
    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      // Redireciona para informar o pagamento
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
