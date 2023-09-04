import styled from '@emotion/styled';
import ChartBubble from './components/Bubble';
import UserInfo from './components/UserInfo';
import { useLayoutEffect, useState } from 'react';
import { client } from '../../common/axios';
import { UserMainInfo } from '../../type/UserType';
import { getDefaultImage, userInitValue } from '../../common/userCommon';

const items = [
  { value: 16, text: '서울' },
  { value: 5, text: '부산' },
  { value: 5, text: '경기' },
  { value: 5, text: '인천' },
  { value: 3, text: '대전' },
];

function SideMain() {
  const [userInfo, setUserInfo] = useState<UserMainInfo>(userInitValue);

  useLayoutEffect(() => {
    client.get<UserMainInfo>('user-main?page=0&size=3').then(res => {
      setUserInfo({ ...res, profileImg: res.profileImg || getDefaultImage(res.userId) });
    });
  }, []);

  return (
    <SideMainWrap>
      <ProfileWrap>
        <UserInfo userInfo={userInfo} />
        <PostReactWrap>
          <p className="title-text">알투웨어</p>
          <ul>
            {postList.map(pl => {
              return (
                <li key={pl.id}>
                  <a href="#" className="list-text text-ellipsis">
                    {pl.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="title-text">알투웨어</p>
          <ul>
            {postList.map(pl => {
              return (
                <li key={pl.id}>
                  <a href="#" className="list-text text-ellipsis">
                    {pl.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </PostReactWrap>
      </ProfileWrap>
      <ChartBubble items={items} labelScale={0.8} />
    </SideMainWrap>
  );
}

const SideMainWrap = styled.div`
  width: 300px;
`;

const ProfileWrap = styled.div`
  width: 100%;
  border: 1px solid #0a91ab;
  padding: 16px;
  margin-bottom: 30px;
  border-radius: 5px;
`;

const PostReactWrap = styled.div`
  width: 100%;

  & p {
    margin: 16px 0 6px 0;
  }
`;

export default SideMain;

const postList = [
  { id: 1, title: '알투웨어1알투웨어1알투웨어1알투웨어1알투웨어1알투웨어1' },
  { id: 2, title: '알투웨어2' },
  { id: 3, title: '알투웨어3' },
];
