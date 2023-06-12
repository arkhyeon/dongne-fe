import React from 'react';
import styled from '@emotion/styled';
import { TbTriangleFilled } from 'react-icons/tb';

function BoardMain(props) {
  return (
    <BoardMainWrap>
      <EventBoardWrap>
        {eventList.map(e => {
          return (
            <EventBoardItem key={e.id}>
              <img src={e.img} />
              <a href="#">
                <p className="text-ellipsis">{e.title}</p>
                <span className="text-ellipsis">{e.text}</span>
              </a>
            </EventBoardItem>
          );
        })}
      </EventBoardWrap>
      <WeeklyBoardWrap>
        <p className="main-title-text">Weekly Best</p>
        {weeklyList.map(wl => {
          return (
            <a href="#" key={wl.id}>
              <WeeklyBoardItem>
                <RecommendWrap>
                  <TbTriangleFilled />
                  {wl.rec}
                </RecommendWrap>
                <WeeklyBoardMain>
                  <p className="title-text">
                    {wl.title}
                    <span>[{wl.commentTotal}]</span>
                  </p>
                  <div>
                    <span>{wl.toc}</span>
                    <span>{wl.inputDate}</span>
                    <span>
                      {wl.writer} LV.{wl.level}
                    </span>
                  </div>
                </WeeklyBoardMain>
                <img src={wl.img} />
              </WeeklyBoardItem>
            </a>
          );
        })}
      </WeeklyBoardWrap>
    </BoardMainWrap>
  );
}

const BoardMainWrap = styled.div`
  width: 900px;
`;

const EventBoardWrap = styled.ul`
  width: 100%;
  display: flex;
  gap: 18px;
  margin-bottom: 30px;
`;

const EventBoardItem = styled.li`
  width: 288px;
  background-color: #ddd;

  & img {
    width: 100%;
    height: 265px;
  }
`;

const WeeklyBoardWrap = styled.ul`
  width: 100%;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 16px;
`;

const WeeklyBoardItem = styled.li`
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #999;
  border-radius: 5px;

  & svg {
    color: #0a91ab !important;
    font-size: 18px;
  }

  & img {
    width: 120px;
    height: 92px;
  }
`;

const RecommendWrap = styled.div`
  width: 82px;
  gap: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WeeklyBoardMain = styled.div`
  flex: 1;

  & p span {
    font-size: 14px;
    margin-left: 8px;
    color: #0a91ab;
  }

  & > div {
    display: flex;
    margin-top: 8px;
    & span {
      width: 100px;
      font-size: 14px;
      color: #999;
      display: block;
    }

    & span:last-of-type {
      width: 300px;
    }
  }
`;

export default BoardMain;

const eventList = [
  { id: 1, img: '/img', title: 'R2WARE', text: 'r2ware123' },
  { id: 2, img: '/img', title: 'R2WARE', text: 'r2ware123' },
  { id: 3, img: '/img', title: 'R2WARE', text: 'r2ware123r2ware123r2ware123r2ware123r2ware123' },
];

const weeklyList = [
  {
    id: 1,
    img: '/img',
    title: 'R2WARE',
    rec: 3,
    writer: '방주현연구원',
    toc: '기술연구소',
    inputDate: '3시간전',
    commentTotal: 41,
    level: 77,
  },
  {
    id: 1,
    img: '/img',
    title: 'R2WARE',
    rec: 322,
    writer: '방주현연구원',
    toc: '기술연구소',
    inputDate: '4시간전',
    commentTotal: 42,
    level: 77,
  },
  {
    id: 1,
    img: '/img',
    title: 'R2WARE',
    rec: 12,
    writer: '방주현연구원',
    toc: '기술연구소',
    inputDate: '5시간전',
    commentTotal: 43,
    level: 77,
  },
  {
    id: 1,
    img: '/img',
    title: 'R2WARE',
    rec: 3,
    writer: '방주현연구원',
    toc: '기술연구소',
    inputDate: '3시간전',
    commentTotal: 41,
    level: 77,
  },
  {
    id: 1,
    img: '/img',
    title: 'R2WARE',
    rec: 322,
    writer: '방주현연구원',
    toc: '기술연구소',
    inputDate: '4시간전',
    commentTotal: 42,
    level: 77,
  },
  {
    id: 1,
    img: '/img',
    title: 'R2WARE',
    rec: 12,
    writer: '방주현연구원',
    toc: '기술연구소',
    inputDate: '5시간전',
    commentTotal: 43,
    level: 77,
  },
];
