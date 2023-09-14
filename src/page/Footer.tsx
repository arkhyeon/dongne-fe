import styled from '@emotion/styled';

function Footer() {
  return (
    <FooterWrap>
      <img src="" />
      <div>
        <a>XX소개</a>
        <a>XXX소개</a>
        <a>XX문의</a>
        <a>버그제보</a>
      </div>
      <div>
        <FooterMenu>
          <div>
            <a>XX이벤트</a>
            <a href="/board">동네 최신글</a>
          </div>
          <div>
            <a>개인정보 처리방침</a>
            <a>서비스 이용약관</a>
          </div>
        </FooterMenu>
        <CopyRighter>
          ⓒ 2023 DongNeCommunity, Site design has been benchmarked on all sites and rights have been
          waived. Do as you please.
        </CopyRighter>
      </div>
    </FooterWrap>
  );
}

const FooterWrap = styled.div`
  width: 100%;
  min-width: 1230px;
  height: 200px;
  margin-top: 10px;
  border-top: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  font-size: 14px;
  user-select: none;
  background-color: #ffc045;

  & a {
    display: block;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
      color: #fefefe;
    }
  }
`;

const FooterMenu = styled.div`
  display: flex;
  gap: 100px;
`;

const CopyRighter = styled.div`
  height: 60px;
  line-height: 60px;
  font-size: 12px;
`;
export default Footer;
