import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    // se token existe, acesso permitido; senão, redireciona para /login
    authorized({ token }) {
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/privado/:path*"],   // um único matcher já cobre /privado/ e sub-rotas
};