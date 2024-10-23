import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AppTheme from './themes/AppTheme';
const queryClient = new QueryClient()
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppTheme>
        <RouterProvider router={AppRouter} />
      </AppTheme>
    </QueryClientProvider>
  )
}