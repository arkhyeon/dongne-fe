import styled from '@emotion/styled';
import { HiCheck, HiShare } from 'react-icons/hi';
import SirenReport from '../../../component/CommonComponents/SirenReport';
import React, { useEffect, useState } from 'react';

function PostMenu({ boardId }: { boardId: string }) {
  const [share, setShare] = useState(false);
  const postShare = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement) {
      setShare(true);
      navigator.clipboard.writeText(window.location.href);
    }
  };

  useEffect(() => setShare(false), [boardId]);

  return (
    <PostMenuWrap>
      <PostMenuItem className="flex-cc" onClick={postShare}>
        {share ? (
          <>
            <HiCheck />
            복사완료
          </>
        ) : (
          <>
            <HiShare />
            공유하기
          </>
        )}
      </PostMenuItem>
      <SirenReport boardId={boardId} />
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
