import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./ArticlePage.module.scss";

export default function ArticlePage() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`/api/articles/${id}`); //data={article={body,title,author}}
  return (
    <div className={styles.ArticlePage}>
      {loading && <p>Loading</p>}
      {error && <p>Erroa</p>}
      {data && data.article.body}
    </div>
  );
}
