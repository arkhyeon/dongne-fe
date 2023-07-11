import React from 'react';
import styled from '@emotion/styled';
import Progressbar from '../../component/CommonComponents/Progressbar';
import ChartBubble from './components/Bubble';
import UserInfo from './components/UserInfo';

const items = [
  { value: 16, text: '웹스톰' },
  { value: 5, text: '아톰' },
  { value: 5, text: '노션' },
  { value: 5, text: '깃허브' },
  { value: 3, text: '유데미' },
];

function SideMain(props) {
  return (
    <SideMainWrap>
      <ProfileWrap>
        <UserInfo />
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
      <ChartBubble items={items} />
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
