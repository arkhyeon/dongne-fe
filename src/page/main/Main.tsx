import React from 'react';
import styled from '@emotion/styled';
import SideMain from './SideMain';
import BoardMain from './BoardMain';

function Main(props) {
  return (
    <MainWrap>
      <SideMain></SideMain>
      <BoardMain></BoardMain>
    </MainWrap>
  );
}

const MainWrap = styled.div`
  width: 1230px;
  height: 600px;
  background-color: bisque;
  margin: 0 auto;
  display: flex;
  gap: 30px;
`;

export default Main;
