import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import { MainButton, SubButton } from '../../../component/CommonComponents/Button';
import { useState } from 'react';

function CommentWrite({ type = 1, cancel }) {
  const [comment, setComment] = useState('');
  const registerComment = () => {
    console.log(comment);
  };

  return (
    <CommentWriteWrap>
      <CommentWriteHeader id="toolbar">LV.88 가나다라</CommentWriteHeader>
      <ReactQuill
        modules={{
          toolbar: {
            container: '#toolbar',
          },
        }}
        formats={[]}
        placeholder={'댓글을 작성하세요'}
        value={comment}
        onChange={(content, delta, source, editor) => setComment(editor.getHTML())}
      />
      <ButtonWrap>
        <MainButton onClick={registerComment}>등록</MainButton>
        {type === 2 && <SubButton onClick={cancel}>취소</SubButton>}
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
  gap: 15px;

  & button {
    width: 80px;
    height: 32px;
  }
`;

export default CommentWrite;
