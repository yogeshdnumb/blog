import styles from "./Register.module.scss";

import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdFocus, setIsPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);
  const [isConfirmPwdFocus, setIsConfirmPwdFocus] = useState(false);

  return <div className={styles.Register}></div>;
}
