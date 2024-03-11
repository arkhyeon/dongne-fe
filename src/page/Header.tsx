import styled from '@emotion/styled';
import { FiLogOut } from 'react-icons/fi';
import { HeaderSearchInput } from '../component/CommonComponents/SearchInput';
import { client } from '../common/axios';
import { removeCookie } from '../common/Cookie';
import { useNavigate } from 'react-router-dom';
import { integratedSearchStore } from '../store/SearchStore.ts';
import { DC } from '../store/ToastStore.ts';

function Header() {
  const { searchText, setSearchText } = integratedSearchStore();
  const navigate = useNavigate();

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
        <img className="c-pointer" src="/src/asset/img/logo2.png" onClick={() => navigate('/')} />
      </LogoWrap>
      <HeaderSearchInput
        onChange={e => setSearchText(e.target.value)}
        searchEvent={() => {
          if (searchText === '') {
            DC.alert('검색어를 입력해 주세요.');
            return;
          }
          navigate('search');
        }}
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
