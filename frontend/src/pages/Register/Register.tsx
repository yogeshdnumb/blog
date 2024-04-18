import styles from "./Register.module.scss";

import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios.js";

export default function Register() {
  const [username, setUsername] = useState("");
  // const [isUsernameValid, setIsUsernameValid] = useState(false);
  // const [isUsernameFocus, setIsUsernameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  // const [isPwdValid, setIsPwdValid] = useState(false);
  // const [isPwdFocus, setIsPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  // const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);
  // const [isConfirmPwdFocus, setIsConfirmPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  const usernameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, confirmPwd]);

  // useEffect(() => {
  //   setIsUsernameValid(username.length > 2);
  // }, [username]);

  const isUsernameValid = username.length > 2;
  const isPwdValid = pwd.length > 2;
  const isConfirmPwdValid = pwd == confirmPwd && isPwdValid;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/register",
        JSON.stringify({ username, password: pwd }),
        {
          headers: {
            "Content-type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status == 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      // errRef.current.focus();
    }
  }

  return (
    <div className={styles.Register}>
      {errMsg && <p ref={errRef}>{errMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
            {isUsernameValid && "✅"}
            {!isUsernameValid && username && "❌"}
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={usernameRef}
            required
            aria-invalid={isUsernameValid ? "false" : "true"}
            aria-describedby="usernameNote"
            onFocus={() => {
              setIsUsernameFocus(true);
            }}
            onBlur={() => {
              setIsUsernameFocus(false);
            }}
          />
          {!isUsernameValid && username && <p id="usernameNote">{">2"}</p>}
        </div>
        <div>
          <label htmlFor="pwd">
            Password
            {isPwdValid && "✅"}
            {!isPwdValid && pwd && "❌"}
          </label>
          <input
            type="text"
            id="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={isPwdValid ? "false" : "true"}
            aria-describedby="pwdNote"
            onFocus={() => {
              setIsPwdFocus(true);
            }}
            onBlur={() => {
              setIsPwdFocus(false);
            }}
          />
          {!isPwdValid && pwd && <p id="pwdNote">{">2"}</p>}
        </div>
        <div>
          <label htmlFor="confirmPwd">
            Cofirm Password
            {isConfirmPwdValid && "✅"}
            {!isConfirmPwdValid && confirmPwd && "❌"}
          </label>
          <input
            type="text"
            id="confirmPwd"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            required
            aria-invalid={isConfirmPwdValid ? "false" : "true"}
            aria-describedby="confirmPwdNote"
            onFocus={() => {
              setIsConfirmPwdFocus(true);
            }}
            onBlur={() => {
              setIsConfirmPwdFocus(false);
            }}
          />
          {!isConfirmPwdValid && confirmPwd && (
            <p id="confirmPwdNote">{"should match password"}</p>
          )}
        </div>

        <button
          className={
            !(isUsernameValid && isPwdValid && isConfirmPwdValid) &&
            styles.disabled
          }
        >
          Submit
        </button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign In</a>
        </span>
      </p>
    </div>
  );
}
