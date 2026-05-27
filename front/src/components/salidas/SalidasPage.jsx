import React from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';
import PageCard from '../ui/PageCard';

export default function SalidasPage() {
  const products = [
    { name: 'Cojinetes Industriales A3', stock: '450 uds', zone: 'Zona A-12' },
    { name: 'Motor Servo 24V DC', stock: '12 uds', zone: 'Zona B-02', status: 'Critico' },
    { name: 'Conectores Fibra LC', stock: '1,200 uds', zone: 'Zona C-04' },
    { name: 'Panel LED 60x60', stock: '84 uds', zone: 'Zona B-02' }
  ];

  return (
    <PageShell
      title="Modulo de Salidas"
      subtitle="Seleccione los productos para registrar la orden de salida."
      activeItem="Salidas"
      action={<Boton icon={Plus}>Nueva Salida</Boton>}
    >
      <SummaryGrid>
        <SummaryCard>
          <CardLabel>Items disponibles</CardLabel>
          <CardValue>1,284 SKU</CardValue>
        </SummaryCard>
        <SummaryCard>
          <CardLabel>Pendiente envio</CardLabel>
          <CardValue>24 Ordenes</CardValue>
        </SummaryCard>
        <SummaryCard>
          <CardLabel>Capacidad almacen</CardLabel>
          <CardValue $highlight>84%</CardValue>
        </SummaryCard>
      </SummaryGrid>

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.name}>
            <ProductImage />
            <ProductBody>
              <ProductName>{product.name}</ProductName>
              <ProductMeta>
                <span>Stock actual</span>
                <strong>{product.stock}</strong>
              </ProductMeta>
              <ProductFooter>
                <ZoneTag>{product.zone}</ZoneTag>
                {product.status ? <StatusTag>{product.status}</StatusTag> : null}
              </ProductFooter>
            </ProductBody>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageShell>
  );
}

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryCard = styled(PageCard)`
  padding: 1rem 1.25rem;
`;

const CardLabel = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.textMuted};
  font-size: 0.85rem;
`;

const CardValue = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: ${props => (props.$highlight ? props.theme.primary : props.theme.textMain)};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled(PageCard)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.div`
  height: 140px;
  background: ${props => props.theme.bgHover};
`;

const ProductBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${props => props.theme.textMain};
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.textMuted};
  font-size: 0.85rem;
`;

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ZoneTag = styled.span`
  background: ${props => props.theme.primaryLight};
  color: ${props => props.theme.primaryText};
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const StatusTag = styled.span`
  background: ${props => props.theme.errorBg};
  color: ${props => props.theme.error};
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
`;
