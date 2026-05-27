import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export const BotonTheme = ({ inline = false }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <BotonThemeStyled 
      $inline={inline}
      onClick={toggleTheme} 
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} fill="currentColor" />
      ) : (
        <Sun size={20} fill="currentColor" />
      )}
    </BotonThemeStyled>
  );
};

export default BotonTheme;

const BotonThemeStyled = styled.button`
  position: ${props => (props.$inline ? 'static' : 'fixed')};
  top: ${props => (props.$inline ? 'auto' : '1.25rem')};
  right: ${props => (props.$inline ? 'auto' : '1.25rem')};
  background: ${props => props.theme.themeName === 'light' 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(30, 41, 59, 0.7)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textTitle};
  border-radius: 12px;
  width: ${props => (props.$inline ? '36px' : '44px')};
  height: ${props => (props.$inline ? '36px' : '44px')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${props => (props.$inline ? 'auto' : '1000')};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.bgCard};
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.theme.primary};
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }

  svg {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    transform: rotate(15deg);
  }
`;
