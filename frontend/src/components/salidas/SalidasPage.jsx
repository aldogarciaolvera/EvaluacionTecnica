import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MoreVertical } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import apiClient from '../../api/apiClient';
import { useAuthStore } from '../../store/useAuthStore';

export default function SalidasPage() {
  const user = useAuthStore((state) => state.user);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showSalidaModal, setShowSalidaModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [salidaCantidad, setSalidaCantidad] = useState(1);
  const [formError, setFormError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get('/api/productos/obtener_productos');
      const activeProducts = (response.data || []).filter(product => product.id_estatus === 1);
      setProducts(activeProducts);
    } catch (err) {
      setError('No se pudo cargar la lista de productos. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenMenu = (productId) => {
    setOpenMenuId(openMenuId === productId ? null : productId);
  };

  const handleOpenSalida = (product) => {
    setSelectedProduct(product);
    setSalidaCantidad(1);
    setFormError(null);
    setShowSalidaModal(true);
    setOpenMenuId(null);
  };

  const handleSubmitSalida = async () => {
    if (!selectedProduct) return;

    if (salidaCantidad <= 0) {
      setFormError('La cantidad debe ser mayor que cero.');
      return;
    }

    if (salidaCantidad > selectedProduct.stock) {
      setFormError('No puede salir más cantidad que el stock disponible.');
      return;
    }

    setProcessing(true);
    setFormError(null);

    try {
      await apiClient.put(`/api/productos/salida_producto/${selectedProduct.id_producto}`, {
        cantidad: salidaCantidad,
      });
      setShowSalidaModal(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (err) {
      const message = err.response?.data?.detail || 'No se pudo registrar la salida.';
      setFormError(message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <PageShell
      title="Modulo de Salidas"
      subtitle="Seleccione los productos para registrar la orden de salida."
      activeItem="Salidas"
    >
      <Separador/>

      <TableCard>
        <TableHeader>
          <div>Producto</div>
          <div>ID</div>
          <div>Descripción</div>
          <div>Stock</div>
          <div>Precio</div>
          <div>Opciones</div>
        </TableHeader>

        {isLoading && <TableMessage>Cargando productos activos...</TableMessage>}
        {error && <TableMessage $error>{error}</TableMessage>}
        {!isLoading && !error && products.length === 0 && (
          <TableMessage>No hay productos activos para salida.</TableMessage>
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
            <ActionsCell>
              <OptionsButton
                type="button"
                onClick={() => handleOpenMenu(product.id_producto)}
              >
                <MoreVertical size={18} />
              </OptionsButton>
              {openMenuId === product.id_producto && (
                <RowMenu>
                  <MenuItem onClick={() => handleOpenSalida(product)}>
                    Salida de producto
                  </MenuItem>
                </RowMenu>
              )}
            </ActionsCell>
          </TableRow>
        ))}
      </TableCard>

      {showSalidaModal && selectedProduct && (
        <Modal title={`Salida de producto - ${selectedProduct.nombre}`}>
          <div style={{ display: 'grid', gap: 12 }}>
            <Input label="Producto" value={selectedProduct.nombre} readOnly />
            <Input label="ID" value={selectedProduct.id_producto} readOnly />
            <Input label="Descripción" value={selectedProduct.descripcion || '-'} readOnly />
            <Input
              label="Stock disponible"
              value={`${selectedProduct.stock} unidades`}
              readOnly
            />
            <Input
              label="Cantidad a salir"
              type="number"
              min={1}
              value={salidaCantidad}
              onChange={(e) => setSalidaCantidad(Number(e.target.value))}
            />
            {formError && <ErrorText>{formError}</ErrorText>}
          </div>
          <ModalActions>
            <Boton variant="outline" onClick={() => setShowSalidaModal(false)}>Cancelar</Boton>
            <Boton onClick={handleSubmitSalida} disabled={processing}>
              {processing ? 'Registrando...' : 'Registrar salida'}
            </Boton>
          </ModalActions>
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
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1.6fr 0.5fr;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.bgCard};
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
  grid-template-columns: 2fr 1fr 1.3fr 1fr 1fr 1.2fr;
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
    > *:nth-child(6):before { content: 'Opciones'; display: block; color: ${props => props.theme.textMuted}; font-size: 0.75rem; margin-bottom: 0.35rem; }
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
  min-width: 180px;
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

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 12px;
`;

const ErrorText = styled.div`
  color: #b91c1c;
  font-size: 0.9rem;
  min-height: 1.2rem;
`;
