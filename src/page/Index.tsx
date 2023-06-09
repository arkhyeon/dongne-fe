import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Index(props) {
  const [count, setCount] = useState(0);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Index;
