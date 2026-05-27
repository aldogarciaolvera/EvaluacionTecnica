import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Plus, MoreVertical } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';
import apiClient from '../../api/apiClient';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('/api/productos/obtener_productos');
        setProducts(response.data || []);
      } catch (err) {
        setError('No se pudieron cargar los productos. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const rows = products.map((product) => ({
    name: product.nombre,
    sku: product.id_producto,
    category: product.descripcion,
    stock: `${product.stock} unidades`,
    price: product.precio != null ? `$${product.precio.toFixed(2)}` : '-',
    status: product.id_estatus === 1 ? 'active' : 'inactive',
  }));

  return (
    <PageShell
      title="Inventario Principal"
      activeItem="Inventario"
      action={<Boton icon={Plus}>Añadir Producto</Boton>}
    >
      <Separador />

      <TableCard>
        <TableHeader>
          <div>Producto</div>
          <div>ID</div>
          <div>Descripción</div>
          <div>Stock</div>
          <div>Precio</div>
          <div>Estado</div>
        </TableHeader>

        {isLoading && (
          <TableMessage>Cargando productos...</TableMessage>
        )}

        {error && (
          <TableMessage $error>{error}</TableMessage>
        )}

        {!isLoading && !error && rows.length === 0 && (
          <TableMessage>No se encontraron productos.</TableMessage>
        )}

        {!isLoading && !error && rows.map((row) => (
          <TableRow key={row.sku}>
            <ProductCell>
              <ProductThumb />
              <div>{row.name}</div>
            </ProductCell>
            <SkuTag>{row.sku}</SkuTag>
            <div>{row.category}</div>
            <div>{row.stock}</div>
            <div>{row.price}</div>
            <StatusPill $variant={row.status}>{row.status}</StatusPill>
          </TableRow>
        ))}
      </TableCard>
    </PageShell>
  );
}

const Separador = styled.div`
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

const TableMessage = styled.div`
  padding: 1.25rem 1.5rem;
  color: ${props => (props.$error ? '#991b1b' : props.theme.textMuted)};
  background: ${props => (props.$error ? '#fee2e2' : '#f8fafc')};
  text-align: center;
  font-size: 0.95rem;
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

    > * {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
      font-size: 0.95rem;
    }

    > *:nth-child(1):before { content: 'Producto'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > *:nth-child(2):before { content: 'ID'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > *:nth-child(3):before { content: 'Descripción'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > *:nth-child(4):before { content: 'Stock'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > *:nth-child(5):before { content: 'Precio'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
    > *:nth-child(6):before { content: 'Estado'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
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