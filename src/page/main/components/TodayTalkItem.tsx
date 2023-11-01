import styled from '@emotion/styled';
import { useState } from 'react';
import { APISearchBoardType, BoardType, CommentType } from '../../../type/BoardType';
import { client } from '../../../common/axios.ts';
import { getCookie } from '../../../common/Cookie.ts';

interface TodayTalkType {
  boardList?: BoardType[];
  commentList?: CommentType[];
  subCategoryId: number;
}

function TodayTalkItem({ boardList = [], commentList = [], subCategoryId }: TodayTalkType) {
  const [talkDivide, setTalkDivide] = useState('hot');
  const [recentList, setRecentList] = useState<BoardType[]>([]);
  const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };

  const getNewTalkList = () => {
    client
      .post<APISearchBoardType>('board/search?page=0&size=5&sort=latest,desc', {
        ...userCode,
        subCategoryId,
      })
      .then(res => setRecentList(res.findSearchBoardsDtos));
  };

  return (
    <TodayTalkItemWrap>
      {commentList?.length === 0 && (
        <TodayTalkDivide>
          <div className={talkDivide === 'hot' ? 'on' : ''} onClick={() => setTalkDivide('hot')}>
            Hot
          </div>

          <div
            className={talkDivide === 'new' ? 'on' : ''}
            onClick={() => {
              setTalkDivide('new');
              getNewTalkList();
            }}
          >
            New
          </div>
        </TodayTalkDivide>
      )}
      <TodayTalkList>
        {talkDivide === 'new' &&
          recentList.map((rl, i) => (
            <a key={rl.boardId + talkDivide} href={`post/${rl.boardId}`} className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">{rl.title}</span>
                <span>({rl.boardLikesCount})</span>
              </TodayTalkPost>
            </a>
          ))}
        {talkDivide === 'hot' &&
          boardList.map((bl, i) => (
            <a key={bl.boardId} href={`post/${bl.boardId}`} className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">{bl.title}</span>
                <span>({bl.boardLikesCount})</span>
              </TodayTalkPost>
            </a>
          ))}
        {commentList.map((cl, i) => (
          <a key={cl.boardCommentId} href={`post/${cl.boardId}`} className="list-text">
            <TodayTalkPost>
              <span className="title-text">{i + 1}</span>
              <span className="text-ellipsis">{cl.content}</span>
              <span>({cl.boardCommentLikesCount})</span>
            </TodayTalkPost>
          </a>
        ))}
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

  div ~ & {
    border-top: none;
  }

  & a:first-of-type span:first-of-type {
    color: red;
  }
`;

const TodayTalkPost = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    font-weight: bold;
  }

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
