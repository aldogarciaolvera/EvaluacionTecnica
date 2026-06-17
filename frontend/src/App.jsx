import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { lightTheme, darkTheme } from './theme/theme';
import LoginPage from './components/login/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import SalidasPage from './components/salidas/SalidasPage';
import HistorialPage from './components/historial/HistorialPage';
import { useNavigate } from 'react-router-dom';
import { initIdleTimer, stopIdleTimer, resetIdleTimer } from './utils/idle';
import Modal from './components/ui/Modal';
import Boton from './components/ui/Boton';

function App() {
  const { theme } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const userRole = user?.rol;

  // Idle handler: if user is authenticated we start the idle timer and logout on timeout
  // We need a nested component to use navigation hooks inside Router
  function IdleHandler() {
    const navigate = useNavigate();
    const auth = useAuthStore();
    const [showWarn, setShowWarn] = React.useState(false);

    useEffect(() => {
      if (isAuthenticated) {
        initIdleTimer({
          timeout: 30 * 60 * 1000,
          warnBefore: 5 * 60 * 1000,
          onWarn: () => setShowWarn(true),
          onTimeout: () => {
            setShowWarn(false);
            auth.logout();
            navigate('/login', { replace: true });
          }
        });
      } else {
        stopIdleTimer();
      }

      return () => stopIdleTimer();
    }, [isAuthenticated]);

    return (
      showWarn ? (
        <Modal title="Inactividad detectada">
          <p>Has estado inactivo. Tu sesión se cerrará en 5 minutos. ¿Quieres continuar?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Boton variant="outline" onClick={() => { setShowWarn(false); auth.logout(); navigate('/login', { replace: true }); }}>Cerrar sesión</Boton>
            <Boton onClick={() => { resetIdleTimer(); setShowWarn(false); }}>Continuar sesión</Boton>
          </div>
        </Modal>
      ) : null
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <IdleHandler />
        <AppShell>
          <RoutesContainer>
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
              />
              <Route
                path="/dashboard"
                element={isAuthenticated && userRole === 1 ? <DashboardPage /> : <Navigate to={isAuthenticated ? (userRole === 2 ? '/salidas' : '/login') : '/login'} replace />}
              />
              <Route
                path="/salidas"
                element={isAuthenticated && userRole === 2 ? <SalidasPage /> : <Navigate to={isAuthenticated ? (userRole === 1 ? '/dashboard' : '/login') : '/login'} replace />}
              />
              <Route
                path="/historial"
                element={isAuthenticated && userRole === 1 ? <HistorialPage /> : <Navigate to={isAuthenticated ? (userRole === 2 ? '/salidas' : '/login') : '/login'} replace />}
              />
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? (userRole === 2 ? '/salidas' : '/dashboard') : '/login'} replace />}
              />
            </Routes>
          </RoutesContainer>
        </AppShell>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

const AppShell = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bgPage};
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const RoutesContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
  }

  body {
    background: #ffffff;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    color: ${props => props.theme.textMain};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;