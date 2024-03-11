import { useCallback, useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ConfirmType, deleteAlert, ToastType, useNotifyStore } from '../../store/ToastStore';
import { MainButton, SubButton } from '../CommonComponents/Button';

function ToastNotify({ interval = 3000 }: { interval?: number }) {
  const { toastList, confirm } = useNotifyStore();

  return (
    <ToastWrap>
      {toastList.map(({ id, content, type }) => {
        return <ToastAlert key={id} id={id} content={content} interval={interval} type={type} />;
      })}
      {confirm.message && <ToastConfirm {...confirm} />}
    </ToastWrap>
  );
}

export default ToastNotify;

const ToastWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 15px;
  left: calc(50% - 200px);
  z-index: 9999;
`;

function ToastAlert({ id, content, interval, type }: ToastType & { interval: number }) {
  useLayoutEffect(() => {
    const timer = setTimeout(() => deleteAlert(id), interval);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastAlertItem type={type} onClick={() => deleteAlert(id)}>
      {content}
    </ToastAlertItem>
  );
}

function ToastConfirm({ title, message = '', buttons = ['취소', '확인'] }: ConfirmType) {
  const { responseHandler } = useNotifyStore();
  const focusRef = useRef<HTMLButtonElement>(null);

  const escapeConfirm = (e: KeyboardEvent) => {
    if (e.code === 'Escape') handleCancelClick();
  };

  useLayoutEffect(() => {
    focusRef.current?.focus();
    document.addEventListener('keydown', escapeConfirm);

    return () => {
      document.addEventListener('keydown', escapeConfirm);
    };
  }, []);

  const handleConfirmClick = useCallback(() => {
    responseHandler?.(true);
    useNotifyStore.setState(() => ({ confirm: { message: '' } }));
  }, [responseHandler]);

  const handleCancelClick = useCallback(() => {
    responseHandler?.(false);
    useNotifyStore.setState(() => ({ confirm: { message: '' } }));
  }, [responseHandler]);

  return (
    <>
      <ToastConfirmBack />
      <ToastConfirmItem>
        {title && <ToastConfirmHeader>{title}</ToastConfirmHeader>}
        <ToastConfirmBody>{message}</ToastConfirmBody>
        <ToastConfirmFooter className="flex">
          <SubButton onClick={handleCancelClick}>{buttons[0]}</SubButton>
          <MainButton onClick={handleConfirmClick} ref={focusRef}>
            {buttons[1]}
          </MainButton>
        </ToastConfirmFooter>
      </ToastConfirmItem>
    </>
  );
}

const ToastDefault = styled.div`
  width: 400px;
  min-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #000;
  border-radius: 6px;
  opacity: 1;
  transition: 0.3s all ease-in-out;
  pointer-events: all;
  position: relative;
  white-space: pre-line;
  line-height: 1.3;
  user-select: none;

  animation: dash 0.3s linear both;
  @keyframes dash {
    0% {
      opacity: 0;
      bottom: -50px;
    }
    100% {
      opacity: 1;
      bottom: 0;
    }
  }
`;

const ToastAlertItem = styled(ToastDefault)`
  ${({ type }: { type: string }) => {
    let borderColor = '';
    switch (type) {
      case 'success':
        borderColor = '#03a7f1';
        break;
      case 'error':
        borderColor = '#fb5b5b';
        break;
      default:
        borderColor = '#e9e9e9';
        break;
    }
    return css`
      border-left: 5px solid ${borderColor};
    `;
  }}
`;

const ToastConfirmItem = styled(ToastDefault)`
  flex-direction: column;
  & > div {
    width: 100%;
  }
`;

const ToastConfirmBack = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const ToastConfirmHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const ToastConfirmBody = styled.div`
  padding: 12px 0;
`;
const ToastConfirmFooter = styled.div`
  padding-top: 12px;
  justify-content: flex-end;
  gap: 15px;

  & button {
    height: 34px;
  }
`;
