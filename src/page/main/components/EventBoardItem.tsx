import styled from '@emotion/styled';
import { EventPostType } from '../../../type/BoardType';

function EventBoardItem({ eventBoard }: { eventBoard: EventPostType }) {
  return (
    <EventBoard>
      <a href="#">
        <img src={eventBoard.img} />
        <p className="text-ellipsis">{eventBoard.title}</p>
        <span className="text-ellipsis list-text">{eventBoard.text}</span>
      </a>
    </EventBoard>
  );
}

const EventBoard = styled.li`
  width: 288px;
  background-color: #ffc045;

  & img {
    width: 100%;
    height: 265px;
  }
`;

export default EventBoardItem;
