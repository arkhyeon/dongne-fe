import MainPostList from '../../../component/post/MainPostList';
import { client } from '../../../common/axios.ts';
import { useEffect, useState } from 'react';
import { APIReactionBoardType, BoardType } from '../../../type/BoardType.ts';
import styled from '@emotion/styled';

function PostReaction() {
  const [likeBoardList, setLikeBoardList] = useState<BoardType[]>([]);
  const [commentBoardList, setCommentBoardList] = useState<BoardType[]>([]);

  useEffect(() => {
    getReactionList();
  }, []);

  const getReactionList = () => {
    client
      .get<APIReactionBoardType>('user/board-likes/reaction?page=0&size=20')
      .then(res => setLikeBoardList(res.findUserReactionDtos));
    client
      .get<APIReactionBoardType>('user/board-comment/reaction?page=0&size=20')
      .then(res => setCommentBoardList(res.findUserReactionDtos));
  };

  return (
    <ReactionWrap>
      <MainPostList title="좋아요 받은 게시글" postList={likeBoardList} />
      <MainPostList title="댓글 받은 게시글" postList={commentBoardList} />
    </ReactionWrap>
  );
}

const ReactionWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default PostReaction;
