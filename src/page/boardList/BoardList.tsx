import MainPostList from '../../component/post/MainPostList';
import { recentList } from '../../../data';
import DongComTalk from '../../component/dongcomtalk/DongComTalk';
import styled from '@emotion/styled';
import BoardSearch from './BoardSearch';
import Pagination from '../../component/CommonComponents/Pagination';
import { useState } from 'react';

function BoardList() {
  const [page, setPage] = useState(1);
  return (
    <BoardListWrap>
      <p className="main-title-text">게시글</p>
      <DongComTalk onClick={r => console.log(r)} />
      <BoardSearch />
      <MainPostList postList={recentList} />
      <Pagination currentPage={page} totalLength={65535} pageEvent={pageNum => setPage(pageNum)} />
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
