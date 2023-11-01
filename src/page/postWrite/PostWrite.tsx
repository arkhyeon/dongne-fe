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
import { CategoryStore } from '../../store/CategoryStore.ts';

function PostWrite() {
  const { mainCategory, subCategory, channel, setChannel } = CategoryStore();
  const { state } = useLocation();
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [title, setTitle] = useState('');
  const [boardType, setBoardType] = useState('일반');
  const [content, setContent] = useState<string>('');
  const [deadLineAt, setDeadLineAt] = useState<Date>(new Date());

  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setBoardType(state.boardType);
      setContent(state.content);
      setDeadLineAt(state.boardType === '일반' ? '' : state.deadLineAt);
    }
  }, []);

  const handlerBoardData = () => {
    if (subCategory === 0) {
      alert('서브 카테고리를 설정해 주세요.');
      return;
    }

    if (channel === '') {
      alert('채널톡을 설정해 주세요.');
      return;
    }

    if (content === '<p><br></p>') {
      alert('빈 게시글을 등록할 수 없습니다.');
      return;
    }
    const formData = new FormData();

    const writeBoardRequestDto = {
      title,
      content,
      boardType,
      channel,
      subCategory,
      mainCategory,
      cityCode: getCookie('cityCode'),
      zoneCode: getCookie('zoneCode'),
      deadLineAt,
    };

    if (fileRef.current.files !== null) {
      const files = fileRef.current?.files[0];

      // formData.append('writeBoardRequestDto', writeBoardRequestDto);
      formData.append('files', files);
    }

    formData.append(
      'writeBoardRequestDto',
      new Blob([JSON.stringify(writeBoardRequestDto)], {
        type: 'application/json',
      }),
    );

    state?.boardId ? updateBoard(formData) : insertBoard(formData);
  };

  const insertBoard = (formData: FormData) => {
    client
      .post('board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(r => console.log(r));
  };

  const updateBoard = (formData: FormData) => {
    client
      .patch(`board/${state.boardId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(r => console.log(r));
  };

  return (
    <PostWriteWrap>
      <TypeButtonWrap className="flex">
        <p className="list-text">게시글 타입</p>
        <SubButton
          className={boardType === '일반' ? 'type-on' : ''}
          onClick={() => setBoardType('일반')}
        >
          일반 게시글
        </SubButton>
        <SubButton
          className={boardType === '이벤트' ? 'type-on' : ''}
          onClick={() => setBoardType('이벤트')}
        >
          이벤트 게시글
        </SubButton>
        {boardType === '이벤트' && (
          <TypeButtonWrap className="flex">
            <p className="list-text">이벤트 종료 시간</p>
            <ReactDatePicker
              selected={deadLineAt}
              onChange={date => setDeadLineAt(date ?? new Date())}
              timeInputLabel="시간 :"
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeInput
            />
          </TypeButtonWrap>
        )}
      </TypeButtonWrap>
      {boardType === '일반' && (
        <>
          <DongComTalk />
          <TextInput
            label="채널톡"
            value={channel}
            onChange={e => setChannel(e.target.value)}
            placeholder="직접 입력하여 새로운 채널톡을 만들어보세요."
          />
        </>
      )}
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
