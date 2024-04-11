
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Header from './Header';
import Footer from './Footer';

const Setting = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const updatedUser = {
            user: {
                // Assuming API expects a "user" object
                image: formData.get('image'),
                username: formData.get('username'),
                bio: formData.get('bio'),
                email: formData.get('email'),
                password: formData.get('password')
            }
        };

        try {
            // You might need to adjust the URL/path as per your API documentation
            const response = await axios.put('https://api.realworld.io/api/user', updatedUser, {
                headers: {
                    // You'll need to include the authorization header (token) as per API requirements
                    Authorization: `Token ${user?.token}`,
                },
            });

            // Update localStorage and user state if update is successful
            const newUser = { ...user, ...response.data.user };
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            alert('Your settings have been updated.');
        } catch (error) {
            console.error('An error occurred while updating the user settings:', error);
            alert('Failed to update settings. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        
        <div>
            <Header user={user} />
            <div className="settings-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>
                            <form onSubmit={handleUpdate}>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture" name="image" defaultValue={user?.image || ''} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Username" name="username" defaultValue={user?.username || ''} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you" name="bio" defaultValue={user?.bio || ''}></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" autoComplete="current-email" type="email" placeholder="Email" name="email" defaultValue={user?.email || ''} />
                                </fieldset>
                                {/* Password field should be handled carefully, not stored in local storage */}
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" autoComplete="current-password" placeholder="New Password" name="password" />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" type="submit">Update Settings</button>
                            </form>
                            <hr />
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Or click here to logout.</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Setting;
