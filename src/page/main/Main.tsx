import styled from '@emotion/styled';
import SideMain from './SideMain';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <MainWrap>
      <SideMain></SideMain>
      <Outlet />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  width: 1230px;
  margin: 30px auto 0;
  display: flex;
  gap: 30px;
`;

export default Main;
