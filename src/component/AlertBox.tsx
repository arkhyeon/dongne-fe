import styled from '@emotion/styled';
import { IoMdAlert } from 'react-icons/io';

function AlertBox({ children }) {
  return (
    <AlertBoxWrap>
      <IoMdAlert />
      {children}
    </AlertBoxWrap>
  );
}

const AlertBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #0a91ab;
  border-radius: 10px;
  padding: 6px 8px;
  display: flex;
  gap: 10px;

  svg {
    font-size: 18px;
    color: red;
  }
`;

export default AlertBox;
