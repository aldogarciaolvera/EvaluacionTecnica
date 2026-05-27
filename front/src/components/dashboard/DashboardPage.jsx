import React from 'react';
import styled from 'styled-components';
import { Plus, MoreVertical } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';

export default function DashboardPage() {
  const rows = [
    { name: 'Precision Actuator X-500', sku: 'PA-500-RED-01', category: 'Electronics / High-Val', stock: '482 units', status: 'active' },
    { name: 'Titanium Fastener Kit', sku: 'TF-KIT-44', category: 'Hardware / Aerospace', stock: '12 units', status: 'reserved' },
    { name: 'Li-Ion Storage Module', sku: 'BATT-MOD-9X', category: 'Power Systems', stock: '1,024 units', status: 'active' },
    { name: 'Fiber Optic Cable Reel', sku: 'CBL-FIB-100', category: 'Connectivity', stock: '250 units', status: 'inactive' }
  ];

  return (
    <PageShell
      title="Inventario Principal"
      activeItem="Inventario"
      action={<Boton icon={Plus}>Añadir Producto</Boton>}
    >
      <TabRow>
        <Tabs>
          <Tab $active>Activos (1,284)</Tab>
          <Tab>Inactivos (42)</Tab>
        </Tabs>
        <TabActions>
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
    </PageShell>
  );
}



const TabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.border};
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
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

  @media (max-width: 768px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

const TableCard = styled.div`
  background: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  overflow: hidden;
  overflow-x: auto;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1fr 0.5fr;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.border};
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 0.75rem;
    border-radius: 14px;
    margin: 0.75rem;
    background: ${props => props.theme.bgPage};
    border: 1px solid ${props => props.theme.border};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
      font-size: 0.95rem;
    }

    > div:nth-child(1):before { content: 'Producto'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > div:nth-child(2):before { content: 'SKU'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > div:nth-child(3):before { content: 'Categoria'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > div:nth-child(4):before { content: 'Stock'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > div:nth-child(5):before { content: 'Estado'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > div:nth-child(6):before { content: 'Acciones'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
  }
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const PaginationNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => (props.$active ? props.theme.primary : '#ffffff')};
  color: ${props => (props.$active ? '#ffffff' : props.theme.textMain)};
  cursor: pointer;

  @media (max-width: 768px) {
    min-width: 42px;
  }
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