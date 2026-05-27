import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { sidebarItems } from './sidebarItems';

export default function PageShell({ title, subtitle, action, activeItem, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    setIsSidebarOpen(false);
  };

  return (
    <MainLayout>
      <SidebarOverlay $open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <SidebarPanel $open={isSidebarOpen}>
        <Sidebar
          items={sidebarItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      </SidebarPanel>

      <ContentArea>
        <TopBar>
          <MenuButton onClick={() => setIsSidebarOpen(open => !open)} aria-label="Toggle sidebar">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </MenuButton>
          <HeaderContent>
            <HeaderInfo>
              <PageTitle>{title}</PageTitle>
              {subtitle ? <PageSubtitle>{subtitle}</PageSubtitle> : null}
            </HeaderInfo>
            {action ? <HeaderAction>{action}</HeaderAction> : null}
          </HeaderContent>
        </TopBar>
        <MainContent>
          {children}
        </MainContent>
      </ContentArea>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPage};
`;

const SidebarOverlay = styled.div`
  display: ${props => (props.$open ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 30;
`;

const SidebarPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  transform: translateX(${props => (props.$open ? '0' : '-100%')});
  transition: transform 0.3s ease;
  z-index: 40;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem 0;
  gap: 1.25rem;
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  margin-top: 0.25rem;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.bgCard};
  color: ${props => props.theme.textMain};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const HeaderInfo = styled.div`
  min-width: 0;
`;

const HeaderAction = styled.div`
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 1.85rem;
  font-weight: 800;
  margin: 0 0 0.5rem 1rem;
  color: ${props => props.theme.textTitle};
`;

const PageSubtitle = styled.p`
  margin: 0 0 0 1rem;
  color: ${props => props.theme.textMuted};
`;

const MainContent = styled.main`
  padding: 1rem 2rem 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
