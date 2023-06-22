import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './page';
import Main from './page/main/Main';
import BoardMain from './page/main/BoardMain';
import BoardList from './page/board/BoardList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/" element={<Main />}>
            <Route index path="/" element={<BoardMain />}></Route>
            <Route path="board" element={<BoardList />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
