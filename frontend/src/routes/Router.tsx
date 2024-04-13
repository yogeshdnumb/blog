import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "../pages/Home/Home";
import Home from "src/pages/Home/Home";
import Login from "src/pages/Login/Login";
import Register from "src/pages/Register/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default function Router() {
  return <RouterProvider router={routes}></RouterProvider>;
}
