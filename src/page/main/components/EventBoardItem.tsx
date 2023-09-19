import styled from '@emotion/styled';
import { BoardType } from '../../../type/BoardType';

function EventBoardItem({ eventBoard }: { eventBoard: BoardType }) {
  return (
    <EventBoard>
      <a href={`post/${eventBoard.boardId}`}>
        <div>
          <img src={eventBoard?.fileImg} />
        </div>
        <p className="text-ellipsis">{eventBoard.title}</p>
      </a>
    </EventBoard>
  );
}

const EventBoard = styled.li`
  width: 288px;
  background-color: #ffc045;
  border: 3px solid #ffc045;
  border-radius: 5px;
  overflow: hidden;
  &:hover div img {
    scale: 1.05;
    transition: 0.3s;
  }

  & img,
  & div {
    width: 100%;
    height: 265px;
    overflow: hidden;
  }

  & p {
    padding: 5px 0;
  }
`;

export default EventBoardItem;
