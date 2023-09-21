import styled from '@emotion/styled';
import Comment from './Comment';
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { client } from '../../../common/axios';
import { APICommentType, BoardCommentType } from '../../../type/BoardType';

function PostComment({ boardId }: { boardId: string }) {
  const [commentList, setCommentList] = useState<BoardCommentType[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const targetRef = useRef() as MutableRefObject<HTMLDivElement>;

  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (target && isIntersecting) {
        getCommentList();
      }
    });
  });

  useLayoutEffect(() => {
    if (targetRef.current) {
      io.observe(targetRef.current);
    }
    return () => io.disconnect();
  }, [io]);

  useEffect(() => resetComment(), [boardId]);

  const resetComment = () => {
    setCommentList([]);
    setPage(0);
    setFetching(false);
    setNextPage(true);
  };

  const getCommentList = () => {
    setFetching(true);
    client.get<APICommentType>(`boardComment/${boardId}?page=${page}&size=10`).then(res => {
      if (res.findBoardCommentDtos.length === 0) {
        setNextPage(false);
      } else {
        setPage(prevState => prevState + 1);
        setCommentList(prevState => [...prevState, ...res.findBoardCommentDtos]);
        setNextPage(true);
        setFetching(false);
      }
    });
  };

  return (
    <CommentWrap>
      {commentList.map(cl => {
        return <Comment key={cl.boardCommentId} comment={cl} />;
      })}
      {!isFetching && hasNextPage && <Target ref={targetRef} />}
    </CommentWrap>
  );
}

const CommentWrap = styled.div`
  width: 100%;
`;

const Target = styled.div`
  height: 1px;
`;

export default PostComment;
