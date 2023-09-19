import styled from '@emotion/styled';
import EventBoardItem from '../main/components/EventBoardItem';
import { useEffect, useState } from 'react';
import { getCookie } from '../../common/Cookie';
import { client } from '../../common/axios';
import { APILatestBoardType, BoardType } from '../../type/BoardType';

function EventBoardList() {
  const [postList, setPostList] = useState<BoardType[]>([]);
  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APILatestBoardType>(`board/latest?page=0&size=10`, userCode)
      .then(res => setPostList(res.findLatestBoardsDtos));
  };
  return (
    <div>
      <EventBoardWrap>
        {postList.map(el => {
          return <EventBoardItem key={el.boardId} eventBoard={el} />;
        })}
        {postList.map(el => {
          return <EventBoardItem key={el.boardId} eventBoard={el} />;
        })}
        {postList.map(el => {
          return <EventBoardItem key={el.boardId} eventBoard={el} />;
        })}
      </EventBoardWrap>
    </div>
  );
}

const EventBoardWrap = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

export default EventBoardList;
