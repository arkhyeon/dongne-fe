import styled from '@emotion/styled';
import Comment from './Comment';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { CommentStore } from '../../../store/CommentStore.ts';

function PostComment({ boardId }: { boardId: string }) {
  const { commentList, page, isFetching, hasNextPage, resetComment, getCommentList } =
    CommentStore();
  const targetRef = useRef() as MutableRefObject<HTMLDivElement>;

  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (target && isIntersecting) {
        getCommentList(boardId, page);
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
