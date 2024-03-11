import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import styled from '@emotion/styled';
import { MainButton, SubButton } from '../../../component/CommonComponents/Button';
import React, { useMemo, useState } from 'react';

function CommentWrite({
  confirm,
  cancel,
  comment,
  children,
}: {
  confirm: (commentText: string) => void;
  cancel?: () => void;
  comment?: string;
  children?: React.ReactNode;
}) {
  const [commentText, setCommentText] = useState(comment ?? '');

  function handleTags() {
    console.log('HANDLE TAG CLICK');
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [['tags']],
        handlers: {
          tags: handleTags,
        },
      },
    };
  }, []);

  return (
    <CommentWriteWrap>
      <CommentWriteHeader id="toolbar">{children}</CommentWriteHeader>
      <ReactQuill
        placeholder="댓글을 작성하세요"
        theme="bubble"
        value={commentText}
        formats={[]}
        modules={modules}
        onChange={e => setCommentText(e)}
      />
      <ButtonWrap>
        <MainButton
          onClick={() => {
            confirm(commentText);
            setCommentText('');
          }}
        >
          작성
        </MainButton>
        {cancel ? <SubButton onClick={cancel}>취소</SubButton> : ''}
      </ButtonWrap>
    </CommentWriteWrap>
  );
}

const CommentWriteWrap = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #0a91ab;
  border-radius: 5px;
  font-size: 15px;

  & .ql-editor {
    height: 105px;
  }

  & .ql-editor.ql-blank::before {
    font-style: normal !important;
  }
`;

const CommentWriteHeader = styled.div`
  border: none !important;
  padding: 0 !important;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  flex-direction: row-reverse;
  margin-top: 8px;
  gap: 12px;
`;

export default CommentWrite;
