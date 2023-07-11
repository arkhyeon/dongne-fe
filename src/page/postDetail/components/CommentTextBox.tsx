import { elapsedDate } from '../../../common/common';
import SirenReport from '../../../component/CommonComponents/SirenReport';
import styled from '@emotion/styled';
import CommentViewer from '../../../component/post/CommentViewer';

function CommentTextBox({ content, children }) {
  const myName = 'r2ware';
  return (
    <CommentMain>
      <div className="list-text">
        <span>LV.{content.level}</span>
        <span>{content.name}</span>
        <span> | {elapsedDate(content.input_dt)}</span>
        {myName !== content.name && <SirenReport />}
      </div>
      <CommentViewer initialValue={content.comment} />
      {children}
    </CommentMain>
  );
}

const CommentMain = styled.div`
  width: 100%;

  & div.list-text {
    display: flex;
    align-items: center;
    gap: 5px;

    & span {
      font-weight: bold;
    }

    & span:nth-of-type(n + 3) {
      color: #666;
      margin-left: 3px;
      font-weight: normal;
    }
  }

  & & {
    padding-left: 20px;
    border-top: 1px dashed #aaa;
    padding-top: 10px;
  }
`;

export default CommentTextBox;
