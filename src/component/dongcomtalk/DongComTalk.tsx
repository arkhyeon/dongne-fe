import styled from '@emotion/styled';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { useState } from 'react';
import { css } from '@emotion/react';
import { TalkChannelType } from '../../type/TalkChannelType';

const channelList = [
  { id: 0, channel: '기술연구소', postCnt: 4 },
  { id: 1, channel: '기술지원팀', postCnt: 5 },
  { id: 2, channel: '영업관리팀', postCnt: 6 },
  { id: 3, channel: '유지보수팀', postCnt: 7 },
  { id: 4, channel: '알투웨어', postCnt: 8 },
  { id: 5, channel: '부설연구소', postCnt: 9 },
  { id: 6, channel: '한산기', postCnt: 14 },
  { id: 7, channel: '에어컨', postCnt: 24 },
  { id: 8, channel: '서울숲IT', postCnt: 34 },
  { id: 9, channel: '캐슬', postCnt: 4 },
  { id: 10, channel: '동네들', postCnt: 45 },
  { id: 11, channel: '기술연구', postCnt: 12 },
  { id: 12, channel: '기술지원', postCnt: 6 },
  { id: 13, channel: '영업관리', postCnt: 9 },
  { id: 14, channel: '유지보수', postCnt: 8 },
  { id: 15, channel: '알투웨어1', postCnt: 3 },
  { id: 16, channel: '부설연구', postCnt: 18 },
  { id: 17, channel: '한산기1', postCnt: 22 },
  { id: 18, channel: '에어컨1', postCnt: 19 },
  { id: 19, channel: '서울숲', postCnt: 33 },
  { id: 20, channel: '캐슬1', postCnt: 21 },
  { id: 21, channel: '동네들1', postCnt: 15 },
];

// function DongComTalk({ channelList = [] }) {
function DongComTalk({ onClick }: { onClick: (e: TalkChannelType) => void }) {
  const [view, setView] = useState(0);
  const [orderedList, setOrderedList] = useState(channelList);

  const postCountOrder = () =>
    setOrderedList([...channelList.sort((a, b) => b.postCnt - a.postCnt)]);
  const postNameOrder = () =>
    setOrderedList([
      ...channelList.sort((a, b) => (a.channel.toLowerCase() < b.channel.toLowerCase() ? -1 : 1)),
    ]);

  return (
    <DongComTalkWrap>
      <DongComCategory>
        <p onClick={() => setView(prevState => (prevState ? 0 : 1))}>
          전체
          {view ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
        </p>
        <span onClick={postCountOrder}>게시글 수</span> |{' '}
        <span onClick={postNameOrder}>가나다</span>
      </DongComCategory>
      <DongComTalkItemWrap view={view}>
        {orderedList.map(dl => (
          <DongComTalkItem key={dl.id} onClick={() => onClick(dl)}>
            {dl.channel}
            <span>({dl.postCnt})</span>
          </DongComTalkItem>
        ))}
      </DongComTalkItemWrap>
    </DongComTalkWrap>
  );
}

const DongComTalkWrap = styled.div`
  width: 100%;
  display: flex;
  font-size: 13px;
`;

const DongComCategory = styled.div`
  width: 130px;
  & p {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 6px;
    cursor: pointer;
  }

  & span,
  & svg {
    cursor: pointer;
  }
`;

const DongComTalkItemWrap = styled.div`
  width: 100%;
  height: 71px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 5px;
  overflow: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d3d3d3;
  }

  ${({ view }: { view: number }) => {
    if (view) {
      return css`
        height: 142px;
        overflow-y: scroll;
      `;
    }
  }}
`;

const DongComTalkItem = styled.div`
  width: 105px;
  height: 17px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #aaa;
  gap: 2px;
  cursor: pointer;

  & span {
    font-size: 12px;
  }
`;

export default DongComTalk;
