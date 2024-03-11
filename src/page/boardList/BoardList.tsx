import MainPostList from '../../component/post/MainPostList';
import DongComTalk from '../../component/dongcomtalk/DongComTalk';
import styled from '@emotion/styled';
import BoardSearch from './BoardSearch';
import Pagination from '../../component/CommonComponents/Pagination';
import { useEffect, useState } from 'react';
import { APISearchBoardType, BoardType } from '../../type/BoardType';
import { getCookie } from '../../common/Cookie';
import { client } from '../../common/axios';
import { searchStore } from '../../store/SearchStore.ts';
import { CategoryStore } from '../../store/CategoryStore.ts';

function BoardList() {
  const { subCategory, channel } = CategoryStore();
  const { searchText, sort, searchType } = searchStore();
  const [page, setPage] = useState(1);
  const [recentList, setRecentList] = useState<BoardType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  useEffect(() => {
    getRecentList(1);
  }, [sort, subCategory, channel]);

  const getRecentList = (page_nm: number) => {
    setPage(page_nm);
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APISearchBoardType>(`board/search?page=${page_nm - 1}&size=10&sort=${sort},desc`, {
        ...userCode,
        title: searchType === 'title' ? searchText : '',
        userId: searchType === 'userId' ? searchText : '',
        subCategoryId: subCategory || null,
        channelId: channel || null,
      })
      .then(res => {
        setRecentList(res.findSearchBoardsDtos);
        setTotalPageCount(res.totalPageCount);
      });
  };

  return (
    <BoardListWrap>
      <p className="main-title-text">게시글</p>
      <DongComTalk useMainCategory={false} />
      <BoardSearch searchEvent={() => getRecentList(1)} />
      <MainPostList postList={recentList} />
      <Pagination
        currentPage={page}
        totalLength={totalPageCount}
        pageEvent={pageNum => getRecentList(pageNum)}
      />
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
