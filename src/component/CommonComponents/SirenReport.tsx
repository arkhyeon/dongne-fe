import { PiSirenFill } from 'react-icons/pi';
import styled from '@emotion/styled';
import Modal from '../modal/Modal';
import { useRef, useState } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';

function SirenReport(props) {
  const [open, setOpen] = useState(false);
  const editorRef = useRef(null);

  const insertPost = () => {
    const getPostContent = editorRef?.current?.getInstance().getHTML();
    console.log(getPostContent);
    if (getPostContent === '<p><br></p>') {
      alert('빈 게시글을 등록할 수 없습니다.');
    }
  };

  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Modal.Header closeButton>모달헤더</Modal.Header>
        <Modal.Body>
          <Editor
            ref={editorRef}
            initialValue=" " // 글 수정 시 사용
            placeholder="게시글을 작성해 주세요"
            initialEditType="wysiwyg" // wysiwyg & markdown
            hideModeSwitch={true} // wysiwyg & markdown 변경 버튼
            height="550px"
            usageStatistics={false} // 구글 애널리틱스에 호스트 이름 전송
            toolbarItems={[]}
          />
        </Modal.Body>
        <Modal.Footer>asd</Modal.Footer>
      </Modal>
      <SirenReportWrap className="flex-cc" onClick={() => setOpen(true)}>
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
