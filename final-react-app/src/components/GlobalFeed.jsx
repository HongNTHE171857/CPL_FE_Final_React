import React, { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
export const Articles_API = "https://api.realworld.io/api/articles";

const GlobalFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const Articles_API = "https://api.realworld.io/api/articles";
    fetch(Articles_API)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <div>
                  <p>{articles.author.username}</p>
                  <p></p>
                </div>
              );
            })}
          </div>
        </Col>
        {/* <Col md={3}>
          <Card className="sidebar">
            <Card.Body>
              <Card.Title>Popular Tags</Card.Title>
              <div className="tag-list">
                <a>Tag</a>
              </div>
              <div className="post-preview">No tags are here... yet.</div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default GlobalFeed;
