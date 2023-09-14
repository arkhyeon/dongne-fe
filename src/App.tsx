import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './page';
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
import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import Main from './page/main/Main';

// const [Main, preload] = getLazyComponentAndPreload(() => import('./page/main/Main'));
// const [Main, preload] = getLazyComponentAndPreload(() => import('./page/main/Main'));
// const [Main, preload] = getLazyComponentAndPreload('./page/main/Main');
// const Main = lazy(() => MainPromise);
// const MainPromise = import('./page/main/Main');
// const Main = lazy(() => import('./page/main/Main'));

function App() {
  // useEffect(() => {
  //   preload();
  // }, []);
  // const di = () => {
  //   import('./common/test').then(test => {
  //     console.log(test.text());
  //   });
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route
            path="/"
            element={
              //<Suspense fallback={<div>...Loading</div>}>
              <Main />
              //</Suspense>
            }
          >
            <Route index path="/" element={<BoardMain />} />
            <Route path="board" element={<BoardList />} />
            <Route path="eventboard" element={<EventBoardList />} />
            <Route
              path="post/:boardId"
              element={
                <Suspense fallback={<div />}>
                  <PostDetail />
                </Suspense>
              }
            />
          </Route>
          <Route path="postwrite" element={<PrivateRouter element={<PostWrite />} />} />
          <Route path="memberDetail" element={<MemberDetail />}>
            <Route index element={<MyPost />} />
            <Route path="mycomment" element={<PrivateRouter element={<MyComment />} />} />
            <Route path="postreaction" element={<PostReaction />} />
            <Route path="memberEdit" element={<PrivateRouter element={<MemberEdit />} />} />
          </Route>
          <Route path="rank" element={<MemberRanking />} />
        </Route>
        <Route path="login" element={<HasLogin element={<MemberLogin />} />} />
        <Route path="join" element={<HasLogin element={<MemberJoin />} />} />
      </Routes>
    </Router>
  );
}

export default App;
export type ReactLazyFactory<T = any> = () => Promise<{ default: ComponentType<T> }>;

export type ComponentPreloadTuple<T = any> = [
  component: LazyExoticComponent<ComponentType<T>>,
  preloadFn: () => void,
];

export function getLazyComponentAndPreload<T = any>(
  componentPath: string,
): ComponentPreloadTuple<T>;
export function getLazyComponentAndPreload<T = any>(
  factory: ReactLazyFactory<T>,
): ComponentPreloadTuple<T>;
export function getLazyComponentAndPreload<T = any>(
  input: string | ReactLazyFactory<T>,
): ComponentPreloadTuple<T> {
  const factory = () => (typeof input === 'string' ? import(input) : input());
  return [lazy(factory), factory];
}
