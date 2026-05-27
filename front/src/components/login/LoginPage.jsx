import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Lock, Eye, EyeOff, LogIn, Shield, Package, Headphones } from 'lucide-react';
import Boton from '../ui/Boton';
import Input from '../ui/Input';
import SelectorRol from '../ui/SelectorRol';

export const LoginPage = () => {
  const [role, setRole] = useState('Administrador');
  const [showPwd, setShowPwd] = useState(false);

  const roleOptions = [
    { label: 'Administrador', value: 'Administrador', icon: Shield },
    { label: 'Almacenista', value: 'Almacenista', icon: Package }
  ];

  return (
    <Card>
      <Header>
        <Titulo>Inventario PRO</Titulo>
        <Subtitulo>Control de Inventario</Subtitulo>
      </Header>
      
      <Formulario>
        <SelectorRol 
          label="Escoge tu Rol de Acceso"
          options={roleOptions}
          value={role}
          onChange={setRole}
        />

        <Input 
          label="Correo"
          placeholder="test@test.com"
          icon={User}
        />

        <Input 
          label="Security Password"
          type={showPwd ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          rightElement={
            <button 
              type="button" 
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <Boton icon={LogIn}>
          Iniciar Sesión
        </Boton>
      </Formulario>
    </Card>
  );
};

export default LoginPage;

const Card = styled.div`
  background-color: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1rem;
  text-align: center;
`;

const Titulo = styled.h1`
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => props.theme.textTitle};
  margin-bottom: 0.25rem;
`;

const Subtitulo = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.textMuted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Formulario = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ForgotLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;
