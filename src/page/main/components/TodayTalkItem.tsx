import styled from '@emotion/styled';
import { useState } from 'react';

function TodayTalkItem({ talkList }) {
  const [talkDivide, setTalkDivide] = useState('hot');

  return (
    <TodayTalkItemWrap>
      <TodayTalkDivide>
        <div className={talkDivide === 'hot' ? 'on' : ''} onClick={() => setTalkDivide('hot')}>
          Hot
        </div>
        <div className={talkDivide === 'new' ? 'on' : ''} onClick={() => setTalkDivide('new')}>
          New
        </div>
      </TodayTalkDivide>
      <TodayTalkList>
        {talkList.map((tl, i) => {
          return (
            <a key={tl.id} href="#" className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">{tl.title}</span>
                <span>({tl.commentTotal})</span>
              </TodayTalkPost>
            </a>
          );
        })}
      </TodayTalkList>
    </TodayTalkItemWrap>
  );
}

const TodayTalkItemWrap = styled.div`
  display: flex;
  flex-direction: column;

  & a {
    margin-top: 6px;
  }
`;

const TodayTalkDivide = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  text-align: center;
  font-size: 14px;

  & div {
    width: 100%;
    border-bottom: 1px solid #0a91ab;
    border-top: 1px solid #ebebeb;
    cursor: pointer;
    line-height: 30px;
    color: #aaa;

    &:nth-of-type(1) {
      border-left: 1px solid #ebebeb;
    }

    &:nth-of-type(2) {
      border-right: 1px solid #ebebeb;
    }

    &.on {
      font-weight: bold;
      color: black;
      border-top: 1px solid #0a91ab;
      border-right: 1px solid #0a91ab;
      border-left: 1px solid #0a91ab;
      border-bottom: none;
    }
  }
`;

const TodayTalkList = styled.div`
  display: flex;
  padding: 0 4px 8px;
  flex-direction: column;
  border: 1px solid #0a91ab;
  border-top: none;

  & a:first-of-type span:first-of-type {
    color: red;
  }
`;

const TodayTalkPost = styled.div`
  display: flex;
  align-items: center;
  & span {
    width: max-content;
  }

  & span:nth-of-type(1) {
    font-style: italic;
    margin-right: 10px;
  }
  & span:nth-of-type(3) {
    color: #aaa;
    margin-left: 5px;
  }
`;

export default TodayTalkItem;
