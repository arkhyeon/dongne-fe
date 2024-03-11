import styled from '@emotion/styled';
import { GoThumbsup } from 'react-icons/go';
import { client } from '../../../common/axios.ts';

function PostRecommend({
  boardId,
  isLiked,
  recommend,
  getBoardDetail,
}: {
  boardId: string | undefined;
  isLiked: boolean;
  recommend: number;
  getBoardDetail: () => void;
}) {
  const setPostLike = async () => {
    if (isLiked) {
      await client.post(`boardLikes/cancel/${boardId}`).then(res => console.log(res));
    } else {
      await client.post(`boardLikes/check/${boardId}`).then(res => console.log(res));
    }
    getBoardDetail();
  };

  return (
    <PostRecWrap className="flex-cc" onClick={() => setPostLike()}>
      <GoThumbsup className={isLiked ? 'animation-like' : ''} />
      {recommend}
    </PostRecWrap>
  );
}

const PostRecWrap = styled.div`
  width: 120px;
  height: 42px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  gap: 8px;

  &:has(.animation-like) {
    background-color: #ffc045;

    & .animation-like {
      color: #0a91ab;
    }
  }

  & svg {
    transition: 0.3s;
    font-size: 22px;
    color: #ffc045;
  }
`;

export default PostRecommend;
