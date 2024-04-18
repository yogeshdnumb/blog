import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "../pages/Register/Register";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
