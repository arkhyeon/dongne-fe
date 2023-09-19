import styled from '@emotion/styled';
import { TbTriangleFilled } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { client } from '../../common/axios';
import { getCookie } from '../../common/Cookie';
import { APIBoardType, BoardType } from '../../type/BoardType';

function BestBoard() {
  const [todayBestList, setTodayBestList] = useState<BoardType[]>();
  const [weeklyBestList, setWeeklyBestList] = useState<BoardType[]>();

  useEffect(() => getBestBoardList(), []);

  const getBestBoardList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APIBoardType>(`board/best?page=0&size=10`, {
        ...userCode,
        period: 'WEEK',
      })
      .then(res => setWeeklyBestList(res.findBestBoardsByPeriodDtos));

    client
      .post<APIBoardType>(`board/best?page=0&size=10`, {
        ...userCode,
        period: 'DAY',
      })
      .then(res => setTodayBestList(res.findBestBoardsByPeriodDtos));
  };

  return (
    <>
      <BestBoardWrap>
        <p className="main-title-text">Today Best</p>
        {todayBestList?.map((bl, i) => {
          return (
            <a key={bl.boardId} href={`post/${bl.boardId}`} className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">
                  <span>[{bl.channelName}]</span> {bl.title}
                </span>
                <span>
                  <TbTriangleFilled />
                  {bl.boardLikesCount}
                </span>
              </TodayTalkPost>
            </a>
          );
        })}
      </BestBoardWrap>
      <BestBoardWrap>
        <p className="main-title-text">Weekly Best</p>
        {weeklyBestList?.map((bl, i) => {
          return (
            <a key={bl.boardId} href={`post/${bl.boardId}`} className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">
                  <span>[{bl.channelName}]</span> {bl.title}
                </span>
                <span>
                  <TbTriangleFilled />
                  {bl.boardLikesCount}
                </span>
              </TodayTalkPost>
            </a>
          );
        })}
      </BestBoardWrap>
    </>
  );
}

const BestBoardWrap = styled.div`
  width: 441px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;

  & > a:first-of-type div > span:first-of-type {
    color: red;
  }
`;

const TodayTalkPost = styled.div`
  display: flex;
  align-items: center;

  & > span:nth-of-type(1) {
    width: 18px;
    font-style: italic;
    margin-right: 10px;
  }
  & span:nth-of-type(2) {
    width: 100%;
    span {
      font-size: 11px;
      color: #777;
    }
  }
  & span:nth-of-type(3) {
    color: #777;
    margin-left: 5px;
    display: flex;
    align-items: flex-end;
    gap: 3px;

    & svg {
      color: #ffc045 !important;
      font-size: 16px;
    }
  }
`;

export default BestBoard;
