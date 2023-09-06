import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';

function CommentViewer({ initialValue = '' }: { initialValue: string }) {
  const [collapse, setCollapse] = useState(true);
  const [canCollapse, setCanCollapse] = useState(false);
  const viewerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!viewerRef) return;
    const clampDiv = viewerRef.current.children[0];
    if (clampDiv.clientHeight !== clampDiv.scrollHeight) {
      setCanCollapse(true);
    }
  }, [viewerRef]);

  return (
    <ViewerWrap ref={viewerRef} className={collapse ? 'collapse-on' : ''}>
      <Viewer initialValue={initialValue} />
      {canCollapse && (
        <span onClick={() => setCollapse(prevState => !prevState)}>
          {collapse ? '자세히보기' : '간략히'}
        </span>
      )}
    </ViewerWrap>
  );
}

const ViewerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & span {
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
  }
  &.collapse-on > div {
    max-height: 215px;
    overflow: hidden;
  }

  &.collapse-on .toastui-editor-contents {
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default CommentViewer;
