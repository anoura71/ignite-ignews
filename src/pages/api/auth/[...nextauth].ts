import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
// import { session } from 'next-auth/client';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  // jwt: {
  //   signingKey: process.env.JWT_SIGNING_KEY,
  // },
  callbacks: {
    async session(session) {
      try {
        // Verifica se o usuário já tem uma assinatura ativa
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    // eslint-disable-next-line no-unused-vars
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        // Insere usuário no FaunaDB
        await fauna.query(
          q.If(
            // Se o email não estiver cadastrado
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email))
              )
            ),
            // THEN - Cadastrar o usuário
            q.Create(q.Collection('users'), { data: { email } }),
            // ELSE - Buscar os dados do usuário
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
          )
        );
      } catch (error) {
        // Se acontecer algum erro, não permite o login
        return false;
      }

      return true;
    },
  },
});
