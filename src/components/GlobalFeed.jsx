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
export const Articles_API = "https://api.realworld.io/api/articles";

const GlobalFeed = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const Articles_API = "https://api.realworld.io/api/articles";
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
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Container>
      <Row>
        <Col md={9}>
          <div className="feed-toggle">
            <Nav variant="pills" className="outline-active">
              <Nav.Item>
                <Nav.Link href="" active>
                  Global Feed
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div>
            {articles.map((article, index) => {
              return (
                <div className="article-preview" key={index}>
                  <div className="article-meta">
                    <a href="">
                      <img src={article.author.image} />
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
                      <button class="btn btn-outline-primary btn-sm">
                        <i class="fa-solid fa-heart"></i>{" "}
                        {article.favoritesCount}
                      </button>
                    </div>
                  </div>
                  <div>
                    <a href="" class="preview-link">
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
              );
            })}
          </div>
          <div>
            <nav>
              <Pagination>
                <Pagination.Item active>1</Pagination.Item>
              </Pagination>
            </nav>
          </div>
        </Col>
        <Col md={3}>
          <Card className="sidebar">
            <Card.Body>
              <Card.Title>Popular Tags</Card.Title>
              {tags.map((tag, index) => {
                return (
                  <div className="tag-list">
                    <a>{tag}</a>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GlobalFeed;