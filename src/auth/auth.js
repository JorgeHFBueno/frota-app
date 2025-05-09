import CredentialsProvider from "next-auth/providers/credentials"
//import { autenticaUsuarioDB } from "@/bd/useCases/usuarioUseCases"

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1800, // 30 minutos
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const usuario = await autenticaUsuarioDB(credentials)
        if (!usuario) return null
        return { id: usuario.email, email: usuario.email, name: usuario.nome, tipo: usuario.tipo }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.tipo = token.tipo
      session.user.id = token.id
      session.user.randomKey = token.randomKey
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.tipo = user.tipo
        token.id = user.id
        token.randomKey = user.randomKey
      }
      return token
    },
  },
}
