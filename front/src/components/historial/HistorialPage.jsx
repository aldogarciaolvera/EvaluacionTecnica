import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Download } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';
import PageCard from '../ui/PageCard';
import apiClient from '../../api/apiClient';

const FILTERS = [
  { key: 'ALL', label: 'Todos' },
  { key: 'ENTRADA', label: 'Entradas' },
  { key: 'SALIDA', label: 'Salidas' }
];

export default function HistorialPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovimientos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('/api/movimientos/obtener_movimientos');
        setMovimientos(response.data || []);
      } catch (err) {
        setError('No se pudo cargar el historial. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovimientos();
  }, []);

  const filteredMovimientos = movimientos.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'ENTRADA') return item.tipo_operacion?.toUpperCase() === 'ENTRADA';
    if (filter === 'SALIDA') return item.tipo_operacion?.toUpperCase() === 'SALIDA';
    return true;
  });

  return (
    <PageShell
      title="Historial de Movimientos"
      subtitle="Auditoría de transacciones y cambios de stock."
      activeItem="Historial"
    >
      <TopBar>
        <FiltroGroup>
          {FILTERS.map((option) => (
            <FiltroBoton
              key={option.key}
              $active={filter === option.key}
              onClick={() => setFilter(option.key)}
            >
              {option.label}
            </FiltroBoton>
          ))}
        </FiltroGroup>
      </TopBar>

      <TableCard>
        <TableHeader>
          <div>Tipo de movimiento</div>
          <div>Producto</div>
          <div>Usuario</div>
          <div>Cantidad</div>
          <div>Fecha</div>
        </TableHeader>

        {isLoading && <TableMessage>Cargando movimientos...</TableMessage>}
        {error && <TableMessage $error>{error}</TableMessage>}
        {!isLoading && !error && filteredMovimientos.length === 0 && (
          <TableMessage>No se encontraron movimientos.</TableMessage>
        )}

        {!isLoading && !error && filteredMovimientos.map((row, index) => (
          <TableRow key={`${row.id_historial || row.id_producto || index}-${index}`}>
            <TypeBadge $entrada={row.tipo_operacion?.toUpperCase() === 'ENTRADA'}>
              {row.tipo_operacion || 'N/A'}
            </TypeBadge>
            <div>{row.producto?.nombre || row.producto_nombre || row.id_producto}</div>
            <div>{row.usuario?.nombre || row.usuario_nombre || row.usuario?.correo || row.id_usuario}</div>
            <Quantity $positive={row.tipo_operacion?.toUpperCase() === 'ENTRADA'}>
              {row.tipo_operacion?.toUpperCase() === 'ENTRADA' ? `+${row.cantidad}` : `-${row.cantidad}`}
            </Quantity>
            <div>{row.fecha_operacion ? new Date(row.fecha_operacion).toLocaleString() : '---'}</div>
          </TableRow>
        ))}
      </TableCard>
    </PageShell>
  );
}

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const FiltroGroup = styled.div`
  display: grid;
  margin-left: 4rem;
  align-items: center;
  gap: 0.75rem;
  grid-auto-flow: column;
`;

const FiltroBoton = styled(Boton)`
  padding: 0.5rem 0.95rem;
  font-size: 0.82rem;
  border-radius: 999px;
  border: 1px solid ${props => (props.$active ? props.theme.primary : props.theme.border)};
  background: ${props => (props.$active ? props.theme.primary : props.theme.bgCard)};
  color: ${props => (props.$active ? '#ffffff' : props.theme.textMain)};
  min-width: auto;
  box-shadow: none;

  &:hover {
    background: ${props => props.theme.primaryLight};
    color: ${props => props.theme.textMain};
  }
`;

const TableCard = styled(PageCard)`
  overflow: hidden;

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 0.8fr 1fr;
  padding: 0.75rem 1.25rem;
  background: ${props => props.theme.bgHover};
  color: ${props => props.theme.textMuted};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableMessage = styled.div`
  padding: 1rem 1.25rem;
  color: ${props => (props.$error ? '#991b1b' : props.theme.textMuted)};
  background: ${props => (props.$error ? '#fee2e2' : '#f8fafc')};
  text-align: center;
  font-size: 0.9rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1.5fr 1fr 0.8fr 1fr;
  padding: 0.8rem 1.25rem;
  border-top: 1px solid ${props => props.theme.border};
  align-items: center;
  font-size: 0.88rem;
  color: ${props => props.theme.textMain};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 0.75rem;
    border-radius: 14px;
    margin: 0.75rem;
    background: ${props => props.theme.bgPage};
    border: 1px solid ${props => props.theme.border};
  }
`;

const TypeBadge = styled.div`
  color: ${props => (props.$entrada ? props.theme.success : props.theme.error)};
  border-radius: 999px;
  padding: 0.4rem 2.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  align-items: center;
  justify-content: center;
`;

const Quantity = styled.span`
  color: ${props => (props.$positive ? props.theme.success : props.theme.error)};
  font-weight: 700;
`;
