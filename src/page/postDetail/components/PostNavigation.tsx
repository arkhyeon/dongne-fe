import React from 'react';
import styled from '@emotion/styled';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { PiListBold } from 'react-icons/pi';
import { BsList } from 'react-icons/bs';

function PostNavigation(props) {
  return (
    <PostNavigationWrap className="list-text">
      <Navigation>
        <IoIosArrowBack />
        <PageLabel>
          <span>이전글</span>
          <p className="text-ellipsis">2019 대학정보화 심포지엄 및 정기총회 개최 참여 200억 수주</p>
        </PageLabel>
        <div />
      </Navigation>
      <PostListWrap className="flex-cc">
        <BsList />
      </PostListWrap>
      <Navigation>
        <PageLabel>
          <span>다음글</span>
          <p className="text-ellipsis">알투웨어, 테스트데이터 변환솔루션 시장 주도력 강화</p>
        </PageLabel>
        <IoIosArrowForward />
        <div />
      </Navigation>
    </PostNavigationWrap>
  );
}

const PostNavigationWrap = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  gap: 15px;
  user-select: none;

  & svg {
    font-size: 26px;
  }
`;

const Navigation = styled.div`
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  & svg {
    margin: 0 10px;
  }

  &:last-of-type {
    text-align: right;

    & p {
      justify-content: flex-end;
    }
  }

  & div {
    width: 0;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: #ffc045;
    z-index: -1;
    transition: 1s;
  }

  &:hover div {
    width: 100%;
  }
`;

const PageLabel = styled.p`
  width: 100%;

  & span {
    font-size: 12px;
    color: #0a91ab;
  }

  & p {
    width: 360px;
  }
`;

const PostListWrap = styled.div`
  min-width: 70px;
  border-radius: 100%;
  border: 1px solid #aaa;
  cursor: pointer;

  &:hover {
    background-color: #ffc045;
    transition: 0.3s;
  }
`;

export default PostNavigation;
