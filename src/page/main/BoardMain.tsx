import styled from '@emotion/styled';
import EventBoard from './EventBoard';
import MainPostList from '../../component/post/MainPostList';
import TodayTalk from './TodayTalk';
import BestBoard from './BestBoard';
import { recentList } from '../../../data';

function BoardMain(props) {
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
