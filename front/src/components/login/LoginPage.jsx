import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Lock, Eye, EyeOff, LogIn, Shield, Package, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import apiClient from '../../api/apiClient';
import Boton from '../ui/Boton';
import Input from '../ui/Input';

export const LoginPage = () => {
  const { setAuth, setError, error } = useAuthStore();
  const [role, setRole] = useState('Administrador');
  const [showPwd, setShowPwd] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { label: 'Administrador', value: 'Administrador', icon: Shield },
    { label: 'Almacenista', value: 'Almacenista', icon: Package }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!correo.trim() || !contrasena.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const isAdmin = correo.trim().toLowerCase() === 'admin';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!isAdmin && !emailRegex.test(correo)) {
      setError('Por favor ingresa un correo con formato válido (ejemplo@test.com).');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/login/auth', {
        correo,
        contrasena
      });

      const { usuario, access_token, refresh_token, rol } = response.data;
      const user = {
        nombre: usuario || correo,
        correo,
        rol,
      };

      setAuth(user, access_token, refresh_token);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Header>
        <Titulo>Inventario PRO</Titulo>
        <Subtitulo>Control de Inventario</Subtitulo>
      </Header>
      
      <Formulario onSubmit={handleLogin}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input 
          label="Correo"
          placeholder="test@test.com"
          icon={User}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          noValidate
        />

        <Input 
          label="Contraseña"
          type={showPwd ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          noValidate
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

        <Boton type="submit" icon={isLoading ? null : LogIn} disabled={isLoading}>
          {isLoading ? <LoadingIcon size={20} /> : 'Iniciar Sesión'}
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
  margin: 1.25rem auto;

  @media (max-width: 480px) {
    max-width: 100%;
    margin: 0.75rem;
  }
`;

const Header = styled.div`
  padding: 1rem;
  text-align: center;

  @media (max-width: 480px) {
    padding: 0.9rem;
  }
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

  @media (max-width: 480px) {
    padding: 1.25rem;
    gap: 1rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  border: 1px solid #f87171;
  color: #991b1b;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  text-align: center;
`;

const LoadingIcon = styled(Loader2)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

