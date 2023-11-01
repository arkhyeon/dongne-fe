import styled from '@emotion/styled';
import ChartBubble from './components/Bubble';
import UserInfo from './components/UserInfo';
import { useLayoutEffect, useState } from 'react';
import { client } from '../../common/axios';
import { UserMainInfo } from '../../type/UserType';
import { getDefaultImage } from '../../common/userCommon';
import { APIItemInitType, ItemInitType } from '../../type/BubbleType.ts';

function SideMain() {
  const [userInfo, setUserInfo] = useState<UserMainInfo>();
  const [items, setItems] = useState<ItemInitType[]>([]);
  useLayoutEffect(() => {
    getCityOfTop();
    client.get<UserMainInfo>('user-main?page=0&size=5').then(res => {
      setUserInfo({ ...res, profileImg: res.profileImg || getDefaultImage(res.userId) });
    });
  }, []);

  const getCityOfTop = () => {
    client.get<APIItemInitType>('city/top/5').then(res => setItems(res.cityNameCountDtos));
  };

  return (
    <SideMainWrap>
      {userInfo ? (
        <ProfileWrap>
          <UserInfo userInfo={userInfo} />
          <PostReactWrap>
            <p className="title-text">최근 작성글</p>
            <ul>
              {userInfo.findLatestBoardsByUserDtos?.map(pl => {
                return (
                  <li key={pl.boardId}>
                    <a href={`/post/${pl.boardId}`} className="list-text text-ellipsis">
                      {pl.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="title-text">최근 작성 댓글</p>
            <ul>
              {userInfo.findLatestBoardCommentsByUserDtos?.map(pl => {
                return (
                  <li key={pl.boardCommentId}>
                    <a href={`/post/${pl.boardId}`} className="list-text text-ellipsis">
                      {pl.content.replace(/<[^>]*>?/g, '')}
                    </a>
                  </li>
                );
              })}
            </ul>
          </PostReactWrap>
        </ProfileWrap>
      ) : (
        <ProfileWrap>
          <Skeleton />
        </ProfileWrap>
      )}
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

const Skeleton = styled.div`
  width: 100%;
  height: 300px;
`;

const PostReactWrap = styled.div`
  width: 100%;

  & p {
    margin: 16px 0 6px 0;
  }

  & ul li {
    margin-bottom: 5px;
  }
`;

export default SideMain;
