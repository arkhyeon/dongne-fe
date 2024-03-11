import { useEffect, useState } from 'react';
import { BiSolidUpArrow } from 'react-icons/bi';
import { MainButton } from '../../../component/CommonComponents/Button';
import CommentWrite from './CommentWrite';
import styled from '@emotion/styled';
import CommentTextBox from './CommentTextBox';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BoardCommentType } from '../../../type/BoardType';
import { client } from '../../../common/axios';
import { useParams } from 'react-router-dom';
import { ReplyStore } from '../../../store/CommentStore.ts';
import { DC } from '../../../store/ToastStore.ts';

function Comment({
  comment,
  canCommentActive = true,
}: {
  comment: BoardCommentType;
  canCommentActive?: boolean;
}) {
  const { boardId = '0' } = useParams();
  const { replyList, getReplyList } = ReplyStore();
  const [commentWrite, setCommentWrite] = useState(false);
  const [replyShow, setReplyShow] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.isLiked);

  useEffect(() => {
    getReplyList(comment.boardCommentId);
  }, []);

  const setCommentLike = () => {
    const url = `boardCommentLikes/${isLiked ? 'cancel' : 'check'}/${comment.boardCommentId}`;
    client.post(url, { boardId, content: comment.content }).then(() => {
      setIsLiked(prevState => !prevState);
      isLiked ? (comment.boardCommentLikesCount -= 1) : (comment.boardCommentLikesCount += 1);
    });
  };

  const insertReply = (commentText: string) => {
    client
      .post('replyComment', { boardCommentId: comment.boardCommentId, content: commentText })
      .then(() => {
        DC.alert('대댓글을 작성하셨습니다.');
        getReplyList(comment.boardCommentId);
      });
    setCommentWrite(false);
  };

  return (
    <CommentWrap>
      <CommentRecommendWrap>
        <BiSolidUpArrow className={isLiked ? 'like-on' : ''} onClick={setCommentLike} />
        {comment.boardCommentLikesCount}
      </CommentRecommendWrap>
      <CommentTextBox content={comment}>
        {canCommentActive && (
          <CommentReply>
            {commentWrite ? (
              <CommentWrite confirm={insertReply} cancel={() => setCommentWrite(false)} />
            ) : (
              <MainButton onClick={() => setCommentWrite(true)}>댓글 작성</MainButton>
            )}
            {replyList[comment.boardCommentId]?.length > 0 && (
              <span className="list-text" onClick={() => setReplyShow(prevState => !prevState)}>
                {replyShow ? <IoIosArrowDown /> : <IoIosArrowUp />}
                댓글 {replyList[comment.boardCommentId]?.length}개
              </span>
            )}
          </CommentReply>
        )}
        {replyShow &&
          replyList[comment.boardCommentId].map(rl => (
            <CommentWrap>
              <CommentRecommendWrap>
                <BiSolidUpArrow className={isLiked ? 'like-on' : ''} onClick={setCommentLike} />
                {comment.boardCommentLikesCount}
              </CommentRecommendWrap>
              <CommentTextBox
                content={rl}
                key={rl.replyCommentId}
                boardCommentId={comment.boardCommentId}
              />
            </CommentWrap>
          ))}
      </CommentTextBox>
    </CommentWrap>
  );
}

const CommentWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  padding: 10px 15px;
  border-bottom: 1px solid #bbb;

  & & {
    padding-left: 20px;
    border-top: 1px dashed #aaa;
    border-bottom: none;
    padding-top: 10px;
  }
`;

const CommentRecommendWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;

  & svg {
    cursor: pointer;
    color: #333;

    &:hover,
    &.like-on {
      color: #ffc045;
    }
  }
`;

const CommentReply = styled.div`
  margin: 12px 0;

  & span {
    margin-top: 5px;
    cursor: pointer;

    &:hover {
      color: #ffc045;
    }

    & svg {
      position: relative;
      top: 2px;
      margin: 10px 2px 0 5px;
    }
  }
`;

export default Comment;
