import styled from '@emotion/styled';
import { TbTriangleFilled } from 'react-icons/tb';

function BestBoard() {
  return (
    <>
      <BestBoardWrap>
        <p className="main-title-text">Today Best</p>
        {bestList.map((bl, i) => {
          return (
            <a key={bl.id} href="#" className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">{bl.title}</span>
                <span>
                  <TbTriangleFilled />
                  {bl.recommend}
                </span>
              </TodayTalkPost>
            </a>
          );
        })}
      </BestBoardWrap>
      <BestBoardWrap>
        <p className="main-title-text">Weekly Best</p>
        {bestList.map((bl, i) => {
          return (
            <a key={bl.id} href="#" className="list-text">
              <TodayTalkPost>
                <span className="title-text">{i + 1}</span>
                <span className="text-ellipsis">{bl.title}</span>
                <span>
                  <TbTriangleFilled />
                  {bl.recommend}
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

  & a:first-of-type span:first-of-type {
    color: red;
  }
`;

const TodayTalkPost = styled.div`
  display: flex;
  align-items: center;

  & span:nth-of-type(1) {
    width: 18px;
    font-style: italic;
    margin-right: 10px;
  }
  & span:nth-of-type(2) {
    width: 100%;
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
  { id: 1, title: 'manner makes man manner makes man2222323232323233232323', recommend: 32 },
  { id: 2, title: 'manner makes man', recommend: 32 },
  { id: 3, title: 'manner makes man manner makes man333', recommend: 32 },
  { id: 4, title: 'manner makes man manner makes man', recommend: 32 },
  { id: 5, title: 'manner makes man manner makes man', recommend: 32 },
  { id: 6, title: 'manner makes man manner makes man2222323232323233232323', recommend: 32 },
  { id: 7, title: 'manner makes man', recommend: 32 },
  { id: 8, title: 'manner makes man manner makes man333', recommend: 32 },
  { id: 9, title: 'manner makes man manner makes man', recommend: 32 },
  { id: 10, title: 'manner makes man manner makes man', recommend: 32 },
];
