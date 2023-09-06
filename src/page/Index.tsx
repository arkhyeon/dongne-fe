import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Index;
