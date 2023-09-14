import { useEffect, useState } from 'react';
import { BiSolidUpArrow } from 'react-icons/bi';
import { MainButton } from '../../../component/CommonComponents/Button';
import CommentWrite from './CommentWrite';
import styled from '@emotion/styled';
import CommentTextBox from './CommentTextBox';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { APIReplyType, BoardCommentType, ReplyType } from '../../../type/BoardType';
import { client } from '../../../common/axios';
import { useParams } from 'react-router-dom';

function Comment({
  comment,
  canCommentActive = true,
}: {
  comment: BoardCommentType;
  canCommentActive?: boolean;
}) {
  const { boardId } = useParams();
  const [replyList, setReplyList] = useState<ReplyType[]>([]);
  const [commentWrite, setCommentWrite] = useState(false);
  const [replyShow, setReplyShow] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.isLiked);

  useEffect(() => {
    getReplyList();
  }, []);

  const getReplyList = () => {
    client
      .get<APIReplyType>(`replyComment/${comment.boardCommentId}`)
      .then(res => setReplyList(res.findReplyCommentDtos));
  };

  const setCommentLike = () => {
    const url = `boardCommentLikes/${isLiked ? 'cancel' : 'check'}/${comment.boardCommentId}`;
    client.post(url, { boardId, content: comment.content }).then(() => {
      setIsLiked(prevState => !prevState);
      isLiked ? (comment.boardCommentLikesCount -= 1) : (comment.boardCommentLikesCount += 1);
    });
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
              <CommentWrite type={2} cancel={() => setCommentWrite(false)} />
            ) : (
              <MainButton onClick={() => setCommentWrite(true)}>댓글 작성</MainButton>
            )}
            {comment.replyCommentCount > 0 && (
              <span className="list-text" onClick={() => setReplyShow(prevState => !prevState)}>
                {replyShow ? <IoIosArrowDown /> : <IoIosArrowUp />}
                댓글 {comment.replyCommentCount}개
              </span>
            )}
          </CommentReply>
        )}
        {replyShow && replyList.map(rl => <CommentTextBox content={rl} key={rl.replyCommentId} />)}
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

  & button {
    width: 80px;
    height: 34px;
  }

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
