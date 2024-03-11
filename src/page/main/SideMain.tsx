import styled from '@emotion/styled';
import ChartBubble from './components/Bubble';
import UserCard from './components/UserCard.tsx';
import { useLayoutEffect, useState } from 'react';
import { client } from '../../common/axios';
import { APIItemInitType, ItemInitType } from '../../type/BubbleType.ts';
import { UserStore } from '../../store/UserStore.ts';
import { APIUserRankingType, UserRankingType } from '../../type/UserType.ts';
import Identicon from 'identicon.js';
import SHA256 from '../../common/Sha256.ts';
import toHex from '../../common/toHex.ts';
import { LiaMedalSolid } from 'react-icons/lia';
import { integratedSearchStore } from '../../store/SearchStore.ts';
import { useNavigate } from 'react-router-dom';

function SideMain() {
  const { UserInfo, getUserInfo } = UserStore();
  const { setSearchText } = integratedSearchStore();
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemInitType[]>([]);
  const [topWriterList, setTopWriterList] = useState<UserRankingType[]>([]);

  useLayoutEffect(() => {
    getCityOfTop();
    getUserInfo();
    getTopWriterList();
  }, []);

  const getCityOfTop = () => {
    client.get<APIItemInitType>('city/top/5').then(res => setItems(res.cityNameCountDtos));
  };

  const getTopWriterList = () => {
    client
      .post<APIUserRankingType>(`user/ranking?page=0&size=10`, {
        nickname: '',
      })
      .then(res => setTopWriterList(res.userRankingDtos));
  };

  return (
    <SideMainWrap>
      {UserInfo ? (
        <ProfileWrap>
          <UserCard userInfo={UserInfo} />
          <PostReactWrap>
            <p className="title-text">최근 작성글</p>
            <ul>
              {UserInfo.findLatestBoardsByUserDtos?.map(pl => {
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
              {UserInfo.findLatestBoardCommentsByUserDtos?.map(pl => {
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
      <ProfileWrap className="flex-col gap-5">
        <p className="title-text c-pointer" onClick={() => navigate('/rank')}>
          Top Writers
        </p>
        {topWriterList.map((ul, rank) => {
          return (
            <UserRank
              key={ul.userId}
              onClick={() => {
                setSearchText(ul.userId);
                navigate('search');
              }}
            >
              <Ranking className={`rank-${rank + 1}`}>{rank > 2 && rank + 1}</Ranking>
              <img
                src={
                  ul.profileImg ??
                  `data:image/png;base64,${new Identicon(SHA256(toHex(ul.userId)), 50).toString()}`
                }
              />
              <p className="list-text flex-cc gap-5 c-pointer">
                {ul.nickname}
                <LiaMedalSolid />
                <small>{ul.point}</small>
              </p>
            </UserRank>
          );
        })}
      </ProfileWrap>
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

const UserRank = styled.div`
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 4px 6px;
  display: flex;
  gap: 6px;
  align-items: center;

  & img {
    width: 22px;
    height: 22px;
    border-radius: 100%;
  }

  &:hover p {
    transition: 0.3s;
    color: #ffc045;
  }
`;

const Ranking = styled.span`
  width: 22px;
  height: 22px;
  text-align: center;
  font-size: 18px;
`;

export default SideMain;
