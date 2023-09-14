import styled from '@emotion/styled';
import EventBoardItem from './components/EventBoardItem';
import { useEffect, useState } from 'react';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import { APIEventBoardType, EventBoardType } from '../../type/BoardType';

function EventBoard() {
  const [eventBoardList, setEventBoardList] = useState<EventBoardType[]>([]);

  useEffect(() => {
    getEventBoardList();
  }, []);

  const getEventBoardList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APIEventBoardType>(`board/event?page=0&size=3`, { ...userCode, period: 'WEEK' })
      .then(res => setEventBoardList(res.findEventBoardsByPeriodDtos));
  };

  return (
    <EventBoardWrap>
      {eventBoardList.map(el => {
        return <EventBoardItem key={el.boardId} eventBoard={el} />;
      })}
    </EventBoardWrap>
  );
}

const EventBoardWrap = styled.ul`
  width: 100%;
  display: flex;
  gap: 18px;
`;

export default EventBoard;
