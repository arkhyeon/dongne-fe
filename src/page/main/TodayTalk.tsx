import styled from '@emotion/styled';
import TodayTalkItem from './components/TodayTalkItem';

function TodayTalk(props) {
  return (
    <TodayTalkWrap>
      <p className="main-title-text">Today Talk</p>
      <p className="title-text">SQLCanvas1</p>
      <TodayTalkItem talkList={talkList} />
      <p className="title-text">SQLCanvas2</p>
      <TodayTalkItem talkList={talkList} />
      <p className="title-text">SQLCanvas3</p>
      <TodayTalkItem talkList={talkList} />
    </TodayTalkWrap>
  );
}

const TodayTalkWrap = styled.div`
  width: 288px;
  margin-top: 8px;

  & > .title-text {
    margin: 12px 0 6.5px;
    color: #0a91ab;
  }
`;

export default TodayTalk;

const talkList = [
  { id: 1, title: 'manner makes man manner makes man222', commentTotal: 32 },
  { id: 2, title: 'manner makes man', commentTotal: 32 },
  { id: 3, title: 'manner makes man manner makes man333', commentTotal: 32 },
  { id: 4, title: 'manner makes man manner makes man', commentTotal: 32 },
  { id: 5, title: 'manner makes man manner makes man', commentTotal: 32 },
];
