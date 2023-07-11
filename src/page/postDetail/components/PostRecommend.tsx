import styled from '@emotion/styled';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
function PostRecommend({ recommend }) {
  return (
    <PostRecWrap className="flex-cc">
      <PostRecButton className="flex-cc animate-up">
        <BiSolidUpArrow />
      </PostRecButton>
      <PostRecButton className="flex-cc">{recommend}</PostRecButton>
      <PostRecButton className="flex-cc animate-down">
        <BiSolidDownArrow />
      </PostRecButton>
    </PostRecWrap>
  );
}

const PostRecWrap = styled.div`
  width: 100%;
  gap: 15px;
`;

const PostRecButton = styled.div`
  width: 60px;
  height: 37px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  cursor: pointer;

  & svg {
    color: #ffc045;
  }
`;

export default PostRecommend;
