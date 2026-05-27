import React from 'react';
import styled from 'styled-components';

export const Modal = ({ title, children, footer, onClose }) => {
  return (
    <Overlay>
      <Dialog role="dialog" aria-modal="true">
        <Header>
          <h3>{title}</h3>
        </Header>
        <Body>
          {children}
        </Body>
        {footer ? <Footer>{footer}</Footer> : null}
      </Dialog>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: 520px;
  max-width: calc(100% - 40px);
  background: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const Body = styled.div`
  padding: 1rem 1.25rem;
`;

const Footer = styled.div`
  padding: 0.75rem 1.25rem;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
