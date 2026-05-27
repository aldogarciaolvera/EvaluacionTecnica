import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Plus, MoreVertical } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import apiClient from '../../api/apiClient';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockAmount, setStockAmount] = useState(1);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: 1 });

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

  useEffect(() => { fetchProducts(); }, []);

  const handleToggleStatus = async (product) => {
    try {
      setSaving(true);
      const endpoint = product.id_estatus === 1 ? '/api/productos/desactivar_producto/' : '/api/productos/activar_producto/';
      await apiClient.put(`${endpoint}${product.id_producto}`);
      await fetchProducts();
    } catch (err) {
      alert('No se pudo actualizar el estado del producto.');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenStockModal = (product) => {
    setSelectedProduct(product);
    setStockAmount(1);
    setShowStockModal(true);
  };

  const handleIncreaseStock = async () => {
    if (!selectedProduct || stockAmount <= 0) {
      alert('Ingresa una cantidad válida mayor que cero.');
      return;
    }

    try {
      setSaving(true);
      await apiClient.put(`/api/productos/incrementar_stock/${selectedProduct.id_producto}`, {
        cantidad: stockAmount,
      });
      setShowStockModal(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (err) {
      alert('No se pudo aumentar el stock.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      title="Inventario Principal"
      activeItem="Inventario"
      action={<Boton icon={Plus} onClick={() => setShowAdd(true)}>Añadir Producto</Boton>}
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
          <div>Opciones</div>
        </TableHeader>

        {isLoading && (
          <TableMessage>Cargando productos...</TableMessage>
        )}

        {error && (
          <TableMessage $error>{error}</TableMessage>
        )}

        {!isLoading && !error && products.length === 0 && (
          <TableMessage>No se encontraron productos.</TableMessage>
        )}

        {!isLoading && !error && products.map((product) => (
          <TableRow key={product.id_producto}>
            <ProductCell>
              <ProductThumb />
              <div>{product.nombre}</div>
            </ProductCell>
            <SkuTag>{product.id_producto}</SkuTag>
            <div>{product.descripcion}</div>
            <div>{product.stock} unidades</div>
            <div>{product.precio != null ? `$${Number(product.precio).toFixed(2)}` : '-'}</div>
            <StatusPill $variant={product.id_estatus === 1 ? 'active' : 'inactive'}>
              {product.id_estatus === 1 ? 'Activo' : 'Inactivo'}
            </StatusPill>
            <ActionsCell>
              <OptionsButton
                type="button"
                onClick={() => setOpenMenuId(openMenuId === product.id_producto ? null : product.id_producto)}
              >
                <MoreVertical size={18} />
              </OptionsButton>
              {openMenuId === product.id_producto && (
                <RowMenu>
                  <MenuItem
                    onClick={() => {
                      setOpenMenuId(null);
                      handleToggleStatus(product);
                    }}
                  >
                    {product.id_estatus === 1 ? 'Desactivar' : 'Activar'}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenMenuId(null);
                      handleOpenStockModal(product);
                    }}
                  >
                    Aumentar stock
                  </MenuItem>
                </RowMenu>
              )}
            </ActionsCell>
          </TableRow>
        ))}
      </TableCard>

      {showAdd && (
        <Modal title="Agregar Producto">
          <div style={{ display: 'grid', gap: 12 }}>
            <Input label="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
            <Input label="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
            <Input label="Precio" type="number" min={0.01} step={0.01} value={form.precio} onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Boton variant="outline" onClick={() => setShowAdd(false)}>Cancelar</Boton>
            <Boton onClick={async () => {
              setAdding(true);
              try {
                await apiClient.post('/api/productos/agregar_producto', {
                  nombre: form.nombre,
                  descripcion: form.descripcion,
                  precio: form.precio,
                });
                setShowAdd(false);
                setForm({ nombre: '', descripcion: '', precio: 1 });
                await fetchProducts();
              } catch (e) {
                alert('Error al agregar producto');
              } finally {
                setAdding(false);
              }
            }}>{adding ? 'Guardando...' : 'Agregar'}</Boton>
          </div>
        </Modal>
      )}

      {showStockModal && selectedProduct && (
        <Modal title={`Aumentar stock - ${selectedProduct.nombre}`}>
          <div style={{ display: 'grid', gap: 12 }}>
            <Input
              label="Cantidad a agregar"
              type="number"
              min={1}
              value={stockAmount}
              onChange={(e) => setStockAmount(Number(e.target.value))}
            />
            <p style={{ color: '#475569', fontSize: '0.9rem' }}>
              El stock solo puede aumentarse. Ingresa un número mayor que cero.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Boton variant="outline" onClick={() => setShowStockModal(false)}>Cancelar</Boton>
            <Boton onClick={handleIncreaseStock}>{saving ? 'Guardando...' : 'Aumentar'}</Boton>
          </div>
        </Modal>
      )}
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
  overflow-x: auto;
  overflow-y: visible;
  min-height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1.1fr 1.1fr 0.5fr;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  color: ${props => props.theme.textMuted};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;

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
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1fr 0.8fr 1.2fr;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.border};
  align-items: center;
  font-size: 0.9rem;
  overflow: visible;

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

const ActionsCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OptionsButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  background: ${props => props.theme.bgCard};
  color: ${props => props.theme.textMain};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.bgHover};
  }
`;

const RowMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: max-content;
  min-width: 160px;
  background: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
  z-index: 10;
  overflow: hidden;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 0.85rem 1rem;
  color: ${props => props.theme.textMain};
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.theme.bgHover};
  }
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