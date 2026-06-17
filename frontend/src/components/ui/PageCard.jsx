import styled from 'styled-components';

export const PageCard = styled.div`
  background: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadowCard};
`;

export default PageCard;
