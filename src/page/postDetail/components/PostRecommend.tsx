import styled from '@emotion/styled';
import { GoThumbsup } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { client } from '../../../common/axios.ts';

function PostRecommend({
  boardId,
  isLiked,
  recommend,
}: {
  boardId: string | undefined;
  isLiked: boolean;
  recommend: number;
}) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(isLiked);
  }, [boardId]);

  const setPostLike = () => {
    client.post(`boardLikes/check/${boardId}`).then(res => console.log(res));
  };

  return (
    <PostRecWrap className="flex-cc" onClick={() => setPostLike()}>
      <GoThumbsup className={like ? 'animation-like' : ''} />
      {like ? recommend + 1 : recommend}
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
