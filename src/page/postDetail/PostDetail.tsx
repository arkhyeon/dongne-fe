import styled from '@emotion/styled';
import PostRecommend from './components/PostRecommend';
import PostMenu from './components/PostMenu';
import PostComment from './components/PostComment';
import CommentWrite from './components/CommentWrite';
import ReactQuill from 'react-quill';
import PostNavigation from './components/PostNavigation';

const post = {
  id: 1,
  title: '알투웨어 알투웨어 R2ware',
  content: `<p>DBMS 전문업체 알투웨어가 테스트데이터 변환솔루션 시장에서 주도권을 강화하고 있다.</p><p><br></p><p>테스트데이터 변환솔루션은 IT시스템 개발시 개인정보를 테스트 용도로 사용하지 않도록 가명 처리된 데이터를 제공해 보호하고 테스트 품질 향상 및 운영 효율을 개선하는 솔루션이다. ISMS 인증 및 개인정보 영향평가 대상 프로젝트 수행에 필수 솔루션이다. 유럽 개인정보보호법(GDPR) 시행에 대비하고 국내 개인정보보호법 강화 움직임 등 개인정보 활용 규제 강화에 따라 수요가 늘고 있다.</p><p><br></p><p>알투웨어(대표 김덕환)는 국내 금융기관뿐 아니라 외국계 자동차캐피털, 공공기관, 병원 등에 테스트데이터 변환솔루션을 공급하며 고객사를 늘려가고 있다.</p><p><br></p><p>◇테스트데이터 변환으로 개인정보 보호</p><p><br></p><p>금융기관과 공공기업 개인정보 유출에는 여러 원인이 있다. 일반적으로 해킹을 원인으로 보지만 합법적 이용자에 의한 유출인 경우가 많다. 차세대 시스템 개발을 위해 개발사에 넘긴 고객 데이터가 유출되는 사례가 대표적이다. 일반적으로 기관이 새로운 제품 도입 및 개발, 유지·보수할 때 고객 데이터를 가져와 사용한다. 이때 실제 고객 데이터를 사용하면 개인정보가 유출될 우려가 있다. 이 같은 문제를 방지하기 위한 솔루션이 테스트데이터 변환솔루션이다. 테스트데이터 변환솔루션은 개인정보 등 민감 정보가 담긴 DB를 가상 데이터로 바꿔준다. 주민등록번호는 동일한 자릿수 숫자를 그대로 사용하지만 의미없는 번호로 바꿔주는 식이다. 주민번호와 동일하기 때문에 개발자는 개발 과정에서 생기는 오류와 시행착오를 줄일 수 있고 기업은 개인정보 유출 위험을 줄일 수 있다. 정부는 이용자 정보 조회·출력 통제 및 테스트시 주요 이용자 정보를 변환해 사용할 것을 의무화하고 있다. 금융감독원 전자금융 감독규정 시행세칙 9조 제10항은 '서비스 개발 또는 개선과 관련한 테스트 시 우선적으로 가상데이터를 사용해야 한다'고 규정하고 있다.</p><p><br></p><p>◇알투웨어, 빠른 성능 테스트데이터 변환 솔루션 제공</p><p><br></p><p>알투웨어는 지난해 하반기 주요 외국계 자동차 캐피털사에 테스트데이터 변환솔루션 'SQL 캔버스 트랜스(SQLCanvas Trans)'를 대량 공급했다. 알투웨어 테스트 데이터 변환 솔루션은 데이터 변경을 자동 처리해 개인정보 유출을 막는다. 고유 데이터 변환 및 DBMS별로 최적화된 이관 기술로 빠른 성능을 제공하고 변환서버 사용에 대한 제약 없는 시스템 구조 및 웹, CS 환경을 모두 지원하는 유연성을 갖고 있다. 특히 대량 데이터 벌크 로드(Bulk Load)시에도 데이터 누락 없는 완벽한 정합성 보장과 SAP ERP를 비롯한 기간 솔루션과 연동하는 API를 제공, 다양한 영역에 데이터 변환을 적용할 수 있다. 알투웨어는 최근 우리은행, 대구은행, 교보생명, 한화생명, 신용회복위원회, 현대차투자증권 등에 테스트데이터 변환 솔루션을 공급하며 품질과 신뢰성을 인정받고 있다.</p><p><br></p><p>알투웨어는 “데이터 변환 편의성을 제공해 인력비용 절감, 이관 및 복제 시간을 단축해 기업 운영비용을 낮출 수 있다”면서 “가장 효율적이며 경제적으로 주요 데이터를 변환하기 때문에 근본적 정보유출을 차단할 수 있는 솔루션”이라고 말했다.</p><p><br></p><p>권상희기자 shkwon@etnews.com</p><p><br></p><p>[더 자세한 내용은 기사원문 링크를 클릭하여 주십시오]</p>`,
  channel: '한기연',
  input_dt: '2023-01-02 04:30:53',
  level: 49,
  name: 'admin',
  checkin: 111,
  comment: 222,
  recommend: 333,
};

function PostDetail(props) {
  return (
    <PostWrap>
      <PostHeader>
        <p>{post.title}</p>
        <PostInfoWrap>
          <span>
            {post.channel} <span>|</span> {post.input_dt} <span>|</span> {post.level}
            {post.name}
          </span>
          <span>
            조회 : {post.checkin} | 댓글 : {post.comment} | 추천 : {post.recommend}
          </span>
        </PostInfoWrap>
      </PostHeader>
      <PostMain>
        <ReactQuill
          modules={{
            toolbar: {
              container: '#toolbar',
            },
          }}
          value={post.content}
          readOnly={true}
          className="readonly-quill"
        />
        <PostRecommend recommend={post.recommend} />
        <PostMenu />
      </PostMain>
      <CommentWrite />
      <PostComment />
      <PostNavigation />
    </PostWrap>
  );
}

const PostWrap = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 30px;
`;

const PostHeader = styled.div`
  & p {
    font-size: 28px;
  }
`;

const PostInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 5px;

  & span span {
    margin: 0 3px;
  }
`;

const PostMain = styled.div`
  padding-bottom: 10px;
  border-top: 1px solid #0a91ab;
  border-bottom: 1px solid #0a91ab;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default PostDetail;
