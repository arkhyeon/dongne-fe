import styled from '@emotion/styled';
import EventBoard from './EventBoard';
import MainPostList from '../../component/post/MainPostList';
import TodayTalk from './TodayTalk';
import BestBoard from './BestBoard';
import { useEffect, useState } from 'react';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import { APILatestBoardType, BoardType } from '../../type/BoardType';

function BoardMain() {
  const [recentList, setRecentList] = useState<BoardType[]>([]);

  useEffect(() => {
    getRecentList();
  }, []);

  const getRecentList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APILatestBoardType>(`board/latest?page=0&size=10`, userCode)
      .then(res => setRecentList(res.findLatestBoardsDtos));
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
