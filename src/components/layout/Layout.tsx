import { router } from '../../router/Router';
import { RouterProvider } from 'react-router-dom';

export const Layout = (): JSX.Element => {
  return (
    <RouterProvider router={router} />
  );
};