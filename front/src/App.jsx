import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { lightTheme, darkTheme } from './theme/theme';
import LoginPage from './components/login/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import SalidasPage from './components/salidas/SalidasPage';
import HistorialPage from './components/historial/HistorialPage';

function App() {
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <AppShell>
          <RoutesContainer>
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
              />
              <Route
                path="/dashboard"
                element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/salidas"
                element={isAuthenticated ? <SalidasPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/historial"
                element={isAuthenticated ? <HistorialPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
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