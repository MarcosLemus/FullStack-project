import {
  createBrowserRouter,
  RouterProvider as RouterProviderRRD,
} from "react-router-dom";

import RootLayout from "layouts/RootLayout";
import ErrorPage from "pages/ErrorPage";
import CustomersPage from "./pages/CustomerPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const WorkdaysPage = () => <h1>workdays</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute page={WorkdaysPage} role="auth" />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/customer/new",
        element: <ProtectedRoute page={AddCustomerPage} role="admin" />,
      },
      {
        path: "/customer/edit/:customerId",
        element: <ProtectedRoute page={EditCustomerPage} role="admin" />,
      },
      {
        path: "/login",
        element: <ProtectedRoute page={LoginPage} role="anonymous" />,
      },
      {
        path: "/register",
        element: <ProtectedRoute page={RegisterPage} role="anonymous" />,
      },
      {
        path: "/logout",
        element: <ProtectedRoute page={LogoutPage} role="auth" />,
      },
    ],
  },
]);

const RouterProvider = ({ children }) => <RouterProviderRRD router={router} />;

export default RouterProvider;
