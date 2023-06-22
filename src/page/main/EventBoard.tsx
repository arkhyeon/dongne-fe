import styled from '@emotion/styled';

const eventList = [
  { id: 1, img: '', title: 'R2WARE', text: 'r2ware123' },
  { id: 2, img: '/img', title: 'R2WARE', text: 'r2ware123' },
  { id: 3, img: '/img', title: 'R2WARE', text: 'r2ware123r2ware123r2ware123r2ware123r2ware123' },
];

function EventBoard(props) {
  return (
    <EventBoardWrap>
      {eventList.map(e => {
        return (
          <EventBoardItem key={e.id}>
            <img src={e.img} />
            <a href="#">
              <p className="text-ellipsis">{e.title}</p>
              <span className="text-ellipsis">{e.text}</span>
            </a>
          </EventBoardItem>
        );
      })}
    </EventBoardWrap>
  );
}

const EventBoardWrap = styled.ul`
  width: 100%;
  display: flex;
  gap: 18px;
`;

const EventBoardItem = styled.li`
  width: 288px;
  background-color: #ffc045;

  & img {
    width: 100%;
    height: 265px;
  }
`;

export default EventBoard;
