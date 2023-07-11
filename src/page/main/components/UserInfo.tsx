import React from 'react';
import Progressbar from '../../../component/CommonComponents/Progressbar';
import styled from '@emotion/styled';

function UserInfo(props) {
  return (
    <UserInfoWrap>
      <img src="/img" />
      <div>
        <p className="title-text">알투웨어(r2ware123)</p>
        <ExperienceWrap>
          <p className="list-text">LV : 88</p>
          <p className="list-text">POINT : 12321</p>
        </ExperienceWrap>
        <Progressbar exp={30} maxExp={100} />
      </div>
    </UserInfoWrap>
  );
}

const UserInfoWrap = styled.div`
  display: flex;
  gap: 16px;

  & img {
    width: 100px;
    height: 100px;
  }
`;

const ExperienceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
`;

export default UserInfo;
