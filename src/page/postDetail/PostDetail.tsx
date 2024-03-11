import styled from '@emotion/styled';
import PostRecommend from './components/PostRecommend';
import PostMenu from './components/PostMenu';
import PostComment from './components/PostComment';
import CommentWrite from './components/CommentWrite';
import ReactQuill from 'react-quill';
import PostNavigation from './components/PostNavigation';
import DelModWidget from './components/DelModWidget';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '../../common/Cookie';
import { client } from '../../common/axios';
import { BoardDetailType } from '../../type/BoardType';
import { userLevel } from '../../common/userCommon.ts';
import { DC } from '../../store/ToastStore.ts';
import { CommentStore } from '../../store/CommentStore.ts';
import { UserStore } from '../../store/UserStore.ts';

function PostDetail() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [boardDetail, setBoardDetail] = useState<BoardDetailType>();
  const { getCommentList, resetComment } = CommentStore();
  const { UserInfo } = UserStore();

  useEffect(() => {
    if (!boardId) navigate('nopost');

    getBoardDetail();
  }, [boardId]);

  const getBoardDetail = () => {
    client.get<BoardDetailType>(`board/${boardId}`).then(res => setBoardDetail(res));
  };

  const editPost = () => navigate(`/postwrite`, { state: boardDetail });

  const insertComment = (commentText: string) => {
    client.post('boardComment', { boardId, content: commentText }).then(() => {
      if (boardId) {
        resetComment();
        getCommentList(boardId, 0);
      }
      DC.alert('댓글을 작성하셨습니다.');
    });
  };

  return (
    <PostWrap>
      {boardDetail && (
        <>
          <div>
            <h2>{boardDetail.title}</h2>
            <DelModWidget
              modifyFunc={editPost}
              deleteFunc={() => console.log('del')}
              hideOption={boardDetail.userId === getCookie('userId')}
            >
              <span>
                {boardDetail.channelName ?? '전체'} <span>|</span> {boardDetail.createDate}{' '}
                <span>|</span>
                LV.{userLevel(boardDetail.point)} {boardDetail.nickname}
              </span>
              <span>
                조회 : {boardDetail.viewCnt} | 댓글 : {boardDetail.boardCommentCount} | 추천 :{' '}
                {boardDetail.boardLikesCount}
              </span>
            </DelModWidget>
          </div>
          <PostMain>
            <ReactQuill
              modules={{
                toolbar: {
                  container: '#toolbar',
                },
              }}
              value={boardDetail.content}
              readOnly={true}
              className="readonly-quill"
            />
            <PostRecommend
              boardId={boardId}
              isLiked={boardDetail.isLiked}
              recommend={boardDetail.boardLikesCount}
              getBoardDetail={getBoardDetail}
            />
            <PostMenu boardId={boardId ?? '0'} />
          </PostMain>
          <PostNavigation board={boardDetail} />
          <CommentWrite confirm={insertComment}>
            LV.{userLevel(UserInfo.point)} {UserInfo.nickname}
          </CommentWrite>
          <PostComment boardId={boardId ?? '0'} />
        </>
      )}
    </PostWrap>
  );
}

const PostWrap = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 30px;
`;

const PostMain = styled.div`
  padding-bottom: 10px;
  border-top: 1px solid #0a91ab;
  border-bottom: 1px solid #0a91ab;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default PostDetail;
