import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from 'react-auth-kit';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider authType={'localstorage'} authName={'_auth'}>
        <BrowserRouter>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <ScrollToTop />
              <StyledChart />
              <Router />
              <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
              />
            </QueryClientProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
