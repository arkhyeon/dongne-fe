import { PiSirenFill } from 'react-icons/pi';
import styled from '@emotion/styled';
import Modal from '../modal/Modal';
import { useMemo, useState } from 'react';
import { MainButton, SubButton } from './Button';
import ReactQuill from 'react-quill';
import { DC } from '../../store/ToastStore.ts';

function SirenReport({ boardId }: { boardId: string }) {
  const [open, setOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');

  function handleTags() {
    console.log('HANDLE TAG CLICK' + boardId);
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

  const insertPost = () => {
    // const getPostContent = editorRef.current.getInstance().getHTML();
    if (reportContent === '<p><br></p>') {
      DC.alert('신고 사유를 작성해 주세요.');
    }
  };

  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Modal.Header closeButton>신고하기</Modal.Header>
        <Modal.Body>
          <ReactQuill
            placeholder="댓글을 작성하세요"
            theme="bubble"
            value={reportContent}
            formats={[]}
            modules={modules}
            onChange={e => setReportContent(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <SubButton onClick={() => setOpen(false)}>취소</SubButton>
          <MainButton onClick={insertPost}>신고</MainButton>
        </Modal.Footer>
      </Modal>
      <SirenReportWrap role="button" className="flex-cc" onClick={() => setOpen(true)}>
        <PiSirenFill />
        신고
      </SirenReportWrap>
    </>
  );
}

const SirenReportWrap = styled.span`
  gap: 2px;
  cursor: pointer;
  font-weight: normal;

  &:hover {
    color: #ff0000 !important;
  }

  & svg {
    font-size: 14px;
  }
`;

export default SirenReport;
