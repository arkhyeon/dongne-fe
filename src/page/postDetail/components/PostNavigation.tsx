import styled from '@emotion/styled';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsList } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../common/Cookie';
import { client } from '../../../common/axios';
import { APILatestBoardType, BoardType } from '../../../type/BoardType';
import { useEffect, useState } from 'react';

function PostNavigation({ boardId }: { boardId: string }) {
  const navigate = useNavigate();
  const [nextPost, setNextPost] = useState<BoardType>();
  const [prevPost, setPrevPost] = useState<BoardType>();

  useEffect(() => {
    getNextPrev();
  }, [boardId]);

  const getNextPrev = () => {
    const numberBid = Number(boardId);
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client.post<APILatestBoardType>('board/latest?page=0&size=99999', userCode).then(res => {
      for (let i = 0; i < res.findLatestBoardsDtos.length; i++) {
        if (numberBid === res.findLatestBoardsDtos[i].boardId) {
          setNextPost(res.findLatestBoardsDtos[i + 1]);
          setPrevPost(res.findLatestBoardsDtos[i - 1]);
        }
      }
    });
  };

  const navigatePost = (boardId: number | undefined) => {
    if (!boardId) return;
    navigate(`/post/${boardId}`);
  };

  return (
    <PostNavigationWrap className="list-text">
      <Navigation onClick={() => navigatePost(prevPost?.boardId)}>
        <IoIosArrowBack />
        <PageLabel className="text-ellipsis">
          <span>이전글</span> <br />
          {prevPost?.title ? prevPost.title : '없음'}
        </PageLabel>
        <div />
      </Navigation>
      <PostListWrap className="flex-cc" onClick={() => navigate('/board')}>
        <BsList />
      </PostListWrap>
      <Navigation onClick={() => navigatePost(nextPost?.boardId)}>
        <PageLabel className="text-ellipsis">
          <span>다음글</span> <br />
          {nextPost?.title ? nextPost.title : '없음'}
        </PageLabel>
        <IoIosArrowForward />
        <div />
      </Navigation>
    </PostNavigationWrap>
  );
}

const PostNavigationWrap = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  gap: 15px;
  user-select: none;

  & svg {
    font-size: 26px;
  }
`;

const Navigation = styled.div`
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  & svg {
    margin: 0 10px;
  }

  &:last-of-type {
    text-align: right;

    & p {
      justify-content: flex-end;
    }
  }

  & div {
    width: 0;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: #ffc045;
    z-index: -1;
    transition: 1s;
  }

  &:hover div {
    width: 100%;
  }
`;

const PageLabel = styled.p`
  width: 100%;
  font-size: 13px;
  & span {
    font-size: 12px;
    color: #0a91ab;
  }
`;

const PostListWrap = styled.div`
  min-width: 70px;
  border-radius: 100%;
  border: 1px solid #aaa;
  cursor: pointer;

  &:hover {
    background-color: #ffc045;
    transition: 0.3s;
  }
`;

export default PostNavigation;
