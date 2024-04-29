import { useState } from "react";
import { authContext } from "./contexts/authContext.tsx";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage.tsx";
import ArticlePage from "./pages/ArticlePage/ArticlePage.tsx";
import PersistLogin from "./components/PersistLogin/PersistLogin.tsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.tsx";
// import Router from "./router/Router.tsx";

export default function App() {
  const [auth, setAuth] = useState("");
  return (
    <div>
      <authContext.Provider value={{ auth, setAuth }}>
        <Routes>
          <Route path="/" element={<p>Home</p>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[]} />}>
              <Route path="/articles" element={<ArticlesPage />}></Route>
              <Route path="/articles/:id" element={<ArticlePage />}></Route>
            </Route>
          </Route>
        </Routes>
      </authContext.Provider>
    </div>
  );
}
