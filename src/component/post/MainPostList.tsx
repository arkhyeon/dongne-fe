import { TbTriangleFilled } from 'react-icons/tb';
import styled from '@emotion/styled';
import { BoardType } from '../../type/BoardType';
import { userLevel } from '../../common/userCommon.ts';
import { LuSearch } from 'react-icons/lu';

function MainPostList({ title = '', postList = [] }: { title?: string; postList: BoardType[] }) {
  return (
    <MainPostListWrap>
      <p className="main-title-text">{title}</p>
      {postList.length ? (
        postList.map(wl => {
          return (
            <a href={`post/${wl.boardId}`} key={wl.boardId}>
              <MainPostItem>
                <RecommendWrap className="flex-cc">
                  <TbTriangleFilled />
                  {wl.boardLikesCount}
                </RecommendWrap>
                <MainPostWrap>
                  <p className="title-text">
                    {wl.title}
                    <span>
                      {wl.boardCommentCount === undefined ? '' : '[' + wl.boardCommentCount + ']'}
                    </span>
                  </p>
                  <div>
                    <span>{wl.channelName ?? '전체'}</span>
                    <span>{wl.createDate}</span>
                    <span>
                      {wl.nickname} LV.{userLevel(wl.point)}
                    </span>
                  </div>
                </MainPostWrap>
                {/*{wl.fileImg && <img src={wl.fileImg} alt="" />}*/}
                {wl.boardId % 3 === 1 && (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-TMLc35v2O__9GIggczxRojGubcSNSZ99e1eGS-aOg&s"
                    alt=""
                  />
                )}
              </MainPostItem>
            </a>
          );
        })
      ) : (
        <MainPostItem>
          <LuSearch style={{ marginLeft: '5px' }} />
          현재 조회된 게시글이 없습니다.
        </MainPostItem>
      )}
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
  overflow: hidden;

  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

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
