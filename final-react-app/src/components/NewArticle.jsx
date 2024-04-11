import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const NewArticle = () => {
    // Khởi tạo state cho các trường dữ liệu và thông báo
    const [articleTitle, setArticleTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // Thêm state để lưu thông tin người dùng

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    console.log('Stored user:', storedUser);
    console.log('User state:', user);
}, []);


const publishArticle = async () => {
    const userToken = localStorage.getItem('token');
    
    // Kiểm tra xem token đã tồn tại hay không
    if (!userToken) {
        setError('You are not logged in. Please log in to publish an article.');
        setNotification('');
        return;
    }

    const articleData = {
        article: {
            slug: articleTitle,
            title: articleTitle,
            description: description,
            body: body,
            tagList: tags.split(',').map(tag => tag.trim()),
            createdAt: new Date().toISOString(),
            favorited: false,
            favoritesCount: 0,
            author: {
                username: user.username, // Sử dụng thông tin người dùng từ state
                bio: user.bio,
                image: user.image,
                following: user.following
            }
        }
    };

    try {
        const response = await fetch('https://api.realworld.io/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${userToken}`
            },
            body: JSON.stringify(articleData)
        });

        const data = await response.json();

        if (response.ok) {
            setNotification('Article published successfully!');
            setError('');
            // Clear form fields
            setArticleTitle('');
            setDescription('');
            setBody('');
            setTags('');
        } else {
            setError('Failed to publish article. Please try again.');
            setNotification('');
        }
    } catch (error) {
        setError('An unexpected error occurred.');
        setNotification('');
    }
};


    const handleSubmit = (e) => {
        e.preventDefault();
        publishArticle();
    };

    return (
        <div>
            <Header/>
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    {/* Notification for success or error */}
                                    {notification && <div className="alert alert-success">{notification}</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Article Title"
                                            value={articleTitle}
                                            onChange={(e) => setArticleTitle(e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="What's this article about?"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="8"
                                            placeholder="Write your article (in markdown)"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                        ></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter tags"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                        />
                                    </fieldset>
                                    <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default NewArticle;
