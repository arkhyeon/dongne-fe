import styled from '@emotion/styled';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { client } from '../../../common/axios';
import { APICommentType } from '../../../type/BoardType';

interface InfiniteScrollOptions {
  size: number;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

function PostComment() {
  const { boardId } = useParams();
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const targetRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    getCommentList();
  }, []);

  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      console.log(target);
      console.log(isIntersecting);
      // const entryButton = _.find(targetRef.current, { view: target }).button;
      // entryButton.classList.toggle('stage-observing', isIntersecting);
    });
  });

  useLayoutEffect(() => {
    console.log(targetRef.current);
    io.observe(targetRef.current);
    return () => io.disconnect();
  }, [io]);

  const getCommentList = () => {
    client.get<APICommentType>(`boardComment/${boardId}?page=${page}&size=3`).then(res => {
      if (res.findBoardCommentDtos.length === 0) {
        setNextPage(false);
      } else {
        setCommentList(prevState => prevState.concat(res.findBoardCommentDtos));
        setPage(prevState => prevState + 1);
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
      {hasNextPage && <Target ref={targetRef} />}
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
