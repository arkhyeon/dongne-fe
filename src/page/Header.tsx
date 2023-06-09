import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FiLogOut } from 'react-icons/fi';
import { HeaderSearchInput } from '../component/CommonComponents/SearchInput';

function Header(props) {
  const [topWriterList, setTopWriterList] = useState([...initTopWriters]);
  const topWriterRef = useRef(null);

  useEffect(() => {
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

  return (
    <HeaderWrap>
      <LogoWrap>
        <img src="img" />
        <TopWriterWrap>
          <p>Top Writers</p>
          <div>
            <SlideWriter ref={topWriterRef}>
              {topWriterList.map(tl => {
                return <div key={tl.id}>{tl.name}</div>;
              })}
            </SlideWriter>
          </div>
        </TopWriterWrap>
      </LogoWrap>

      <HeaderSearchInput />
      <WidgetWrap>
        <FiLogOut />
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
    width: 100px;
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
    id: 1,
    name: 'COC',
  },
  {
    id: 2,
    name: 'ABC',
  },
  {
    id: 3,
    name: 'CMS',
  },
];
