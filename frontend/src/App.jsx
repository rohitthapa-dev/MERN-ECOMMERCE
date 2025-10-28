import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router-dom";
import RootLayOut from "./components/RootLayOut";
import LoginForm from "./features/auth/LoginForm.jsx";
import RegisterForm from "./features/auth/RegisterForm.jsx";
import AdminUi from "./features/admin/AdminUi.jsx";
import ProductAddForm from "./features/admin/ProductAddForm.jsx";
import ProductUpdateForm from "./features/admin/ProductUpdateForm.jsx";
import Home from "./features/home/Home.jsx";
import ProductDetail from "./features/product/ProductDetail.jsx";
import CartPage from "./features/cart/CartPage.jsx";
import UserDetail from "./features/profile/UserDetail.jsx";
import UserUpdateForm from "./features/profile/UserUpdateForm.jsx";
import AuthRoute from "./components/AuthRoute.jsx";
import SearchPage from "./features/search/SearchPage.jsx";



export default function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <RootLayOut />,
      children: [
        {
          index: true,
          element: <Home />
        },

        {
          element: <AuthRoute />,
          children: [
            {
              path: 'login',
              element: <LoginForm />,
            },

            {
              path: 'register',
              element: <RegisterForm />
            },
          ]
        },

        {
          path: 'product/:id',
          element: <ProductDetail />
        },

        {
          path: 'admin-panel',
          element: <AdminUi />
        },

        {
          path: 'product-add-form',
          element: <ProductAddForm />
        },

        {
          path: 'product-update-form/:id',
          element: <ProductUpdateForm />
        },

        {
          path: 'cart',
          element: <CartPage />
        },

        {
          path: 'profile',
          element: <UserDetail />
        },

        {
          path: 'editProfile',
          element: <UserUpdateForm />
        },

        {
          path: 'search',
          element: <SearchPage />
        },

      ]
    },


  ]);

  return <RouterProvider router={router} />
}
