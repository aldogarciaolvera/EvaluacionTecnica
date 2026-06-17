import React from 'react';
import styled from 'styled-components';

export const SelectorRol = ({ options, value, onChange, label }) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Tabs>
        {options.map((opt) => (
          <Tab 
            key={opt.value} 
            $active={value === opt.value}
            onClick={() => onChange(opt.value)}
            type="button"
          >
            {opt.icon && <opt.icon size={16} />}
            {opt.label}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default SelectorRol;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.theme.textMuted};
`;

const Tabs = styled.div`
  display: flex;
  background-color: ${props => props.theme.bgHover};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.radiusMd || '8px'};
  padding: 4px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.6rem;
  border: none;
  border-radius: ${props => `calc(${props.theme.radiusMd || '8px'} - 4px)`};
  background-color: ${props => props.$active ? props.theme.primaryLight : 'transparent'};
  color: ${props => props.$active ? props.theme.primaryText : props.theme.textMuted};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.$active ? props.theme.primaryText : props.theme.textMain};
  }
`;