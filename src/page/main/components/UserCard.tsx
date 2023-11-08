import Progressbar from '../../../component/CommonComponents/Progressbar';
import styled from '@emotion/styled';
import { UserMainInfo } from '../../../type/UserType';
import { userLevel, userLevelGage } from '../../../common/userCommon';

function UserCard({ userInfo }: { userInfo: UserMainInfo }) {
  return (
    <UserInfoWrap>
      <img src={userInfo.profileImg} alt="" />
      <div style={{ width: '100%' }}>
        <a className="title-text" href="/memberDetail">
          {userInfo.nickname}
          <br />({userInfo.userId})
        </a>
        <ExperienceWrap>
          <p className="list-text">LV : {userLevel(userInfo.point)}</p>
          <p className="list-text">POINT : {userInfo.point}</p>
        </ExperienceWrap>
        <Progressbar progress={userLevelGage(userInfo.point)} />
      </div>
    </UserInfoWrap>
  );
}

const UserInfoWrap = styled.div`
  display: flex;
  gap: 16px;

  & a {
    line-height: 22px;
  }

  & img {
    min-width: 100px;
    height: 100px;
  }
`;

const ExperienceWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  gap: 5px;

  p {
    font-size: 12px;
  }
`;

export default UserCard;
