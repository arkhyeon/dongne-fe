import { elapsedDate } from '../../../common/common';
import SirenReport from '../../../component/CommonComponents/SirenReport';
import styled from '@emotion/styled';
import CommentViewer from '../../../component/post/CommentViewer';
import { BoardCommentType, ReplyType } from '../../../type/BoardType';
import React from 'react';
import { getCookie } from '../../../common/Cookie';
import { useParams } from 'react-router-dom';
import { userLevel } from '../../../common/userCommon.ts';

function CommentTextBox({
  content,
  children,
}: {
  content: BoardCommentType | ReplyType;
  children?: React.ReactNode;
}) {
  const { boardId } = useParams<{ boardId: string }>();
  return (
    <CommentMain>
      <div className="list-text">
        <span>LV.{userLevel(content.point)}</span>
        <span>{content.nickname}</span>
        <span>| {elapsedDate(new Date(content.createDate))}</span>
        {getCookie('userId') !== content.userId && <SirenReport boardId={boardId ?? '0'} />}
      </div>
      <CommentViewer initialValue={content.content} />
      {children}
    </CommentMain>
  );
}

const CommentMain = styled.div`
  width: 100%;

  & div.list-text {
    display: flex;
    align-items: center;
    gap: 5px;

    & span {
      font-weight: bold;
    }

    & span:nth-of-type(n + 3) {
      color: #666;
      margin-left: 3px;
      font-weight: normal;
    }
  }

  & & {
    padding-left: 20px;
    border-top: 1px dashed #aaa;
    padding-top: 10px;
  }
`;

export default CommentTextBox;
