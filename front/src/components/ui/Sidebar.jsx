import React from 'react';
import styled from 'styled-components';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import BotonTheme from './BotonTheme';

export const Sidebar = ({ items = [], activeItem, onItemClick }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const userName = user?.nombre || user?.email || 'Usuario';
  const userRole = user?.rol ? ` (${user.rol === 1 ? 'Admin' : 'Almacenista'})` : '';
  const displayName = `${userName}${userRole}`;
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <HeaderTop>
          <Titulo>Inventario PRO</Titulo>
          <BotonTheme inline />
        </HeaderTop>

        <UserSection ref={containerRef}>
          <UserButton onClick={() => setMenuOpen((open) => !open)}>
            <User size={18} />
            <UserName>{displayName}</UserName>
          </UserButton>
          {menuOpen && (
            <UserDropdown>
              <LogoutItem onClick={handleLogout}>Cerrar sesión</LogoutItem>
            </UserDropdown>
          )}
        </UserSection>
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

const UserSection = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  background: transparent;
  color: ${props => props.theme.textMain};
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  border-radius: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.bgHover};
  }
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 180px;
  background: ${props => props.theme.bgCard};
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.12);
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  margin-top: -0.5rem;
  z-index: 20;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: ${props => props.theme.textMain};
  text-align: left;
  padding: 0.85rem 1rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.bgHover};
  }
`;

const LogoutItem = styled(DropdownItem)`
  color: #dc2626;
  font-weight: 700;

  &:hover {
    background: rgba(220, 38, 38, 0.08);
  }
`;

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

  @media (max-width: 768px) {
    width: 100%;
    min-height: 100%;
    position: relative;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Titulo = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 ;
  color: ${props => props.theme.primary};
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