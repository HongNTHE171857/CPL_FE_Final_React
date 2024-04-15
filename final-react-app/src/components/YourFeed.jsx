import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";

const YourFeed = () => {
  const [followingAuthors, setFollowingAuthors] = useState([]);

  useEffect(() => {
    const fetchFollowingAuthors = async () => {
      try {
        // Thực hiện yêu cầu API để lấy danh sách tác giả được theo dõi
        const response = await fetch(
          "https://api.realworld.io/api/profiles/{username}"
        );
        const data = await response.json();
        // Lấy danh sách tác giả được theo dõi từ dữ liệu phản hồi
        setFollowingAuthors(data.profile.following);
      } catch (error) {
        console.error("Error fetching following authors:", error);
      }
    };

    fetchFollowingAuthors();
  }, []);

  return (
    <Container className="page">
      <Row>
        <Col md={9}>
          <div className="feed-toggle">
            <Nav variant="pills" className="outline-active">
              <Nav.Item>
                <Nav.Link href="" className="active">
                  Your Feed
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="">Global Feed</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          {followingAuthors.map((author, index) => (
            <div className="article-preview" key={index}>
              <div className="article-meta">
                <a href={`/profile/${author.username}`}>
                  <img
                    decoding="sync"
                    src={author.image}
                    alt="author avater"
                  />
                </a>
                <div className="info">
                  <a className="author" href={`/profile/${author.username}`}>
                    {author.username}
                  </a>
                  <span className="date">Date</span> {/* Replace with actual date */}
                </div>
                <Button variant="primary" size="sm" className="pull-xs-right">
                  <i className="ion-heart"></i> Likes {/* Replace with actual likes count */}
                </Button>
              </div>
              <a
                className="preview-link"
                href={`/article/${article.slug}`}
              >
                <h1>{article.title}</h1> {/* Replace with actual title */}
                <p>{article.description}</p> {/* Replace with actual description */}
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
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default YourFeed;
