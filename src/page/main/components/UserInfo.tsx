import React, { useEffect, useLayoutEffect, useState } from 'react';
import Progressbar from '../../../component/CommonComponents/Progressbar';
import styled from '@emotion/styled';
import Identicon from 'identicon.js';
import SHA256 from '../../../common/Sha256';
import toHex from '../../../common/toHex';
import { client } from '../../../common/axios';
import { userLevel, UserMainInfo } from '../../../type/UserType';

function UserInfo() {
  const [userInfo, setUserInfo]: UserMainInfo = useState({});

  useLayoutEffect(() => {
    client.get<UserMainInfo>('user-main?page=0&size=3').then(res => {
      if (!res.profileImg) {
        res.profileImg = `data:image/png;base64,${new Identicon(
          SHA256(toHex(res.userId)),
          420,
        ).toString()}`;
      }
      setUserInfo(res);
    });
  }, []);

  return (
    <UserInfoWrap>
      {/*<img width="420" height="420" src={userInfo.profileImg} />*/}
      <div>
        <p className="title-text">
          {userInfo.nickname}({userInfo.userId})
        </p>
        <ExperienceWrap>
          <p className="list-text">LV : {userLevel(120)}</p>
          <p className="list-text">POINT : {userInfo.point}</p>
        </ExperienceWrap>
        <Progressbar progress={12} />
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
