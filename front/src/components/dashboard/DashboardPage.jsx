import React from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';

const DashboardShell = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.section`
  width: 100%;
  max-width: 960px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
`;

const LogoutButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.25rem;
  background: #e2e8f0;
  color: #0f172a;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: #cbd5e1;
  }
`;

const Text = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.6;
`;

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <DashboardShell>
      <Card>
        <Header>
          <Title>Dashboard</Title>
          <LogoutButton type="button" onClick={logout}>
            Cerrar sesión
          </LogoutButton>
        </Header>
        <Text>
          Bienvenido{user?.nombre ? `, ${user.nombre}` : ''}. Aquí puedes cargar el contenido real del dashboard.
        </Text>
      </Card>
    </DashboardShell>
  );
}
