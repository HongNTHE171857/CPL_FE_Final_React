import React, { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import "../styles/GlobalFeed.css";
import { Link } from "react-router-dom";

export const Articles_API = "https://api.realworld.io/api/articles?limit=1000000";

const GlobalFeed = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedType, setFeedType] = useState("global");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("user")));

  useEffect(() => {
    fetchArticles();
    fetchTags();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(Articles_API);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("https://api.realworld.io/api/tags");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setFilterActive(true);
    setCurrentPage(1);
  };

  const handleFeedTypeChange = async (type) => {
    if (type === "global") {
      setFeedType("global");
      setFilterActive(false);
      setSelectedTag(null);
      setCurrentPage(1);
      fetchArticles();
    } else {
      setFeedType("your");
      setFilterActive(false);
      setSelectedTag(null);
      setCurrentPage(1);
      try {
        const userToken = localStorage.getItem('token');
        const response = await fetch("https://api.realworld.io/api/articles/feed", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`
          }
        });
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching your feed:", error);
      }
    }
  };

  const handleFavorite = async (slug) => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      // Xử lý khi người dùng chưa đăng nhập
      return;
    }
  
    try {
      const response = await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to favorite article');
      }
  
      // Cập nhật trạng thái favorited của bài viết
      setArticles(prevArticles => prevArticles.map(article => {
        if (article.slug === slug) {
          return { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 };
        }
        return article;
      }));
    } catch (error) {
      console.error('Error favoriting article:', error);
    }
  };

  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tagList.includes(selectedTag))
    : articles;

  const indexOfLastArticle = currentPage * 10;
  const indexOfFirstArticle = indexOfLastArticle - 10;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredArticles.length / 10); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row>
        <Col md={9}>
          <div className="feed-toggle">
            <Nav variant="pills" className="outline-active">
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleFeedTypeChange("global")}
                  className={feedType === "global" ? "active" : ""}
                >
                  Global Feed
                </Nav.Link>
              </Nav.Item>
              {isLoggedIn ? (
                <Nav.Item>
                  <Nav.Link
                    href="/your-feed"
                    className={feedType === "your" ? "active" : ""}
                  >
                    Your Feed
                  </Nav.Link>
                </Nav.Item>
              ) : (<div></div>)}
              {filterActive && (
                <Nav.Item>
                  <Nav.Link onClick={() => handleTagClick(selectedTag)} active>
                    #{selectedTag}
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </div>
          <div>
            {currentArticles.map((article, index) => (
              <div className="article-preview" key={index}>
                <div className="article-meta">
                  <a>
                    <img src={article.author.image} alt={article.author.username} />
                  </a>
                  <div className="info">
                    <Link className="author" to={`/profile/${article.author.username}`}>
                      {article.author.username}
                    </Link>
                    <span className="date">
                      {formatDate(article.createdAt)}
                    </span>
                  </div>
                  <div className="pull-xs-right">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleFavorite(article.slug)}>
                      <i className="fa-solid fa-heart"></i>{" "}
                      {article.favoritesCount}
                    </button>
                  </div>
                </div>
                <div>
                  <Link to={`/article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      {article.tagList.map((tag, index) => (
                        <li
                          key={index}
                          className="tag-default tag-pill tag-outline"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div>
            <nav>
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li
                    className="page-item"
                    key={number}
                    onClick={() => paginate(number)}
                    active={number === currentPage}
                  >
                    <a className="page-link">{number}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Col>
        <Col md={3}>
          <Card className="sidebar">
            <Card.Body>
              <Card.Title
                style={{
                  color: "#373a3c",
                  marginBottom: "0.5rem",
                  fontWeight: "normal",
                }}
                className="p"
              >
                Popular Tags
              </Card.Title>
              {tags.map((tag, index) => (
                <div className="tag-list" key={index}>
                  <Nav.Link
                    className={`tag-default tag-pill ${
                      selectedTag === tag ? "tag-active" : ""
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </Nav.Link>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GlobalFeed;
