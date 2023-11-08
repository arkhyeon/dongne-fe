import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FiLogOut } from 'react-icons/fi';
import { HeaderSearchInput } from '../component/CommonComponents/SearchInput';
import { client } from '../common/axios';
import { removeCookie } from '../common/Cookie';
import { APIUserRankingType, UserRankingType } from '../type/UserType';
import { useNavigate } from 'react-router-dom';
import { searchStore } from '../store/SearchStore.ts';
import { DC } from '../store/ToastStore.ts';

function Header() {
  const { setSearchText } = searchStore();
  const [topWriterList, setTopWriterList] = useState<UserRankingType[]>([]);
  const navigate = useNavigate();
  useEffect(() => getTopWriterList(), []);

  const getTopWriterList = () => {
    client
      .post<APIUserRankingType>(`user/ranking?page=0&size=3`, {
        nickname: '',
      })
      .then(res => setTopWriterList(res.userRankingDtos));
  };

  const logout = async () => {
    if (!(await DC.confirm('로그아웃 하시겠습니까?'))) {
      return;
    }
    client
      .post('user/logout')
      .then(() => {
        DC.alertSuccess('정상적으로 로그아웃되셨습니다.');
        navigate('/login');
      })
      .catch(err => console.log(err))
      .finally(() => {
        removeCookie('accessToken');
        removeCookie('refreshToken');
      });
  };

  return (
    <HeaderWrap>
      <LogoWrap>
        <img src="/src/asset/img/logo2.png" />
        <TopWriterWrap>
          <p>Top Writers</p>
          <div>
            <SlideWriter>
              {topWriterList.map(tl => {
                return <div key={tl.userId}>{tl.nickname}</div>;
              })}
            </SlideWriter>
          </div>
        </TopWriterWrap>
      </LogoWrap>

      <HeaderSearchInput
        onChange={e => setSearchText(e.target.value)}
        searchEvent={() => navigate('search')}
      />
      <WidgetWrap>
        <FiLogOut onClick={() => logout()} />
      </WidgetWrap>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  width: 100%;
  min-width: 1230px;
  height: 60px;
  background-color: #ffc045;
  display: flex;
  align-items: center;
  padding-right: 40px;
  gap: 100px;
`;

const LogoWrap = styled.div`
  height: 60px;
  display: flex;
  gap: 30px;
  & img {
    margin: 0 25px;
  }
`;

const TopWriterWrap = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;
    height: 20px;
    overflow: hidden;
  }
`;

const SlideWriter = styled.div`
  width: 100%;
  position: relative;
  animation: rankView 3s linear infinite;

  @keyframes rankView {
    0% {
      top: 0;
    }
    33% {
      top: -20px;
    }
    66% {
      top: -40px;
    }
    100% {
      top: 0;
    }
  }
`;

const WidgetWrap = styled.div`
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 60px;

  & > svg {
    font-size: 24px;
    cursor: pointer;
  }
`;

export default Header;
