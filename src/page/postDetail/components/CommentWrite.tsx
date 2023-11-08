import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import styled from '@emotion/styled';
import { MainButton, SubButton } from '../../../component/CommonComponents/Button';
import { useMemo, useState } from 'react';
import { client } from '../../../common/axios';
import { useParams } from 'react-router-dom';
import { UserStore } from '../../../store/UserStore.ts';
import { userLevel } from '../../../common/userCommon.ts';
import { DC } from '../../../store/ToastStore.ts';

function CommentWrite({
  boardCommentId = 0,
  cancel,
}: {
  boardCommentId?: number;
  cancel?: () => void;
}) {
  const { UserInfo } = UserStore();
  const { boardId } = useParams();
  const [comment, setComment] = useState('');

  const registerComment = () => {
    if (boardCommentId === 0) {
      client.post('boardComment', { boardId, content: comment }).then(() => {
        DC.alert('댓글을 작성하셨습니다.');
      });
    } else {
      client.post('replyComment', { replyCommentId: boardCommentId, content: comment }).then(() => {
        DC.alert('대댓글을 작성하셨습니다.');
      });
    }
  };
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
      <CommentWriteHeader id="toolbar">
        LV.{userLevel(UserInfo.point)} {UserInfo.nickname}
      </CommentWriteHeader>
      <ReactQuill
        placeholder="댓글을 작성하세요"
        theme="bubble"
        value={comment}
        formats={[]}
        modules={modules}
        onChange={e => setComment(e)}
      />
      <ButtonWrap>
        <MainButton onClick={registerComment}>등록</MainButton>
        {boardCommentId ? <SubButton onClick={cancel}>취소</SubButton> : ''}
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
