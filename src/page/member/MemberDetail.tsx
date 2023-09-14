import styled from '@emotion/styled';
import UserInfo from '../main/components/UserInfo';
import { NavLink, Outlet } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { client } from '../../common/axios';
import { UserMainInfo } from '../../type/UserType';
import Identicon from 'identicon.js';
import SHA256 from '../../common/Sha256';
import toHex from '../../common/toHex';
import { userInitValue } from '../../common/userCommon';

function MemberDetail() {
  const [userInfo, setUserInfo] = useState<UserMainInfo>(userInitValue);

  useLayoutEffect(() => {
    client.get<UserMainInfo>('user-main?page=0&size=3').then(res => {
      if (!res.profileImg) {
        res.profileImg = `data:image/png;base64,${new Identicon(
          SHA256(toHex(res.userId)),
          420,
        ).toString()}`;
      }
      setUserInfo(res);
    });
  }, []);
  return (
    <MemberDetailWrap>
      <MemberSideWrap>
        <UserInfo userInfo={userInfo} />
        <ul>
          <NavLink to="" end>
            작성 글
          </NavLink>
          <NavLink to="myComment">작성 댓글</NavLink>
          <NavLink to="postReaction">내 글 반응</NavLink>
          <NavLink to="memberEdit">내 정보 수정</NavLink>
          <NavLink to="/">돌아가기</NavLink>
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
