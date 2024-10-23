import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { Loadable } from '../shared/components/common';
import { ROUTER_PATHS } from './constants';
import AuthRoutes from './AuthRoutes';


import TempAuth from '@/app/account/documentacion/TempAuth';
import SuccessDocumentation from '@/app/account/documentacion/SuccessDocumentation';
const AppLayout = Loadable(
  lazy(() => import('../app/layouts/AppLayout/AppLayout')),
);
const AuthLayout = Loadable(
  lazy(() => import('@/auth/layout/AuthLayout/AuthLayout')),
);
const Home1 = Loadable(lazy(() => import('../app/home/pages/Home1')));
const LoginPage = Loadable(
  lazy(() => import('@/auth/pages/LoginPage/LoginPage')),
);
const AppRouter = createBrowserRouter([
  {
    path: '/accounts',
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [{ path: 'login', element: <LoginPage /> }],
  },
  {
    path: '/',
    element: (
      <PrivateRoutes>
        <AppLayout />
      </PrivateRoutes>
    ),
    children: [
      //////////* Home ------------
      {
        index: true,
        element: <Home1 />,
      },
      //////////* Administration ------------
      {
        path: ROUTER_PATHS.accounts.root,
        element: "",
        children: [
          {
            path: ROUTER_PATHS.accounts.documentationEditar,
            element: <TempAuth />,
          },
        ],
      }, 
      {
        path: ROUTER_PATHS.accounts.root,
        element: "",
        children: [
          {
            path: ROUTER_PATHS.accounts.documentationSuccess,
            element: <SuccessDocumentation />,
          },
        ],
      }, 
    ],
  },
]);
export default AppRouter;