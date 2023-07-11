import styled from '@emotion/styled';
import UserInfo from '../main/components/UserInfo';
import BoardList from '../boardList/BoardList';
import MainPostList from '../../component/post/MainPostList';
import { recentList } from '../../../data';
import { NavLink, Outlet } from 'react-router-dom';

function MemberDetail(props) {
  return (
    <MemberDetailWrap>
      <MemberSideWrap>
        <UserInfo />
        <ul>
          <NavLink to="" end>
            작성 글
          </NavLink>
          <NavLink to="myComment">작성 댓글</NavLink>
          <NavLink to="postReaction">내 글 반응</NavLink>
          <NavLink to="memberEdit">내 정보 수정</NavLink>
        </ul>
      </MemberSideWrap>
      <MemberInfoWrap>
        <Outlet />
      </MemberInfoWrap>
    </MemberDetailWrap>
  );
}

const MemberDetailWrap = styled.div`
  width: 1180px;
  margin: 30px auto;
  display: flex;
`;

const MemberSideWrap = styled.div`
  width: 280px;

  & ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-top: 1px solid #0a91ab;
    padding-right: 15px;
    margin-top: 15px;

    & a {
      width: 100%;
      height: 34px;
      font-size: 14px;
      border-radius: 10px;
      margin-top: 15px;
      line-height: 34px;
      padding: 0 15px;
      transition: 0.3s;

      &:hover,
      &.active {
        background-color: #ffc045;
      }
    }
  }
`;

const MemberInfoWrap = styled.div`
  width: 900px;
  border-left: 1px solid #0a91ab;
  padding-left: 15px;
`;

export default MemberDetail;
