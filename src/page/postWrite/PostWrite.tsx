import styled from '@emotion/styled';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import TextInput from '../../component/CommonComponents/TextInput';
import DongComTalk from '../../component/dongcomtalk/DongComTalk';
import { MainButton, SubButton } from '../../component/CommonComponents/Button';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuillCustom from '../../common/QuillCustom';
import { useLocation } from 'react-router-dom';

function PostWrite() {
  const { state } = useLocation();
  const [title, setTitle] = useState('');
  const [mainCategoryId, setMainCategory] = useState(0);
  const [subCategoryId, setSubCategory] = useState(0);
  const [boardType, setBoardType] = useState('NORMAL');
  const [content, setContent] = useState('');
  const [deadLineAt, setDeadLineAt] = useState(new Date());

  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setMainCategory(state.mainCategoryId ?? 0);
      setSubCategory(state.subCategoryId ?? 0);
      setBoardType(state.boardType);
      setContent(state.content);
      setDeadLineAt(state.boardType === 2 ? '' : state.deadLineAt);
    }
  }, []);

  const handlerBoardData = () => {
    if (content === '<p><br></p>') {
      alert('빈 게시글을 등록할 수 없습니다.');
      return;
    }
    const formData = new FormData();

    const writeBoardRequestDto = {
      title,
      content,
      boardType,
      mainCategoryId,
      subCategoryId,
      cityCode: getCookie('cityCode'),
      zoneCode: getCookie('zoneCode'),
      deadLineAt,
    };
    console.log(fileRef.current?.files);
    const files = fileRef.current?.files[0];

    // formData.append('writeBoardRequestDto', writeBoardRequestDto);
    formData.append('files', files);
    formData.append(
      'writeBoardRequestDto',
      new Blob([JSON.stringify(writeBoardRequestDto)], {
        type: 'application/json',
      }),
    );

    state?.boardId ? updateBoard(formData) : insertBoard(formData);
  };

  const insertBoard = formData => {
    client
      .post('board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(r => console.log(r));
  };

  const updateBoard = formData => {
    client
      .patch(`board/${state.boardId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(r => console.log(r));
  };

  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <PostWriteWrap>
      <input type={'file'} ref={fileRef} accept="image/*" />
      <TypeButtonWrap className="flex">
        <p className="list-text">게시글 타입</p>
        <SubButton
          className={boardType === 'NORMAL' ? 'type-on' : ''}
          onClick={() => setBoardType('NORMAL')}
        >
          일반 게시글
        </SubButton>
        <SubButton
          className={boardType === 'EVENT' ? 'type-on' : ''}
          onClick={() => setBoardType('EVENT')}
        >
          이벤트 게시글
        </SubButton>
        {boardType === 'EVENT' && (
          <TypeButtonWrap className="flex">
            <p className="list-text">이벤트 종료 시간</p>
            <ReactDatePicker
              selected={deadLineAt}
              onChange={date => setDeadLineAt(date)}
              timeInputLabel="시간 :"
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeInput
            />
          </TypeButtonWrap>
        )}
      </TypeButtonWrap>
      <DongComTalk
        mainCategory={mainCategoryId}
        subCategory={subCategoryId}
        setMainCategory={setMainCategory}
        setSubCategory={setSubCategory}
      />
      <TextInput label="제목" value={title} onChange={e => setTitle(e.target.value)} />
      <QuillCustom content={content} setContent={setContent} />
      <ButtonWrap>
        <SubButton>취소</SubButton>
        <MainButton onClick={handlerBoardData}>작성</MainButton>
      </ButtonWrap>
    </PostWriteWrap>
  );
}

const PostWriteWrap = styled.div`
  width: 1000px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  & .ql-editor {
    height: 550px;
  }
`;

const TypeButtonWrap = styled.div`
  height: 36px;
  gap: 15px;

  & p {
    display: flex;
    align-items: center;
  }

  & .type-on {
    background-color: #ffc045 !important;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
`;

export default PostWrite;
