import React from 'react';
import styled from 'styled-components';
import { Download, Plus } from 'lucide-react';
import PageShell from '../ui/PageShell';
import Boton from '../ui/Boton';
import PageCard from '../ui/PageCard';

export default function HistorialPage() {
	const rows = [
		{ type: 'Ingreso', sku: 'A923-01', user: 'John Schmidt', qty: '+124', location: 'Zona A-44', status: 'ok' },
		{ type: 'Salida', sku: 'Z110-88', user: 'Maria Lopez', qty: '-45', location: 'Zona B-12', status: 'warn' },
		{ type: 'Transferencia', sku: 'X442-99', user: 'Robert King', qty: '+12', location: 'A10 > C04', status: 'ok' },
		{ type: 'Ajuste', sku: 'F201-21', user: 'System Admin', qty: '-2', location: 'Retornos', status: 'warn' }
	];

	return (
		<PageShell
			title="Historial de Movimientos"
			subtitle="Auditoria de transacciones y cambios de stock."
			activeItem="Historial"
			action={<Boton icon={Plus}>Nuevo Ajuste</Boton>}
		>
			<FiltersCard>
				<FilterGroup>
					<FilterLabel>Rango de fechas</FilterLabel>
					<FilterField>Ultimos 7 dias</FilterField>
				</FilterGroup>
				<FilterGroup>
					<FilterLabel>Tipo de movimiento</FilterLabel>
					<FilterField>Todos</FilterField>
				</FilterGroup>
				<FilterGroup>
					<FilterLabel>Operador</FilterLabel>
					<FilterField>Nombre de usuario</FilterField>
				</FilterGroup>
				<FilterGroup>
					<FilterLabel>SKU</FilterLabel>
					<FilterField>SKU-XXXX-XXX</FilterField>
				</FilterGroup>
				<FilterActions>
					<GhostButton>Limpiar</GhostButton>
					<GhostButton><Download size={16} />Exportar</GhostButton>
				</FilterActions>
			</FiltersCard>

			<TableCard>
				<TableHeader>
					<div>Tipo</div>
					<div>SKU</div>
					<div>Usuario</div>
					<div>Cantidad</div>
					<div>Ubicacion</div>
					<div>Estado</div>
				</TableHeader>
				{rows.map((row, index) => (
					<TableRow key={`${row.sku}-${index}`}>
						<TypeBadge>{row.type}</TypeBadge>
						<div>{row.sku}</div>
						<div>{row.user}</div>
						<Quantity $positive={row.qty.startsWith('+')}>{row.qty}</Quantity>
						<div>{row.location}</div>
						<StatusDot $variant={row.status} />
					</TableRow>
				))}
			</TableCard>
		</PageShell>
	);
}

const FiltersCard = styled(PageCard)`
	padding: 1rem 1.25rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 1rem;
	align-items: end;
	margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const FilterLabel = styled.span`
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${props => props.theme.textMuted};
`;

const FilterField = styled.div`
	border: 1px solid ${props => props.theme.border};
	background: ${props => props.theme.bgInput};
	padding: 0.6rem 0.75rem;
	border-radius: 8px;
	font-size: 0.9rem;
	color: ${props => props.theme.textMain};
`;

const FilterActions = styled.div`
	display: flex;
	gap: 0.75rem;
`;

const GhostButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	background: transparent;
	border: 1px solid ${props => props.theme.border};
	color: ${props => props.theme.textMain};
	padding: 0.6rem 0.85rem;
	border-radius: 8px;
	cursor: pointer;
`;

const TableCard = styled(PageCard)`
	overflow: hidden;
`;

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 1.1fr 1fr 1.2fr 0.9fr 1.2fr 0.6fr;
	padding: 0.75rem 1.5rem;
	background: ${props => props.theme.bgHover};
	color: ${props => props.theme.textMuted};
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
`;

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 1.1fr 1fr 1.2fr 0.9fr 1.2fr 0.6fr;
	padding: 0.9rem 1.5rem;
	border-top: 1px solid ${props => props.theme.border};
	align-items: center;
	font-size: 0.9rem;
	color: ${props => props.theme.textMain};
`;

const TypeBadge = styled.span`
	background: ${props => props.theme.primaryLight};
	color: ${props => props.theme.primaryText};
	border-radius: 999px;
	padding: 0.2rem 0.75rem;
	font-size: 0.75rem;
	font-weight: 600;
	text-align: center;
`;

const Quantity = styled.span`
	color: ${props => (props.$positive ? props.theme.success : props.theme.error)};
	font-weight: 700;
`;

const StatusDot = styled.span`
	width: 12px;
	height: 12px;
	border-radius: 999px;
	justify-self: start;
	background: ${props => (props.$variant === 'ok' ? props.theme.success : props.theme.warningText)};
`;
