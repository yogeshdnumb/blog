import styles from "./Login.module.scss";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <form className={styles.login}>
      <Input
        id="username"
        name="username"
        label="username or email"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></Input>
      <Input
        id="password"
        name="password"
        label="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></Input>
      <Button
        onClick={async () => {
          console.log("log bth clk");
          const response = await fetch("http://localhost:3000/login", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            // credentials: "same-origin",
            credentials: "include",
            body: JSON.stringify({ username, password }),
          });
          const headers = response.headers;
          const json = await response.json();
          if (response.status == 400) {
            setErrors(json.errors);
          } else {
            console.log(json, headers, headers.get("a"));
          }
          // console.log(errors, json);
        }}
      >
        Login
      </Button>

      <ul>
        {[].map((err) => {
          return <li> {err.msg}</li>;
        })}
      </ul>

      <div className={styles.misc}>
        <p>
          First time? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
}
