import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './page';
import Main from './page/main/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/" element={<Main />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
