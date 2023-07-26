import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './page';
import Main from './page/main/Main';
import BoardMain from './page/main/BoardMain';
import BoardList from './page/boardList/BoardList';
import PostDetail from './page/postDetail/PostDetail';
import PostWrite from './page/postWrite/PostWrite';
import MemberJoin from './page/member/MemberJoin';
import MemberLogin from './page/member/MemberLogin';
import MemberDetail from './page/member/MemberDetail';
import MyPost from './page/member/components/MyPost';
import MyComment from './page/member/components/MyComment';
import PostReaction from './page/member/components/PostReaction';
import MemberEdit from './page/member/components/MemberEdit';
import EventBoardList from './page/boardList/EventBoardList';
import MemberRanking from './page/member/MemberRanking';
import { HasLogin, PrivateRouter } from './component/router/RouterBranch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/" element={<Main />}>
            <Route index path="/" element={<BoardMain />} />
            <Route path="board" element={<BoardList />} />
            <Route path="eventboard" element={<EventBoardList />} />
            <Route path="post" element={<PostDetail />} />
          </Route>
          <Route path="postwrite" element={<PrivateRouter element={<PostWrite />} />} />
          <Route path="login" element={<HasLogin element={<MemberLogin />} />} />
          <Route path="join" element={<HasLogin element={<MemberJoin />} />} />
          <Route path="memberDetail" element={<MemberDetail />}>
            <Route index element={<MyPost />} />
            <Route path="mycomment" element={<PrivateRouter element={<MyComment />} />} />
            <Route path="postreaction" element={<PostReaction />} />
            <Route path="memberEdit" element={<PrivateRouter element={<MemberEdit />} />} />
          </Route>
          <Route path="rank" element={<MemberRanking />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
