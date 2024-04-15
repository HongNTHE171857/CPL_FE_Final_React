import React, { useState, useEffect } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetch(`https://api.realworld.io/api/profiles/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
      })
      .catch((error) => console.log(error));

    fetch(`https://api.realworld.io/api/articles?author=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => console.log(error));

    const userToken = localStorage.getItem("token");
    if (userToken) {
      fetch(`https://api.realworld.io/api/profiles/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFollowing(data.profile.following);
        })
        .catch((error) => console.log(error));
    }
  }, [username]);

  const handleFollow = () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      fetch(`https://api.realworld.io/api/profiles/${username}/follow`, {
        method: following ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFollowing(!following); // Đảo ngược trạng thái follow/unfollow
        })
        .catch((error) => console.log(error));
    }
  };

  const handleFavorite = async (slug) => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      // Xử lý khi người dùng chưa đăng nhập
      return;
    }

    try {
      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}/favorite`,
        {
          method: "POST", // Thực hiện yêu cầu favorite
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to favorite article");
      }

      // Cập nhật trạng thái favorited của bài viết
      setArticles((prevArticles) =>
        prevArticles.map((article) => {
          if (article.slug === slug) {
            return {
              ...article,
              favorited: !article.favorited, // Đảo ngược trạng thái favorite
              favoritesCount: article.favorited
                ? article.favoritesCount - 1
                : article.favoritesCount + 1, // Cập nhật số lượng favoritesCount
            };
          }
          return article;
        })
      );
    } catch (error) {
      console.error("Error favoriting article:", error);
    }
  };

  return (
    <div>
      <Header />
      {profile && (
        <div className="profile-page">
          <div className="user-info">
            <Container>
              <Row>
                <Col xs={12} md={10} className="offset-md-1">
                  <img
                    src={profile.image}
                    className="user-img"
                    alt="profile avatar"
                  />
                  <h4>{profile.username}</h4>
                  <p>{profile.bio}</p>
                  <Button
                    className="btn btn-sm action-btn btn-secondary"
                    onClick={handleFollow}
                  >
                    <i className="fa-solid fa-plus"></i>{" "}
                    {following ? "Unfollow" : "Follow"} {profile.username}
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
          <Container>
            <Row>
              <Col xs={12} md={10} className="offset-md-1">
                <div className="articles-toggle">
                  <Nav variant="pills" className="outline-active">
                    <Nav.Item>
                      <Nav.Link href="" className="active">
                        My Articles
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                {articles.map((article) => (
                  <div className="article-preview" key={article.slug}>
                    <div className="article-meta">
                      <Link to={`/profile/${article.author.username}`}>
                        <img
                          decoding="sync"
                          src={article.author.image}
                          alt="author avater"
                        />
                      </Link>
                      <div className="info">
                        <Link
                          className="author"
                          to={`/profile/${article.author.username}`}
                        >
                          {article.author.username}
                        </Link>
                        <span className="date">{article.createdAt}</span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="pull-xs-right"
                        onClick={() => handleFavorite(article.slug)} // Gọi hàm handleFavorite khi nhấn nút favorite
                      >
                        <i className="fa-solid fa-heart"></i>{" "}
                        {article.favoritesCount}
                      </Button>
                    </div>
                    <Link
                      className="preview-link"
                      to={`/article/${article.slug}`}
                    >
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                      <ul className="tag-list">
                        {article.tagList.map((tag) => (
                          <li
                            key={tag}
                            className="tag-default tag-pill tag-outline"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
