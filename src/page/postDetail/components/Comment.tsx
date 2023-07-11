import React, { useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { MainButton } from '../../../component/CommonComponents/Button';
import CommentWrite from './CommentWrite';
import styled from '@emotion/styled';
import CommentTextBox from './CommentTextBox';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function Comment({ comment, canCommentActive = true }) {
  const [commentWrite, setCommentWrite] = useState(false);
  const [replyShow, setReplyShow] = useState(false);
  return (
    <CommentWrap>
      <CommentRecommendWrap>
        <BiSolidUpArrow className="animate-up" />
        {comment.recommend}
        <BiSolidDownArrow className="animate-down" />
      </CommentRecommendWrap>
      <CommentTextBox content={comment}>
        {canCommentActive && (
          <CommentReply>
            {commentWrite ? (
              <CommentWrite type={2} cancel={() => setCommentWrite(false)} />
            ) : (
              <MainButton onClick={() => setCommentWrite(true)}>댓글 작성</MainButton>
            )}
            {comment.replyList.length > 0 && (
              <span className="list-text" onClick={() => setReplyShow(prevState => !prevState)}>
                {replyShow ? <IoIosArrowDown /> : <IoIosArrowUp />}
                댓글 {comment.replyList.length}개
              </span>
            )}
          </CommentReply>
        )}
        {replyShow && comment.replyList.map(rl => <CommentTextBox content={rl} key={rl.id} />)}
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

  & svg {
    color: #333;
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
