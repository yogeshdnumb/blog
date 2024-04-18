import styles from "./App.module.scss";
import Router from "./routes/Router";

export default function App() {
  return (
    <main className={styles.App}>
      <Router></Router>
    </main>
  );
}
