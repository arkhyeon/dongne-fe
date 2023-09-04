import Progressbar from '../../../component/CommonComponents/Progressbar';
import styled from '@emotion/styled';
import { UserMainInfo } from '../../../type/UserType';
import { userLevel, userLevelGage } from '../../../common/userCommon';

function UserInfo({ userInfo }: { userInfo: UserMainInfo }) {
  return (
    <UserInfoWrap>
      <img width="420" height="420" src={userInfo.profileImg} />
      <div>
        <p className="title-text">
          {userInfo.nickname}({userInfo.userId})
        </p>
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

  & img {
    width: 100px;
    height: 100px;
  }
`;

const ExperienceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
`;

export default UserInfo;
