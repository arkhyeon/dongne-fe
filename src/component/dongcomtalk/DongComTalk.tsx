import styled from '@emotion/styled';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { useState } from 'react';
import { css } from '@emotion/react';

function DongComTalk({ channelList = [] }) {
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
          <DongComTalkItem key={dl.id}>
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

  ${({ view }) => {
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

  & span {
    font-size: 12px;
  }
`;

export default DongComTalk;
