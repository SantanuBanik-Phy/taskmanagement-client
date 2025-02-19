import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       
        <HomeLayout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
       
       
       
      },
      
   
    ],
  },
  {
    path: "auth",
    element: (
      <>
     
        <AuthLayout />
      </>
    ),
    children: [
      // {
      //   path: "/auth/login",
      //   element: <Login />,
      // },
      
    ],
  },
  // {
  //   path: "*",
  //   element: <ErrorPage></ErrorPage>
  // },
]);

export default router;
