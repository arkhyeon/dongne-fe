import styled from '@emotion/styled';
import EventBoard from './EventBoard';
import RecentBoard from './RecentBoard';
import TodayTalk from './TodayTalk';
import BestBoard from './BestBoard';

function BoardMain(props) {
  return (
    <BoardMainWrap>
      <EventBoard />
      <BoardWrap>
        <RecentBoard />
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
`;

export default BoardMain;
