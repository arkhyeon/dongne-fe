import styled from '@emotion/styled';
import EventBoard from './EventBoard';
import MainPostList from '../../component/post/MainPostList';
import TodayTalk from './TodayTalk';
import BestBoard from './BestBoard';
import { useEffect, useState } from 'react';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import { APISearchBoardType, BoardType } from '../../type/BoardType';

function BoardMain() {
  const [recentList, setRecentList] = useState<BoardType[]>([]);

  useEffect(() => {
    getRecentList();
  }, []);

  const getRecentList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APISearchBoardType>(`board/search?page=0&size=10&sort=latest,desc`, { ...userCode })
      .then(res => setRecentList(res.findSearchBoardsDtos));
  };

  return (
    <BoardMainWrap>
      <EventBoard />
      <BoardWrap>
        <MainPostList title="Recent Board" postList={recentList} />
        <TodayTalk />
      </BoardWrap>
      <BoardWrap>
        <BestBoard />
      </BoardWrap>
    </BoardMainWrap>
  );
}

const BoardMainWrap = styled.div`
  width: 900px;
`;

const BoardWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 18px;
  margin-top: 30px;
`;

export default BoardMain;
