import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home/Home';
import MainLayout from '../Layout/MainLayout';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/Order/Order/Order';
import Login from '../Pages/Login/Login';
import SignUp from '../SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Secret from '../Shared/Secret/Secret';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'menu',
        element: <Menu></Menu>,
      },
      {
        path: 'order/:category',
        element: <Order></Order>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>,
      },
      {
        path: '/secret',
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
