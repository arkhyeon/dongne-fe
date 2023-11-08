import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './sheets.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import ToastNotify from './component/modal/ToastAlert.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastNotify />
  </QueryClientProvider>,
);
