import { PiSirenFill } from 'react-icons/pi';
import styled from '@emotion/styled';
import Modal from '../modal/Modal';
import { ChangeEvent, useMemo, useState } from 'react';
import { MainButton, SubButton } from './Button';
import ReactQuill from 'react-quill';
import { DC } from '../../store/ToastStore.ts';

function SirenReport({ boardId }: { boardId: string }) {
  const [open, setOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [reportReason, setReportReason] = useState('');

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

  const changeReportReason = (e: ChangeEvent<HTMLInputElement>) => setReportReason(e.target.value);

  const insertPost = () => {
    // const getPostContent = editorRef.current.getInstance().getHTML();
    if (reportContent === '<p><br></p>' || reportContent === '') {
      DC.alert('신고 사유를 작성해 주세요.');
      return;
    }
    if (reportReason === '') {
      DC.alert('신고 사유를 선택해 주세요.');
      return;
    }
    DC.alertSuccess('소중한 신고 감사합니다.');
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Modal.Header closeButton>신고하기</Modal.Header>
        <Modal.Body>
          <SirenReason>
            <label>
              <input
                type="radio"
                name="siren-reason"
                value="영리목적/홍보성"
                onChange={changeReportReason}
              />
              영리목적/홍보성
            </label>
            <label>
              <input
                type="radio"
                name="siren-reason"
                value="불법정보"
                onChange={changeReportReason}
              />
              불법정보
            </label>
            <label>
              <input
                type="radio"
                name="siren-reason"
                value="음란성/선정성"
                onChange={changeReportReason}
              />
              음란성/선정성
            </label>
            <label>
              <input
                type="radio"
                name="siren-reason"
                value="욕설/인신공격"
                onChange={changeReportReason}
              />
              욕설/인신공격
            </label>
            <label>
              <input
                type="radio"
                name="siren-reason"
                value="개인정보노출 같은 내용의 반복 게시 (도배)"
                onChange={changeReportReason}
              />
              개인정보노출 같은 내용의 반복 게시 (도배)
            </label>
            <label>
              <input
                type="radio"
                name="siren-reason"
                value="기타 불법촬영물등 유통"
                onChange={changeReportReason}
              />
              기타 불법촬영물등 유통
            </label>
          </SirenReason>
          <ReactQuill
            placeholder="신고는 반대 의견을 표시하는 기능이 아닙니다. 신고 대신 반대 의견이나 [답글]을 적어 보시는 것은 어떨까요?"
            theme="bubble"
            value={reportContent}
            formats={[]}
            modules={modules}
            onChange={e => setReportContent(e)}
            style={{ height: '200px' }}
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

const SirenReason = styled.div`
  display: flex;
  flex-wrap: wrap;
  accent-color: #ffc045;
  margin-bottom: 12px;
  & label {
    width: 50%;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    gap: 8px;
    cursor: pointer;
  }
`;

export default SirenReport;
