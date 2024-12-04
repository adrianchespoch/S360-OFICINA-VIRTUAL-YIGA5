import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter';
export const App = () => {
  return <RouterProvider router={AppRouter} />
}