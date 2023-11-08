import { useEffect, useState } from 'react';
import MainPostList from '../../component/post/MainPostList.tsx';
import { searchStore } from '../../store/SearchStore.ts';
import { APISearchBoardType, BoardType } from '../../type/BoardType.ts';
import { getCookie } from '../../common/Cookie.ts';
import { client } from '../../common/axios.ts';
import Pagination from '../../component/CommonComponents/Pagination.tsx';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

function SearchList() {
  const { searchText } = searchStore();
  const location = useLocation();
  const [titleBoardList, setTitleBoardList] = useState<BoardType[]>([]);
  const [titlePage, setTitlePage] = useState(1);
  const [titleTotalPageCount, setTitleTotalPageCount] = useState<number>(0);
  const [userIdBoardList, setUserIdBoardList] = useState<BoardType[]>([]);
  const [userIdPage, setUserIdPage] = useState(1);
  const [userIdTotalPageCount, setUserIdTotalPageCount] = useState<number>(0);
  const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };

  useEffect(() => {
    getTitleBoardList(1);
    getUserIdBoardList(1);
  }, [location]);

  const getTitleBoardList = (page_nm: number) => {
    setTitlePage(page_nm);
    client
      .post<APISearchBoardType>(`board/search?page=${page_nm - 1}&size=5&sort=latest,desc`, {
        ...userCode,
        title: searchText,
        // channelId,
      })
      .then(res => {
        setTitleBoardList(res.findSearchBoardsDtos);
        setTitleTotalPageCount(res.totalPageCount);
      });
  };
  const getUserIdBoardList = (page_nm: number) => {
    setUserIdPage(page_nm);
    client
      .post<APISearchBoardType>(`board/search?page=${page_nm - 1}&size=5&sort=latest,desc`, {
        ...userCode,
        userId: searchText,
        // channelId,
      })
      .then(res => {
        setUserIdBoardList(res.findSearchBoardsDtos);
        setUserIdTotalPageCount(res.totalPageCount);
      });
  };

  return (
    <BoardListWrap>
      <MainPostList title="제목으로 검색된 게시글" postList={titleBoardList} />
      <Pagination
        currentPage={titlePage}
        totalLength={titleTotalPageCount}
        pageEvent={pageNum => getTitleBoardList(pageNum)}
      />
      <MainPostList title="아이디로 검색된 게시글" postList={userIdBoardList} />
      <Pagination
        currentPage={userIdPage}
        totalLength={userIdTotalPageCount}
        pageEvent={pageNum => getUserIdBoardList(pageNum)}
      />
    </BoardListWrap>
  );
}

const BoardListWrap = styled.div`
  width: 900px;
  margin: 15px auto 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default SearchList;
