import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FiLogOut } from 'react-icons/fi';
import { HeaderSearchInput } from '../component/CommonComponents/SearchInput';
import { loginAxios } from '../common/axios';
import { removeCookie } from '../common/Cookie';
import { UserRankType } from '../type/UserType';

function Header() {
  const [topWriterList, setTopWriterList] = useState<UserRankType[]>([]);
  const topWriterRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    setTopWriterList(initTopWriters);
    let moveRange = 0;
    setInterval(() => {
      moveRange -= 20;
      if (moveRange <= topWriterList.length * -20) {
        moveRange = 0;
      }

      if (topWriterRef.current) {
        topWriterRef.current.style.transform = `translateY(${moveRange}px)`;
      }
    }, 1000);
  }, []);

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');

    loginAxios
      .post('user/logout')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <HeaderWrap>
      <LogoWrap>
        <img src="./src/asset/img/logo2.png" />
        <TopWriterWrap>
          <p>Top Writers</p>
          <div>
            <SlideWriter ref={topWriterRef}>
              {topWriterList.map(tl => {
                return <div key={tl.rank}>{tl.userId}</div>;
              })}
            </SlideWriter>
          </div>
        </TopWriterWrap>
      </LogoWrap>

      <HeaderSearchInput />
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
  //color: #0a91ab;
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
  transition: 1s;
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

const initTopWriters = [
  {
    rank: 1,
    userId: 'COC',
  },
  {
    rank: 2,
    userId: 'ABC',
  },
  {
    rank: 3,
    userId: 'CMS',
  },
];
