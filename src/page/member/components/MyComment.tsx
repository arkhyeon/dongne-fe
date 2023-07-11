import { recentList } from '../../../../data';
import MainPostList from '../../../component/post/MainPostList';
import Comment from '../../postDetail/components/Comment';
import CommentTextBox from '../../postDetail/components/CommentTextBox';
const commentList = [
  {
    id: 1,
    level: 77,
    name: 'r2ware',
    input_dt: '2023-06-24 12:00:32',
    comment:
      '<p>알투웨어는 협력사인 솔루텍시스템과 공동으로 6월 19일~20일 1박 2일 동안 서귀포 칼호텔에서</p><p><br></p><p>차세대 대학정보화 시스템을 주제로 2019년 대학정보화 협의회 심포지엄에 참석하여 SQLcanvas Trans 홍보하였습니다.</p><p><br></p><p>마침 여러 대학들이 ISMS(정보보호관리체계) 인증 기관으로 선정됨에 따라 김덕환 대표이사의 제품 설명에</p><p><br></p><p>대학 관계자들의 질의가 잇따르는 등 많은 관심을 표명하였습니다.</p><p><br></p><p>ISMS는 주요 정보자산 유출과 피해를 사전에 예방하기 위해 기업 등이 수립·운영 중인 정보보호 체계가 적합한지 인증하는 제도이며.</p><p><br></p><p>지난 2월 ‘정보통신망법 이용 촉진 및 정보보호 등에 관한 법률’ 개정에 따라 정보통신망서비스 제공자등 외에도</p><p><br></p><p>6월부터 세입 1,500억원 이상 상급종합병원과 재학생 수 1만명 이상 학교가 의무 인증 대상으로 추가 되었습니다.</p><p><br></p><p>앞으로 알투웨어와 솔루텍시스템은 차별화된 기술력과 공동 마케팅 활동을 통해 다양한 고객층을 확보하기 위해 노력할 예정입니다.</p>',
    recommend: 22,
    replyList: [
      {
        id: 1,
        level: 88,
        name: '사장님',
        input_dt: '2023-06-25 12:00:32',
        comment:
          '<p>마침 여러 대학들이 ISMS(정보보호관리체계) 인증 기관으로 선정됨에 따라 김덕환 대표이사의 제품 설명에</p><p><br></p><p>대학 관계자들의 질의가 잇따르는 등 많은 관심을 표명하였습니다.</p><p><br></p><p>ISMS는 주요 정보자산 유출과 피해를 사전에 예방하기 위해 기업 등이 수립·운영 중인 정보보호 체계가 적합한지 인증하는 제도이며.</p><p><br></p><p>지난 2월 ‘정보통신망법 이용 촉진 및 정보보호 등에 관한 법률’ 개정에 따라 정보통신망서비스 제공자등 외에도</p><p><br></p><p>6월부터 세입 1,500억원 이상 상급종합병원과 재학생 수 1만명 이상 학교가 의무 인증 대상으로 추가 되었습니다.</p><p><br></p><p>앞으로 알투웨어와 솔루텍시스템은 차별화된 기술력과 공동 마케팅 활동을 통해 다양한 고객층을 확보하기 위해 노력할 예정입니다.</p>',
      },
      {
        id: 2,
        level: 33,
        name: '부장님',
        input_dt: '2023-06-26 14:05:32',
        comment:
          '<p>ISMS는 주요 정보자산 유출과 피해를 사전에 예방하기 위해 기업 등이 수립·운영 중인 정보보호 체계가 적합한지 인증하는 제도이며.</p><p><br></p><p>지난 2월 ‘정보통신망법 이용 촉진 및 정보보호 등에 관한 법률’ 개정에 따라 정보통신망서비스 제공자등 외에도</p><p><br></p><p>6월부터 세입 1,500억원 이상 상급종합병원과 재학생 수 1만명 이상 학교가 의무 인증 대상으로 추가 되었습니다.</p><p><br></p><p>앞으로 알투웨어와 솔루텍시스템은 차별화된 기술력과 공동 마케팅 활동을 통해 다양한 고객층을 확보하기 위해 노력할 예정입니다.</p>',
      },
    ],
  },
  {
    id: 2,
    level: 77,
    name: 'r2ware',
    input_dt: '2023-06-26 16:20:14',
    comment: '알투웨어 알투웨어 r2ware',
    recommend: 32,
    replyList: [],
  },
];

function MyComment(props) {
  return (
    <>
      {commentList.map(cl => (
        <Comment key={cl.id} comment={cl} canCommentActive={false} />
      ))}
    </>
  );
}

export default MyComment;
