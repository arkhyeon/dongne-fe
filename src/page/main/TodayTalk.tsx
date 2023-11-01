import styled from '@emotion/styled';
import TodayTalkItem from './components/TodayTalkItem';
import { Fragment, useEffect, useState } from 'react';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import {
  APIHotCategoryBoardType,
  APIHotCategoryCommentType,
  HotCategoryBoardType,
  HotCategoryCommentType,
} from '../../type/BoardType';
import { MainButton } from '../../component/CommonComponents/Button.tsx';
import { useNavigate } from 'react-router-dom';

function TodayTalk() {
  const [talkList, setTalkList] = useState<HotCategoryBoardType[]>([]);
  const [commentList, setCommentList] = useState<HotCategoryCommentType[]>([]);
  const navigate = useNavigate();

  useEffect(() => getTalkList(), []);

  const getTalkList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APIHotCategoryBoardType>(`board/hot`, {
        ...userCode,
        categoryCount: 3,
        dataCount: 5,
      })
      .then(res => setTalkList(res.findHotBoardsByCategoriesDtos));

    client
      .post<APIHotCategoryCommentType>(`boardComment/hot`, {
        ...userCode,
        categoryCount: 2,
        dataCount: 5,
      })
      .then(res => setCommentList(res.findHotBoardCommentsByCategoriesDtos));
  };

  return (
    <TodayTalkWrap>
      <p className="main-title-text">인기 카테고리 게시글</p>
      {talkList.map(tl => (
        <Fragment key={tl.subCategoryId}>
          <p className="title-text">{tl.subCategoryName}</p>
          <TodayTalkItem boardList={tl.findHotBoardsDtos} subCategoryId={tl.subCategoryId} />
        </Fragment>
      ))}
      {talkList.length === 0 && (
        <TodayTalkSkeleton>
          오늘의 인기글을 작성해 주세요~
          <MainButton onClick={() => navigate('/postwrite')}>작성하기</MainButton>
        </TodayTalkSkeleton>
      )}
      {commentList.length !== 0 && <p className="main-title-text">인기 카테고리 댓글</p>}
      {commentList.map(cl => (
        <Fragment key={cl.subCategoryId}>
          <p className="title-text">{cl.subCategoryName}</p>
          <TodayTalkItem
            commentList={cl.findHotBoardCommentsDtos}
            subCategoryId={cl.subCategoryId}
          />
        </Fragment>
      ))}
    </TodayTalkWrap>
  );
}

const TodayTalkWrap = styled.div`
  min-width: 288px;
  & > .main-title-text {
    margin-top: 8px;
  }

  & > .title-text {
    margin: 14px 0 6.5px;
    color: #0a91ab;
  }
`;

const TodayTalkSkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
  flex-direction: column;
  border: 1px solid #0a91ab;
  margin-top: 6px;
  font-size: 14px;
  gap: 8px;

  & button {
    height: 32px;
  }
`;

export default TodayTalk;
