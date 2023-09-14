import styled from '@emotion/styled';
import TodayTalkItem from './components/TodayTalkItem';
import { Fragment, useEffect, useState } from 'react';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import { APIHotCategoryBoardType, CategoryBoardType } from '../../type/BoardType';

function TodayTalk() {
  const [talkList, setTalkList] = useState<CategoryBoardType[]>([]);

  useEffect(() => {
    getTalkList();
  }, []);

  const getTalkList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APIHotCategoryBoardType>(`board/hot`, {
        ...userCode,
        categoryCount: 3,
        dataCount: 5,
      })
      .then(res => setTalkList(res.findHotBoardsByCategoriesDtos));

    // client.post(`boardComment/hot`, { ...userCode, categoryCount: 2, dataCount: 5 });
  };

  return (
    <TodayTalkWrap>
      <p className="main-title-text">인기 카테고리 게시글</p>
      {talkList.map(tl => (
        <Fragment key={tl.subCategoryId}>
          <p className="title-text">{tl.subCategoryName}</p>
          <TodayTalkItem talkList={tl.findHotBoardsDtos} />
        </Fragment>
      ))}
      <p className="main-title-text">인기 카테고리 댓글</p>
      {talkList.map(
        (tl, i) =>
          i !== 2 && (
            <Fragment key={tl.subCategoryId}>
              <p className="title-text">{tl.subCategoryName}</p>
              <TodayTalkItem talkList={tl.findHotBoardsDtos} />
            </Fragment>
          ),
      )}
    </TodayTalkWrap>
  );
}

const TodayTalkWrap = styled.div`
  width: 288px;
  & > .main-title-text {
    margin-top: 8px;
  }

  & > .title-text {
    margin: 14px 0 6.5px;
    color: #0a91ab;
  }
`;

export default TodayTalk;
