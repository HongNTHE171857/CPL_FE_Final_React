import React, { useState, useEffect } from "react";
import API from "./API";
import { useNavigate } from "react-router-dom";

const YourFeed = () => {
  const nav = useNavigate();
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getArticlesOfFollowed(1, 100, token)
        .then((data) => {
          setArticleList(data.articles);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      nav("/signup");
    }
  }, [nav]);

 

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading Articles...</div>
      ) : articleList.length === 0 ? (
        <div>No articles available</div>
      ) : (
        articleList.map((a) => (
          <div key={a.slug}>
           <div className="article-preview">
                  <div className="article-meta d-flex justify-content-between">
                    <div className="d-flex gap-2 ">
                      <a
                        className="d-flex flex-column justify-content-center avatar"
                        href={`/profile/${a.author.username}`}
                      >
                        <img
                          decoding="sync"
                          src={`${a.author.image}`}
                          alt="author avater"
                        />
                      </a>
                      <div className="info d-flex flex-column ">
                        <a
                          className="author"
                          href={`/profile/${a.author.username}`}
                        >
                          {a.author.username}
                        </a>
                        <span className="date">January 4, 2024</span>
                      </div>
                    </div>
                    <div className={`h-25 like-btn__container`}>
                     
                    </div>
                  </div>
                  <a className="preview-link" href={`/article/${a.slug}`}>
                    <h1>{a.title}</h1>
                    <p>{a.description}</p>
<span>Read more...</span>
                    <ul className="tag-list">
                      {a.tagList.map((t, i) => {
                        return (
                          <li
                            key={i}
                            className="tag-default tag-pill tag-outline"
                          >
                            {t}
                          </li>
                        );
                      })}
                    </ul>
                  </a>
                </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourFeed;
