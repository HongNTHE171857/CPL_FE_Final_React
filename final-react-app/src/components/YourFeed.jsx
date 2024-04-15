import React, { useState, useEffect } from "react";
import API from "./API";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import './YourFeed.css'; // Import CSS file

const YourFeed = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchArticles(token, currentPage);
    } else {
      setLoading(false);
      nav("/signup");
    }
  }, [currentPage, nav]);

  const fetchArticles = (token, page) => {
    API.getArticlesOfFollowed(page, 10, token) // Adjust the limit as needed
      .then((data) => {
        setArticleList(data.articles);
        setTotalPages(Math.ceil(data.articlesCount / 10)); // Assuming 10 articles per page
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Header user={user} />

      <div>
        {loading ? (
          <div style={{ textAlign: "center" }}>Loading Articles...</div>
        ) : articleList.length === 0 ? (
          <div>No articles available</div>
        ) : (
          <>
            {articleList.map((a) => (
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
            ))}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span>{currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default YourFeed;

