import MainPostList from '../../component/post/MainPostList';
import DongComTalk from '../../component/dongcomtalk/DongComTalk';
import styled from '@emotion/styled';
import BoardSearch from './BoardSearch';
import Pagination from '../../component/CommonComponents/Pagination';
import { useEffect, useState } from 'react';
import { APILatestBoardType, BoardType } from '../../type/BoardType';
import { getCookie } from '../../common/Cookie';
import { client } from '../../common/axios';

function BoardList() {
  const [page, setPage] = useState(1);
  const [recentList, setRecentList] = useState<BoardType[]>([]);
  const [mainCategoryId, setMainCategory] = useState(0);
  const [subCategoryId, setSubCategory] = useState(0);

  useEffect(() => {
    getRecentList();
  }, [page]);

  const getRecentList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APILatestBoardType>(`board/latest?page=${page}&size=10`, userCode)
      .then(res => setRecentList(res.findLatestBoardsDtos));
  };

  return (
    <BoardListWrap>
      <p className="main-title-text">게시글</p>
      <DongComTalk
        mainCategory={mainCategoryId}
        subCategory={subCategoryId}
        setMainCategory={setMainCategory}
        setSubCategory={setSubCategory}
      />
      <BoardSearch />
      <MainPostList postList={recentList} />
      <Pagination currentPage={page} totalLength={19} pageEvent={pageNum => setPage(pageNum)} />
    </BoardListWrap>
  );
}

const BoardListWrap = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default BoardList;
