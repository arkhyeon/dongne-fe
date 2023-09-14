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

const bestList = [
  {
    boardId: 92,
    title: '모바일 앱 개발에서의 성능 향상 전략',
    boardLikesCount: 14,
    channelName: '개발자모여라',
  },
  {
    boardId: 64,
    title: '클라우드 보안을 위한 암호화 기술',
    boardLikesCount: 13,
    channelName: '개발자모여라',
  },
  {
    boardId: 93,
    title: '사이버 위협 탐지를 위한 AI 기술',
    boardLikesCount: 13,
    channelName: '개발자모여라',
  },
  {
    boardId: 67,
    title: '네트워크 가상화 기술과 솔루션',
    boardLikesCount: 12,
    channelName: '개발자모여라',
  },
  {
    boardId: 77,
    title: '빅데이터 처리를 위한 NoSQL 데이터베이스',
    boardLikesCount: 10,
    channelName: '개발자모여라',
  },
  {
    boardId: 89,
    title: '사용자 경험 디자인을 위한 테스트 기법',
    boardLikesCount: 10,
    channelName: '개발자모여라',
  },
  {
    boardId: 73,
    title: '소프트웨어 테스팅의 기본 원리와 방법',
    boardLikesCount: 10,
    channelName: '개발자모여라',
  },
  {
    boardId: 99,
    title: '빅데이터 처리를 위한 분산 파일 시스템',
    boardLikesCount: 9,
    channelName: '개발자모여라',
  },
  {
    boardId: 83,
    title: '사용자 중심의 인터페이스 디자인 패턴',
    boardLikesCount: 9,
    channelName: '개발자모여라',
  },
  {
    boardId: 96,
    title: '사용자 경험 디자인을 위한 워크샵',
    boardLikesCount: 8,
    channelName: '개발자모여라',
  },
];
