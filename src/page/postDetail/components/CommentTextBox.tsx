import { elapsedDate } from '../../../common/common';
import SirenReport from '../../../component/CommonComponents/SirenReport';
import styled from '@emotion/styled';
import CommentViewer from '../../../component/post/CommentViewer';
import { BoardCommentType, ReplyType } from '../../../type/BoardType';
import React, { useState } from 'react';
import { getCookie } from '../../../common/Cookie';
import { useParams } from 'react-router-dom';
import { userLevel } from '../../../common/userCommon.ts';
import { MdDelete, MdEdit } from 'react-icons/md';
import { client } from '../../../common/axios.ts';
import CommentWrite from './CommentWrite.tsx';
import { DC } from '../../../store/ToastStore.ts';
import { CommentStore, ReplyStore } from '../../../store/CommentStore.ts';

function CommentTextBox({
  content,
  children,
  boardCommentId,
}: {
  content: BoardCommentType | ReplyType;
  children?: React.ReactNode;
  boardCommentId?: number;
}) {
  const { boardId } = useParams<{ boardId: string }>();
  const [isReadyUpdate, setIsReadyUpdate] = useState(false);
  const { setCommentInList, deleteCommentInList } = CommentStore();
  const { getReplyList } = ReplyStore();

  const updateComment = (commentText: string) => {
    console.log(commentText);
    console.log(content);
    if ('boardCommentId' in content) {
      client
        .patch(`boardComment/${content.boardCommentId}`, {
          userId: content.userId,
          content: commentText,
        })
        .then(() => {
          DC.alert('댓글을 수정하셨습니다.');
          setCommentInList(content.boardCommentId, commentText);
        });
    }

    if ('replyCommentId' in content && boardCommentId) {
      client
        .patch(`replyComment/${content.replyCommentId}`, {
          userId: content.userId,
          content: commentText,
        })
        .then(() => {
          DC.alert('대댓글을 수정하셨습니다.');
          getReplyList(boardCommentId);
        });
    }

    setIsReadyUpdate(false);
  };

  const deleteComment = () => {
    if ('boardCommentId' in content) {
      client
        .delete(`boardComment/${content.boardCommentId}`, {
          data: { userId: content.userId },
        })
        .then(() => {
          DC.alert('댓글을 삭제하셨습니다.');
          deleteCommentInList(content.boardCommentId);
          getReplyList(content.boardCommentId);
        });
    }

    if ('replyCommentId' in content && boardCommentId) {
      client
        .delete(`replyComment/${content.replyCommentId}`, {
          data: { userId: content.userId },
        })
        .then(() => {
          DC.alert('대댓글을 삭제하셨습니다.');
          getReplyList(boardCommentId);
        });
    }
  };

  return (
    <CommentMain>
      <div className="list-text">
        <b>
          LV.{userLevel(content.point)} {content.nickname}
        </b>
        <span>{elapsedDate(new Date(content.createDate))}</span>
        {getCookie('userId') !== content.userId ? (
          <SirenReport boardId={boardId ?? '0'} />
        ) : (
          <>
            <span onClick={() => setIsReadyUpdate(true)}>
              <MdEdit />
              수정
            </span>
            <span onClick={() => deleteComment()}>
              <MdDelete />
              삭제
            </span>
          </>
        )}
      </div>
      {isReadyUpdate ? (
        <CommentWrite
          confirm={updateComment}
          cancel={() => setIsReadyUpdate(false)}
          comment={content.content}
        />
      ) : (
        <CommentViewer initialValue={content.content} />
      )}
      {children}
    </CommentMain>
  );
}

const CommentMain = styled.div`
  width: 100%;

  & div:has(#toolbar) {
    margin: 12px 0;
  }

  & div.list-text {
    display: flex;
    gap: 6px;

    & span {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`;

export default CommentTextBox;
