import { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios.js";

import styles from "./Login.module.scss";
import { authContext } from "../../contexts/authContext.js";
import useRefreshToken from "../../hooks/useRefreshToken.js";

export default function Login() {
  const refresh = useRefreshToken();
  const { setAuth } = useContext(authContext);

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const usernameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ username, password: pwd }),
        {
          headers: {
            "Content-type": "application/json",
            withCredentials: true,
          },
        }
      );
      // console.log(response.data);
      setAuth({ accessToken: response?.data?.accessToken });
    } catch (err) {
      console.error(err);

      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status == 400) {
        setErrMsg("Username or Password missing");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }
  }

  return (
    <div className={styles.Login}>
      {errMsg && <p ref={errRef}>{errMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </div>
        <button>Sign In</button>
      </form>
      <button
        onClick={() => {
          refresh();
        }}
      >
        refresh
      </button>
    </div>
  );
}
