import { Navigate } from 'react-router-dom';
import { isLogin } from '../../common/Cookie';
import { ReactElement } from 'react';

export const PrivateRouter = ({ element }: { element: ReactElement }) => {
  return isLogin() ? element : <Navigate to="/login" />;
};

export const HasLogin = ({ element }: { element: ReactElement }) => {
  return !isLogin() ? element : <Navigate to="/" />;
};
