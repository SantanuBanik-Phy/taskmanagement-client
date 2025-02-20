import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";





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
    path: "*",
    element: <ErrorPage></ErrorPage>
  },
]);

export default router;
