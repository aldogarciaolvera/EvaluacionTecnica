import React, { useState } from 'react';
import styled from 'styled-components';
import { LayoutGrid, Users, Truck, History, Plus, Filter, Download, MoreVertical, Menu, X } from 'lucide-react';
import Sidebar from '../ui/Sidebar';
import Boton from '../ui/Boton';

const MainLayout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPage};
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MobileTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem 0;
  gap: 1.25rem;
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

const MainContent = styled.main`
  padding: 1rem 2rem 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.85rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${props => props.theme.textMuted};
`;

const TabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.border};
  margin-bottom: 1.25rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 0.25rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => (props.$active ? props.theme.primary : 'transparent')};
  color: ${props => (props.$active ? props.theme.primary : props.theme.textMuted)};
  font-weight: 600;
  cursor: pointer;
`;

const TabActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textMain};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
`;

const TableCard = styled.div`
  background: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1fr 0.5fr;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  color: ${props => props.theme.textMuted};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1fr 0.5fr;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.border};
  align-items: center;
  font-size: 0.9rem;
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ProductThumb = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #e2e8f0;
`;

const SkuTag = styled.span`
  background: #f1f5f9;
  border-radius: 6px;
  padding: 0.15rem 0.5rem;
  font-size: 0.75rem;
  display: inline-block;
`;

const StatusPill = styled.span`
  background: ${props => props.$variant === 'active' ? '#dcfce7' : props.$variant === 'reserved' ? '#fee2e2' : '#e2e8f0'};
  color: ${props => props.$variant === 'active' ? '#166534' : props.$variant === 'reserved' ? '#991b1b' : '#475569'};
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  color: ${props => props.theme.textMuted};
  font-size: 0.8rem;
`;

const PaginationNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => (props.$active ? props.theme.primary : '#ffffff')};
  color: ${props => (props.$active ? '#ffffff' : props.theme.textMain)};
  cursor: pointer;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadowCard};
`;

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarItems = [
    { label: 'Inventory', icon: LayoutGrid },
    { label: 'Management', icon: Users },
    { label: 'Shipping', icon: Truck },
    { label: 'History', icon: History }
  ];

  const rows = [
    { name: 'Precision Actuator X-500', sku: 'PA-500-RED-01', category: 'Electronics / High-Val', stock: '482 units', status: 'active' },
    { name: 'Titanium Fastener Kit', sku: 'TF-KIT-44', category: 'Hardware / Aerospace', stock: '12 units', status: 'reserved' },
    { name: 'Li-Ion Storage Module', sku: 'BATT-MOD-9X', category: 'Power Systems', stock: '1,024 units', status: 'active' },
    { name: 'Fiber Optic Cable Reel', sku: 'CBL-FIB-100', category: 'Connectivity', stock: '250 units', status: 'inactive' }
  ];

  return (
    <MainLayout>
      <SidebarOverlay $open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <SidebarPanel $open={isSidebarOpen}>
        <Sidebar
          items={sidebarItems}
          activeItem="Inventory"
          onItemClick={() => setIsSidebarOpen(false)}
        />
      </SidebarPanel>
      <ContentArea>
        <MobileTopBar>
          <MenuButton onClick={() => setIsSidebarOpen(open => !open)} aria-label="Toggle sidebar">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </MenuButton>
          <HeaderContent>
            <HeaderInfo>
              <Title>Inventario Principal</Title>
              <Subtitle>Gestion centralizada de existencias y SKUs operativos.</Subtitle>
            </HeaderInfo>
            <div style={{ width: '180px' }}>
              <Boton icon={Plus}>Add Product</Boton>
            </div>
          </HeaderContent>
        </MobileTopBar>
        <MainContent>
          <TabRow>
            <Tabs>
              <Tab $active>Activos (1,284)</Tab>
              <Tab>Inactivos (42)</Tab>
            </Tabs>
            <TabActions>
              <GhostButton><Filter size={16} />Filter</GhostButton>
              <GhostButton><Download size={16} />Export</GhostButton>
            </TabActions>
          </TabRow>

          <TableCard>
            <TableHeader>
              <div>Product Name</div>
              <div>SKU</div>
              <div>Category</div>
              <div>Stock Level</div>
              <div>Status</div>
              <div>Actions</div>
            </TableHeader>
            {rows.map((row) => (
              <TableRow key={row.sku}>
                <ProductCell>
                  <ProductThumb />
                  <div>{row.name}</div>
                </ProductCell>
                <SkuTag>{row.sku}</SkuTag>
                <div>{row.category}</div>
                <div>{row.stock}</div>
                <StatusPill $variant={row.status}>{row.status}</StatusPill>
                <div><MoreVertical size={16} /></div>
              </TableRow>
            ))}
            <Pagination>
              <div>Showing 1 to 4 of 1,284 products</div>
              <PaginationNumbers>
                <PageButton>&lt;</PageButton>
                <PageButton $active>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>3</PageButton>
                <span>...</span>
                <PageButton>321</PageButton>
                <PageButton>&gt;</PageButton>
              </PaginationNumbers>
            </Pagination>
          </TableCard>

          <StatsGrid>
            <StatCard>
              <h4 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Stock Value</h4>
              <p style={{ fontSize: '1.8rem', fontWeight: 800 }}>$1.2M</p>
            </StatCard>
            <StatCard>
              <h4 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Low Stock Alerts</h4>
              <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444' }}>18</p>
            </StatCard>
            <StatCard>
              <h4 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Inventory Accuracy</h4>
              <p style={{ fontSize: '1.8rem', fontWeight: 800 }}>99.8%</p>
            </StatCard>
          </StatsGrid>
        </MainContent>
      </ContentArea>
    </MainLayout>
  );
}
