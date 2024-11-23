import { createBrowserRouter } from 'react-router-dom';

import SuccessDocumentation from '../app/account/documentacion/SuccessDocumentation';
import TempAuth from '../app/account/documentacion/TempAuth';
const AppRouter = createBrowserRouter([
  {
    path: 'accounts/documentation/:uuid',
    element: <TempAuth />,
  },
  {
    path: 'accounts/success',
    element: <SuccessDocumentation />,
  },
]);
export default AppRouter;
