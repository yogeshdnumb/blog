import { useState } from "react";
import { authContext } from "./contexts/authContext.tsx";
import Router from "./router/Router.tsx";

export default function App() {
  const [auth, setAuth] = useState("");
  return (
    <div>
      <authContext.Provider value={{ auth, setAuth }}>
        {/* <authContext.Provider value={{ auth, setAuth }}> */}
        <Router></Router>
      </authContext.Provider>
    </div>
  );
}
