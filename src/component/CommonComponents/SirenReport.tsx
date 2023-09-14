import { PiSirenFill } from 'react-icons/pi';
import styled from '@emotion/styled';
import Modal from '../modal/Modal';
import { useState } from 'react';
import { MainButton, SubButton } from './Button';
import ReactQuill from 'react-quill';

function SirenReport() {
  const [open, setOpen] = useState(false);

  const insertPost = () => {
    // const getPostContent = editorRef.current.getInstance().getHTML();
    if ('' === '<p><br></p>') {
      alert('신고 사유를 작성해 주세요.');
    }
  };

  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Modal.Header closeButton>신고하기</Modal.Header>
        <Modal.Body>
          <ReactQuill
            initialValue=" " // 글 수정 시 사용
            placeholder="신고 사유를 작성해 주세요"
            initialEditType="wysiwyg" // wysiwyg & markdown
            hideModeSwitch={true} // wysiwyg & markdown 변경 버튼
            height="350px"
            usageStatistics={false} // 구글 애널리틱스에 호스트 이름 전송
            toolbarItems={[]}
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
