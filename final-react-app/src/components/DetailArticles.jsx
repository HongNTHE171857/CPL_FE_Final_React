import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/DetailArticles.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import icon delete

const DetailArticles = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://api.realworld.io/api/articles/${slug}`
        );
        const data = await response.json();
        setArticle(data.article);
        fetchComments(); // Fetch comments when article data is loaded
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticle();

    const userToken = localStorage.getItem('token');
    if (userToken) {
      fetch(`https://api.realworld.io/api/profiles/${article?.author.username}/follow`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setFollowing(data.profile.following);
      })
      .catch((error) => console.log(error));
    }
  }, [slug, article]);

  const handleFollow = () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      fetch(`https://api.realworld.io/api/profiles/${article?.author.username}/follow`, {
        method: following ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setFollowing(!following); // Đảo ngược trạng thái follow/unfollow
      })
      .catch((error) => console.log(error));
    }
  };

  if (!article || !article.author) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    // Lấy comments từ localStorage khi component được mount
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(storedComments);
  }, []);

  useEffect(() => {
    // Lưu comments vào localStorage mỗi khi có sự thay đổi
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, bạn có thể hiển thị một thông báo hoặc chuyển hướng đến trang đăng nhập
      return;
    }
    // Gửi request POST để lưu comment mới
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({ comment: { body: comment } }),
        }
      );
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment.comment]);
        setComment(""); // Xóa nội dung comment khỏi input
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
            Authorization: `Token ${user.token}`,
          },
        }
      );
      if (response.ok) {
        // Xóa comment khỏi danh sách khi xóa thành công
        setComments(comments.filter((c) => c.id !== commentId));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="article-page">
        <div className="banner">
          <Container>
            <h1>{article?.title}</h1>
            <div className="article-meta">
              <a className="" href={`#@${article?.author.username}`}>
                <Image src={article?.author.image} />
              </a>
              <div className="info">
                <a className="author" href={`#@${article?.author.username}`}>
                  {article?.author.username}
                </a>
                <span className="date">
                  {formatDate(article?.createdAt)}
                </span>
              </div>
              <span>{article.favoritesCount}</span>
            </div>
          </Container>
        </div>
        <Container className="page">
          <Row className="article-content">
            <Col xs={12}>
              <div>
                <p>{article?.body}</p>
              </div>
              <ul className="tag-list">
                {article?.tagList.map((tag, index) => (
                  <li
                    key={index}
                    className="tag-default tag-pill tag-outline"
                  >
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
              {!isLoggedIn && (
                <p>
                  <Link to="/login">Sign in</Link>
                  <span>&nbsp;or&nbsp;</span>
                  <Link to="/register">sign up</Link>
                  <span>&nbsp;to add comments on this article.</span>
                </p>
              )}
              <form
                onSubmit={handleCommentSubmit}
                className="card comment-form"
              >
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
              {/* Hiển thị danh sách comment */}
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
                          <FaTrash /> {/* Icon delete */}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default DetailArticles;
