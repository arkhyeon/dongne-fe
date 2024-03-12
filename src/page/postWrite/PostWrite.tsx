import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
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
import { DC } from '../../store/ToastStore.ts';
import { BoardInsertType } from '../../type/BoardType.ts';

function PostWrite() {
  const { mainCategory, subCategory, channelName, setChannel, setChannelName, setMainCategory } =
    CategoryStore();
  const { state } = useLocation();
  const [title, setTitle] = useState('');
  const [boardType, setBoardType] = useState('NORMAL');
  const [content, setContent] = useState<string>('');
  const [deadLineAt, setDeadLineAt] = useState<Date>(new Date());
  const [fileImg, setFileImg] = useState<string>('');

  useEffect(() => {
    console.log(state);
    if (state) {
      setTitle(state.title);
      setBoardType(state.boardType);
      setContent(state.content);
      setDeadLineAt(state.boardType === 'NORMAL' ? '' : state.deadLineAt);
      setMainCategory(state);
    }
  }, []);

  const handlerBoardData = () => {
    if (subCategory === 0) {
      DC.alert('서브 카테고리를 설정해 주세요.');
      return;
    }

    if (channelName === '') {
      DC.alert('채널톡을 설정해 주세요.');
      return;
    }

    if (content === '<p><br></p>') {
      DC.alert('빈 게시글을 등록할 수 없습니다.');
      return;
    }

    const writeBoardRequestDto = {
      title,
      content,
      boardType,
      channelName,
      subCategory,
      mainCategory,
      cityCode: getCookie('cityCode') || '',
      zoneCode: getCookie('zoneCode') || '',
      deadLineAt: boardType === 'NORMAL' ? null : deadLineAt,
      fileImg,
    };

    state?.boardId ? updateBoard(writeBoardRequestDto) : insertBoard(writeBoardRequestDto);
  };

  const insertBoard = (writeBoardRequestDto: BoardInsertType) => {
    client
      .post('board', writeBoardRequestDto, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(r => console.log(r));
  };

  const updateBoard = (writeBoardRequestDto: BoardInsertType) => {
    client
      .patch(`board/${state.boardId}`, writeBoardRequestDto, {
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
              onChange={date => setDeadLineAt(date ?? new Date())}
              timeInputLabel="시간 :"
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeInput
            />
          </TypeButtonWrap>
        )}
      </TypeButtonWrap>
      {boardType === 'NORMAL' && (
        <>
          <DongComTalk />
          <TextInput
            label="채널톡"
            value={channelName}
            onChange={e => {
              setChannel(0);
              setChannelName(e.target.value);
            }}
            placeholder="직접 입력하여 새로운 채널톡을 만들어보세요."
          />
        </>
      )}
      <TextInput label="제목" value={title} onChange={e => setTitle(e.target.value)} />
      <QuillCustom
        content={content}
        setContent={setContent}
        fileImg={fileImg}
        setFileImg={setFileImg}
      />
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
