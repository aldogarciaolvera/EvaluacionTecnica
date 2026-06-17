import React from 'react';
import styled from 'styled-components';

export const Input = ({ label, icon: Icon, rightElement, ...props }) => {
  return (
    <Container>
      <Label>
        {label && <LabelTitulo>{label}</LabelTitulo>}
      </Label>
      <ContainerInput>
        {Icon && (
          <ContainerIcon>
            <Icon size={18} />
          </ContainerIcon>
        )}
        <StyledInput $hasIcon={!!Icon} {...props} />
        {rightElement && <ElementoDerecha>{rightElement}</ElementoDerecha>}
      </ContainerInput>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelTitulo = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.theme.textMuted};
`;

const ContainerInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: ${props => props.$hasIcon ? '2.5rem' : '1rem'};
  background-color: ${props => props.theme.bgInput};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.radiusMd || '8px'};
  color: ${props => props.theme.textMain};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.textLight};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
`;

const ContainerIcon = styled.div`
  position: absolute;
  left: 0.875rem;
  color: ${props => props.theme.textLight};
  display: flex;
  align-items: center;
`;

const ElementoDerecha = styled.div`
  position: absolute;
  right: 0.875rem;
  display: flex;
  align-items: center;
`;