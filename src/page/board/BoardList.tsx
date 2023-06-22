import MainPostList from '../../component/post/MainPostList';
import { channelList, recentList } from '../../../data';
import DongComTalk from '../../component/dongcomtalk/DongComTalk';
import styled from '@emotion/styled';
import BoardSearch from './BoardSearch';

function BoardList(props) {
  return (
    <BoardListWrap>
      <p className="main-title-text">게시글</p>
      <DongComTalk channelList={channelList} />
      <BoardSearch />
      <MainPostList postList={recentList} />
    </BoardListWrap>
  );
}

const BoardListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default BoardList;
