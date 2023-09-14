import styled from '@emotion/styled';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../../../common/axios';
import { APICommentType } from '../../../type/BoardType';

function PostComment() {
  const { boardId } = useParams();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getCommentList();
  }, [boardId]);

  const getCommentList = () => {
    client
      .get<APICommentType>(`boardComment/${boardId}`)
      .then(res => setCommentList(res.findBoardCommentDtos));
  };

  return (
    <CommentWrap>
      {commentList.map(cl => {
        return <Comment key={cl.boardCommentId} comment={cl} />;
      })}
    </CommentWrap>
  );
}

const CommentWrap = styled.div`
  width: 100%;
`;

export default PostComment;
