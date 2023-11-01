import styled from '@emotion/styled';
import { css } from '@emotion/react';
import MainCategory from './MainCategory.tsx';
import SubCategory from './SubCategory.tsx';
import ChannelTalk from './ChannelTalk.tsx';

function DongComTalk({
  useMainCategory = true,
  useSubCategory = true,
  useChannelTalk = true,
}: {
  useMainCategory?: boolean;
  useSubCategory?: boolean;
  useChannelTalk?: boolean;
}) {
  return (
    <DongComTalkWrap>
      {useMainCategory && <MainCategory />}
      {useSubCategory && <SubCategory useMainCategory={useMainCategory} />}
      {useChannelTalk && <ChannelTalk useMainCategory={useMainCategory} />}
    </DongComTalkWrap>
  );
}

const DongComTalkWrap = styled.div`
  width: 100%;
  font-size: 13px;

  & p.flex svg {
    cursor: pointer;
  }
`;

export const DongComTalkItemWrap = styled.div`
  width: 100%;
  max-height: 35px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 25px;
  overflow: hidden;

  & .cate-on {
    color: #ffc045;
    font-weight: bold;
  }

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

  ${({ view }: { view: boolean }) => {
    if (view) {
      return css`
        max-height: 166px;
        overflow-y: scroll;
      `;
    }
  }}
`;

export const DongComTalkItem = styled.div`
  height: 34px;
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
