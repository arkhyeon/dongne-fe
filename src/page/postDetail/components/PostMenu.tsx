import styled from '@emotion/styled';
import { PiSirenFill } from 'react-icons/pi';
import { HiShare } from 'react-icons/hi';
import { BsCheck } from 'react-icons/bs';
import SirenReport from '../../../component/CommonComponents/SirenReport';

function PostMenu(props) {
  const postShare = e => {
    console.log(e);
    e.target.innerHTML =
      '<svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></svg>복사 완료';
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <PostMenuWrap>
      <PostMenuItem className="flex-cc" onClick={postShare}>
        <HiShare />
        공유하기
      </PostMenuItem>
      <SirenReport />
    </PostMenuWrap>
  );
}

const PostMenuWrap = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: right;
  font-size: 12px;
  gap: 8px;
`;

const PostMenuItem = styled.div`
  gap: 2px;
  cursor: pointer;

  &:hover {
    color: #ffc045;
  }

  & svg {
    font-size: 14px;
  }
`;

export default PostMenu;
