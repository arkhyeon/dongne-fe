import styled from '@emotion/styled';
import PostRecommend from './components/PostRecommend';
import PostMenu from './components/PostMenu';
import PostComment from './components/PostComment';
import CommentWrite from './components/CommentWrite';
import ReactQuill from 'react-quill';
import PostNavigation from './components/PostNavigation';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '../../common/Cookie';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useQuery, UseQueryResult } from 'react-query';
import { client } from '../../common/axios';
import { BoardDetailType } from '../../type/BoardType';

function PostDetail() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { data, isFetching }: UseQueryResult<BoardDetailType> = useQuery('getPostDetail', () =>
    client.get(`board/41`),
  );

  useEffect(() => {
    if (!boardId) navigate('nopost');
  }, [boardId]);

  const editPost = () => {
    navigate(`/postwrite`, { state: data });
  };

  return (
    <PostWrap>
      {!isFetching && data && (
        <>
          <PostHeader>
            <p>{data.title}</p>
            <PostInfoWrap>
              <span>
                {data.channelName ?? '없음'} <span>|</span> {data.createDate} <span>|</span>
                {data.userId}
              </span>
              <span>
                조회 : {data.viewCnt} | 댓글 : {data.boardCommentCount} | 추천 :{' '}
                {data.boardLikesCount}
                {data.userId === getCookie('userId') && (
                  <>
                    <span>|</span>
                    <span className="hide-option">
                      <MdDelete />
                      삭제
                    </span>
                    <span>|</span>
                    <span onClick={editPost} className="hide-option">
                      <MdEdit />
                      수정
                    </span>
                  </>
                )}
              </span>
            </PostInfoWrap>
          </PostHeader>
          <PostMain>
            <ReactQuill
              modules={{
                toolbar: {
                  container: '#toolbar',
                },
              }}
              value={data.content}
              readOnly={true}
              className="readonly-quill"
            />
            <PostRecommend
              boardId={boardId}
              isLiked={data.isLiked}
              recommend={data.boardLikesCount}
            />
            <PostMenu boardId={boardId ?? '0'} />
          </PostMain>
          <PostNavigation boardId={boardId ?? '0'} />
          <CommentWrite />
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

const PostHeader = styled.div`
  & p {
    font-size: 28px;
  }
`;

const PostInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 5px;

  & span span {
    margin: 0 3px;
  }

  & span.hide-option {
    cursor: pointer;
    &:hover {
      color: #ffc045;
    }
  }

  & svg {
    position: relative;
    font-size: 15px;
    top: 2px;
  }
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
