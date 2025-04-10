import { createBrowserRouter } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserDashboard from '../components/User';

const publicRoutes = [
  {
    path: '/',
    element: <UserDashboard />,
  },
  {
    path: '/users/:uuid',
    element: <UserForm />,
  },
];

// const privateRoutes = [
//   {
//     element: <ProtectedRoute />,
//     errorElement: <ErrorPage errorMessage="login.failed" />,
//     children: [
//       {
//         path: '/',
//         element: <UserDashboard />,
//       },
//       {
//         path: '/users/:uuid',
//         element: <UserForm />,
//       },
//     ],
//   },
// ];

const router = createBrowserRouter([...publicRoutes,]);

export default router;
