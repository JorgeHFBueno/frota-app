// src/componentes/Menu.jsx
'use client'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Menu() {
  const { data: session } = useSession()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link href="/" className="navbar-brand">
          Frota App
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>

            {/* dropdown visível para todos */}
            <NavDropdown title="Atividades" id="atividades-dropdown">
              <NavDropdown.Item as={Link} href="/privado/atividades/geral">
                Geral
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/privado/atividades/meus-registros">
                Meus Registros
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/privado/atividades/registrar">
                Registrar
              </NavDropdown.Item>
              <NavDropdown title="Caminhões" id="caminhoes-dropdown">
                <NavDropdown.Item as={Link} href="/privado/caminhoes">
                  Lista
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/privado/caminhoes/registrar">
                  Registrar
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>

            <Link href="/sobre" className="nav-link">
              Sobre
            </Link>
          </Nav>
        </Navbar.Collapse>

        {/* Login opcional */}
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title={session ? `Autenticado: ${session.user.name}` : 'Login'}
            id="auth-dropdown"
          >
            {!session && (
              <NavDropdown.Item as={Link} href="/login">
                Login
              </NavDropdown.Item>
            )}
            {session && (
              <>
                <NavDropdown.Item as={Link} href="/privado/usuarios">
                  Meus Dados
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Logout
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
