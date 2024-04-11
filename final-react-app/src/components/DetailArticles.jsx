import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../styles/DetailArticles.css';

const DetailArticles = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
        const data = await response.json();
        setArticle(data.article);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="article-page">
      <div className="banner">
        <Container>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a className="" href={`#@${article.author.username}`}>
              <Image src={article.author.image} />
            </a>
            <div className="info">
              <a className="author" href={`#@${article.author.username}`}>
                {article.author.username}
              </a>
              <span className="date">{formatDate(article.createdAt)}</span>
            </div>
            <span>{article.favoritesCount}</span>
          </div>
        </Container>
      </div>
      <Container className="page">
        <Row className="article-content">
          <Col xs={12}>
            <div>
              <p>{article.body}</p>
            </div>
            <ul className="tag-list">
              {article.tagList.map((tag, index) => (
                <li key={index} className="tag-default tag-pill tag-outline">{tag}</li>
              ))}
            </ul>
          </Col>
        </Row>
        <hr />
        <div className="article-actions"></div>
        <Row>
          <Col xs={12} md={8} className="offset-md-2">
            <p>
              <a className="" href="#login">
                Sign in
              </a>
              <span>&nbsp;or&nbsp;</span>
              <a className="" href="#register">
                sign up
              </a>
              <span>&nbsp;to add comments on this article.</span>
            </p>
            <div></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailArticles;
