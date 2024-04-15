import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "../styles/DetailArticles.css";
import Header from "./Header";
import Footer from "./Footer";

const DetailArticles = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [following, setFollowing] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://api.realworld.io/api/articles/${slug}`
        );
        const data = await response.json();
        setArticle(data.article);
        fetchComments();
        fetchFollowing();
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticle();
  }, [slug]);

  const fetchFollowing = async () => {
    try {
      const response = await fetch(`https://api.realworld.io/api/profiles/${article?.author.username}/follow`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();
      setFollowing(data.profile.following);
    } catch (error) {
      console.error("Error fetching following data:", error);
    }
  };

  const handleFollow = () => {
    fetch(`https://api.realworld.io/api/profiles/${article?.author.username}/follow`, {
      method: following ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setFollowing(!following);
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(storedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}/comments`
      );
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ comment: { body: comment } }),
        }
      );
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment.comment]);
        setComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (!article || !article.author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
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
              <button className="btn btn-sm action-btn btn-secondary" onClick={handleFollow}>
                <i className="fa-solid fa-plus"></i>&nbsp; {following ? 'Unfollow' : 'Follow'} {article.author.username}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-primary">
                <i className="fa-solid fa-heart"></i> Unfavorite Article{" "}
                <span className="counter">{"(" + article.favoritesCount + ")"}</span>
              </button>
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
                  <li key={index} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <hr />
          <div className="article-actions"></div>
          <Row>
            <Col xs={12} md={8} className="offset-md-2">
              {isLoggedIn ? (
                <form onSubmit={handleCommentSubmit} className="card comment-form">
                  <div className="card-block">
                    <textarea
                      name="comment"
                      className="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>
              ) : (
                <p>
                  <Link to="/login">Sign in</Link>
                  <span>&nbsp;or&nbsp;</span>
                  <Link to="/register">sign up</Link>
                  <span>&nbsp;to add comments on this article.</span>
                </p>
              )}
              <div>
                {comments.map((c, index) => (
                  <div key={index} className="card">
                    <div className="card-block">
                      <p>{c.body}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`#@${c.author.username}`}>
                        {c.author.username}
                      </Link>
                      <span className="date">
                        {formatDate(c.createdAt)}
                      </span>
                      {isLoggedIn && (
                        <button
                          onClick={() => handleDeleteComment(c.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div></div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default DetailArticles;
