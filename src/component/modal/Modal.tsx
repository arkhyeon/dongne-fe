import styled from '@emotion/styled';
import React, { createContext, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { createPortal } from 'react-dom';

interface ModalType {
  open?: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

const ModalContext = createContext<ModalType | null>(null);

const Modal = ({ open, handleClose, children }: ModalType) => {
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

const ModalHeader = ({
  closeButton,
  children,
}: {
  closeButton: boolean;
  children: React.ReactNode;
}) => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('MyConsumer must be used within a MyProvider');
  }

  const { handleClose } = modalContext;
  return (
    <ModalHeaderWrap>
      {children}
      {closeButton && <IoClose role="button" className="close-btn" onClick={handleClose} />}
    </ModalHeaderWrap>
  );
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return <ModalBodyWrap>{children}</ModalBodyWrap>;
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
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
  border-radius: 10px;
`;

const ModalHeaderWrap = styled.div`
  width: 100%;
  height: 55px;
  padding: 16px 15px;
  font-size: 18px;
  box-sizing: border-box;
  background-color: #ffc045;
  border-radius: 10px 10px 0 0;

  & .close-btn {
    font-size: 28px;
    float: right;
  }
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
  padding: 15px 20px;
`;

const ModalFooterWrap = styled.div`
  width: 100%;
  height: 60px;
  padding: 12px 15px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #dadde6;
  gap: 10px;
`;

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
