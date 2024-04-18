import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

// import Register from "../pages/Register/Register";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Register></Register>,
      element: "Home",
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
