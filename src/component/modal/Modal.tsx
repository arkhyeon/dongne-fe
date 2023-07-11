import styled from '@emotion/styled';
import { createContext, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { createPortal } from 'react-dom';

const ModalContext = createContext(null);

const Modal = ({ open, handleClose, children }) => {
  const contextValue = { open, handleClose };
  return (
    <ModalContext.Provider value={contextValue}>
      {open &&
        createPortal(
          <ModalWrap>
            <ModalBackDrop onClick={handleClose} />
            <ModalContent>{children}</ModalContent>
          </ModalWrap>,
          document.body,
        )}
    </ModalContext.Provider>
  );
};

const ModalHeader = ({ closeButton, children }) => {
  const { handleClose } = useContext(ModalContext);
  return (
    <ModalHeaderWrap>
      {children}
      {closeButton && <IoClose onClick={handleClose} />}
    </ModalHeaderWrap>
  );
};

const ModalBody = ({ children }) => {
  return <ModalBodyWrap>{children}</ModalBodyWrap>;
};

const ModalFooter = ({ children }) => {
  return <ModalFooterWrap>{children}</ModalFooterWrap>;
};

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`;

const ModalContent = styled.div`
  width: 500px;
  background-color: white;
  position: relative;
  z-index: 1;
`;

const ModalHeaderWrap = styled.div`
  width: 100%;
  height: 60px;
  padding: 15px 15px;
  box-sizing: border-box;
`;

const ModalBackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
`;

const ModalBodyWrap = styled.div`
  width: 100%;
`;

const ModalFooterWrap = styled.div`
  width: 100%;
  height: 80px;
`;

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
