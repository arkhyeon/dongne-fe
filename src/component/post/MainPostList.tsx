import { TbTriangleFilled } from 'react-icons/tb';
import styled from '@emotion/styled';
import boardList from '../../page/boardList/BoardList';

function MainPostList({ title = '', postList = [] }) {
  return (
    <MainPostListWrap>
      <p className="main-title-text">{title}</p>
      {postList.map(wl => {
        return (
          <a href="src/page/main#" key={wl.id}>
            <MainPostItem>
              <RecommendWrap className="flex-cc">
                <TbTriangleFilled />
                {wl.rec}
              </RecommendWrap>
              <MainPostWrap>
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
              </MainPostWrap>
              <img src={wl.img} />
            </MainPostItem>
          </a>
        );
      })}
    </MainPostListWrap>
  );
}

const MainPostListWrap = styled.ul`
  width: 100%;
  min-width: 594px;
  background-color: #ffc045;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 5px;
`;

const MainPostItem = styled.li`
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
  flex-direction: column;
`;

const MainPostWrap = styled.div`
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

export default MainPostList;
