import { TbTriangleFilled } from 'react-icons/tb';
import styled from '@emotion/styled';

function RecentBoard(props) {
  return (
    <RecentBoardWrap>
      <p className="main-title-text">Recent Board</p>
      {RecentList.map(wl => {
        return (
          <a href="#" key={wl.id}>
            <RecentBoardItem>
              <RecommendWrap>
                <TbTriangleFilled />
                {wl.rec}
              </RecommendWrap>
              <RecentBoardMain>
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
              </RecentBoardMain>
              <img src={wl.img} />
            </RecentBoardItem>
          </a>
        );
      })}
    </RecentBoardWrap>
  );
}

const RecentBoardWrap = styled.ul`
  width: 594px;
  background-color: #ffc045;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 16px;
`;

const RecentBoardItem = styled.li`
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #999;
  border-radius: 5px;

  & svg {
    color: #ffc045 !important;
    font-size: 18px;
  }

  & img {
    width: 120px;
    height: 90px;
    margin-right: 3px;
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

const RecentBoardMain = styled.div`
  flex: 1;

  & p span {
    font-size: 14px;
    margin-left: 8px;
    color: #0a91ab;
  }

  & > div {
    display: flex;
    margin-top: 8px;
    gap: 15px;
    & span {
      font-size: 14px;
      color: #999;
      display: block;
    }
  }
`;

export default RecentBoard;

const RecentList = [
  {
    id: 1,
    img: 'https://office.hiworks.com/r2ware.com/common/logo',
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
