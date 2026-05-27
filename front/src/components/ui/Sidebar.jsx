import React from 'react';
import styled from 'styled-components';
import { Search, Bell, HelpCircle, User } from 'lucide-react';
import BotonTheme from './BotonTheme';

export const Sidebar = ({ items = [], activeItem, onItemClick }) => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <HeaderTop>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Inventario PRO</h2>
          <BotonTheme inline />
        </HeaderTop>
        
        <Actions>
          <IconButton><User size={18} /></IconButton>
        </Actions>
      </SidebarHeader>
      
      <SidebarNav>
        {items.map(item => (
          <NavItem
            key={item.label}
            $active={activeItem === item.label}
            onClick={() => onItemClick?.(item)}
          >
            {item.icon && <item.icon size={20} />}
            {item.label}
          </NavItem>
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: ${props => props.theme.bgSidebar || '#f8fafc'};
  border-right: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.textMuted};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover { color: ${props => props.theme.primary}; }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0.5rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: ${props => props.$active ? props.theme.primary : props.theme.textMuted};
  background-color: ${props => props.$active ? props.theme.primaryLight : 'transparent'};
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 0.25rem;

  &:hover {
    background-color: ${props => props.$active ? props.theme.primaryLight : props.theme.bgHover};
  }
`;