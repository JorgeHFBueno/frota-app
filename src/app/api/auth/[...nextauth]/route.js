import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: { strategy: 'jwt', maxAge: 1800 },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { email: { label: 'Email' }, senha: { label: 'Senha', type:'password' } },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          }
        );
        if (!res.ok) return null;
        const user = await res.json();          // { id, nome, email }
        return { id: user.id, name: user.nome, email: user.email };
      }
    })
  ],
  pages: { signIn: '/login' }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
