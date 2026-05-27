import React from 'react';
import styled from 'styled-components';

export const Boton = ({ children, variant = 'primary', icon: Icon, ...props }) => {
  return (
    <BotonStyled $variant={variant} {...props}>
      {children}
      {Icon && <Icon size={18} />}
    </BotonStyled>
  );
};

export default Boton;

const BotonStyled = styled.button`
  background-color: ${props => props.$variant === 'primary' ? props.theme.primaryLight : 'transparent'};
  color: ${props => props.$variant === 'primary' ? '#ffffff' : props.theme.textMain};
  border: ${props => props.$variant === 'outline' ? `1px solid ${props.theme.border}` : 'none'};
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.radiusMd || '8px'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$variant === 'primary' ? props.theme.primary : 'transparent'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;