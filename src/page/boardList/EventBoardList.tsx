import styled from '@emotion/styled';
import EventBoardItem from '../main/components/EventBoardItem';

const eventList = [
  { id: 1, img: '', title: 'R2WARE', text: 'r2ware123' },
  { id: 2, img: '/img', title: 'R2WARE', text: 'r2ware123' },
  { id: 3, img: '/img', title: 'R2WARE', text: 'r2ware123r2ware123r2ware123r2ware123r2ware123' },
];

function EventBoardList() {
  return (
    <div>
      <EventBoardWrap>
        {eventList.map(el => {
          return <EventBoardItem key={el.id} eventBoard={el} />;
        })}
        {eventList.map(el => {
          return <EventBoardItem key={el.id} eventBoard={el} />;
        })}
        {eventList.map(el => {
          return <EventBoardItem key={el.id} eventBoard={el} />;
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
