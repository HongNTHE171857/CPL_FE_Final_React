import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArticlePreview from "./ArticlePreview";
import { selectUser } from "./features/auth/authSlice";

function ArticleAuthor() {
  const [articles, setArticles] = useState([]);
  const currentUser = useSelector(selectUser);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.realworld.io/api/articles?author=${currentUser?.username}&limit=5`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Error");
        }
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}
    </>
  );
}

export default ArticleAuthor;
