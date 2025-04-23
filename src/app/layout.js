import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from '@/componentes/Menu';
import NextAuthProvider from './providers/NextAuthProvider';

export const metadata = {
  title: 'Frota App',
  description: 'Gerência de frota de caminhões'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <NextAuthProvider>
          <Menu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}