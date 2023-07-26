import { Navigate } from 'react-router-dom';
import { isLogin } from '../../common/Cookie';

export const PrivateRouter = ({ element }) => {
  return isLogin() ? element : <Navigate to="/login" />;
};

export const HasLogin = ({ element }) => {
  return !isLogin() ? element : <Navigate to="/" />;
};
