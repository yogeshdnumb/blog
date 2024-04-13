// TODO: check response.ok

import styles from "./Register.module.scss";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import { Link, json, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  // const [erros, setErrors] = useState("");
  return (
    <form id="register-form" className={styles.register}>
      <Input
        id="username"
        name="username"
        label="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        // required={true}
      ></Input>
      <Input
        id="email"
        name="email"
        label="email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
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

        // required={true}
      ></Input>

      <ul>
        {errors.map((err) => {
          return <li>{err.msg}</li>;
        })}
      </ul>
      <Button
        onClick={async (e) => {
          // navigate("/");
          // console.log(new FormData(e.target));
          console.log(e.target);
          const response = await fetch("http://localhost:3000/register", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ username, password }),
          });
          // setErrors(json.errors);
          console.log("json");
          const json = await response.json();
          console.log(json);

          if (response.status == 400) {
            console.log(400);
            setErrors(json.errors);
          } else {
            console.log(json);
            setErrors([]);
          }
          console.log(errors);
        }}
      >
        Register
      </Button>

      <div className={styles.misc}>
        <p>
          or <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
}
