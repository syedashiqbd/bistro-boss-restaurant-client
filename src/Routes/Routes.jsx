import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home/Home';
import MainLayout from '../Layout/MainLayout';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/Order/Order/Order';
import Login from '../Pages/Login/Login';
import SignUp from '../SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Secret from '../Shared/Secret/Secret';
import Cart from '../Pages/Dashboard/Cart/Cart';
import Dashboard from '../Layout/Dashboard';
import AllUsers from '../Pages/Dashboard/Cart/AllUsers/AllUsers';
import AddItems from '../Pages/Dashboard/AddItems/AddItems';
import AdminRoute from './AdminRoute';
import ManageItems from '../Pages/Dashboard/ManageItems/ManageItems';
import UpdateItem from '../Pages/Dashboard/UpdateItem/UpdateItem';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';

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
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //  normal user access
      {
        path: 'cart',
        element: <Cart></Cart>,
      },
      {
        path: 'payment',
        element: <Payment></Payment>,
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>,
      },

      // admin access
      {
        path: 'addItems',
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      // {
      //   path: 'updateItem/:id',
      //   element: (
      //     <AdminRoute>
      //       <UpdateItem></UpdateItem>
      //     </AdminRoute>
      //   ),
      //   loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`),
      // },
      {
        path: 'updateItem/:id',
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: async ({ params }) => {
          try {
            // Use your axios instance for the API call
            const response = await useAxiosPublic().get(`/menu/${params.id}`);

            // Return the data from the response
            return response.data;
          } catch (error) {
            // Handle errors if necessary
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to propagate it
          }
        },
      },

      {
        path: 'manageItems',
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);
