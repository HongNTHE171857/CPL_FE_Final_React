import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Pagination,
  Row,
} from "react-bootstrap";
import "../styles/GlobalFeed.css";
export const Articles_API = "https://api.realworld.io/api/articles?limit=1000000";

const GlobalFeed = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const Articles_API = "https://api.realworld.io/api/articles?limit=1000000";
    fetch(Articles_API)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const Tags_API = "https://api.realworld.io/api/tags";
    fetch(Tags_API)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTags(data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setFilterActive(true);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setSelectedTag(null);
    setFilterActive(false);
    setCurrentPage(1);
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
                {filterActive ? (
                  <>
                    <Nav.Link onClick={handleClearFilter} className="filter-link">Global Feed</Nav.Link>
                    <Nav.Link href="" active>#{selectedTag}</Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="" active>
                    Global Feed
                  </Nav.Link>
                )}
              </Nav.Item>
            </Nav>
          </div>
          <div>
            {currentArticles.map((article, index) => (
              <div className="article-preview" key={index}>
                <div className="article-meta">
                  <a href="">
                    <img src={article.author.image} alt={article.author.username} />
                  </a>
                  <div className="info">
                    <a className="author" href="">
                      {article.author.username}
                    </a>
                    <span className="date">
                      {formatDate(article.createdAt)}
                    </span>
                  </div>
                  <div className="pull-xs-right">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="fa-solid fa-heart"></i>{" "}
                      {article.favoritesCount}
                    </button>
                  </div>
                </div>
                <div>
                  <a href="" className="preview-link">
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
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <nav>
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li className="page-item" key={number} onClick={() => paginate(number)} active={number === currentPage}>
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
