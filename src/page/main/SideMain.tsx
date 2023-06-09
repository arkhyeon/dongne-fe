import React from 'react';
import styled from '@emotion/styled';
import Progressbar from '../CommonComponents/Progressbar';

function SideMain(props) {
  return (
    <SideMainWrap>
      <ProfileWrap>
        <img src="/img" />
        <ProfileInfo>
          <p>알투웨어(r2ware123)</p>
          <ExperienceWrap>
            <p>LV : 88</p>
            <p>POINT : 12321</p>
          </ExperienceWrap>
          <Progressbar exp={30} maxExp={100} />
        </ProfileInfo>
      </ProfileWrap>
    </SideMainWrap>
  );
}

const SideMainWrap = styled.div`
  width: 300px;
  height: 600px;
  background-color: darkgreen;
`;

const ProfileWrap = styled.div`
  width: 100%;
  padding: 16px;
  background-color: darkolivegreen;
  box-sizing: border-box;
  display: flex;
  gap: 16px;

  & img {
    width: 100px;
    height: 100px;
  }
`;

const ProfileInfo = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const ExperienceWrap = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  font-weight: normal;
  margin-top: 6px;
`;

export default SideMain;
