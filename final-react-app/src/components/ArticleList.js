import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArticlePreview from "./ArticlePreview";
import ListPagination from "./ListPagination";
import { getArticlesByAuthor } from "./reducers/articleList";
import { selectUser } from "./features/auth/authSlice";

function ArticleList() {
  const articles = useSelector((state) => state.articleList.articles);

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

      <ListPagination />
    </>
  );
}

export default memo(ArticleList);
