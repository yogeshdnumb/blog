import styles from "./App.module.scss";

import Router from "./routes/Router";

export default function App() {
  return (
    <div className={styles.app}>
      <Router></Router>
    </div>
  );
}
