import React, { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
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
          {/* <div className="feed-toggle">
            <Nav className="nav-pills outline-active">
              <Nav.Item style={{ display: "none" }}>
                <Nav.Link>Your Feed</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link>Global Feed</Nav.Link>
              </Nav.Item>

              <Nav.Item className="ng-hide">
                <Nav.Link className="active">
                  <i className="ion-pound"></i>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div> */}
          <div>
            <a>
              {/* <img src="https://api.realworld.io/images/demo-avatar.png"/> */}
            </a>
            {articles.map((article, index) => {
              return (
                <div className="article-preview" key={index}>
                  <div className="article-meta">
                    <a href="">
                      <img src={article.author.image} />
                    </a>
                    <div className="info">
                      <a>{article.author.username}</a>
                      <span className="date">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm pull-xs-right">
                      <i class="ion-heart"></i> {article.favoritesCount}
                    </button>
                  </div>
                  <a
                    href=""
                    class="preview-link"
                  >
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul class="tag-list">
                      <li class="tag-default tag-pill tag-outline">
                        {article.tagList.join(" ")}
                      </li>
                    </ul>
                  </a>
                </div>
              );
            })}
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
              {/* <div className="post-preview">No tags are here... yet.</div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GlobalFeed;
