import React from 'react';
<<<<<<< Updated upstream
import Header from './Header';
import Footer from './Footer';
export const Login_API = "https://api.realworld.io/api/users/login";
=======
>>>>>>> Stashed changes

const SignUp = () => {
    return (
        <div>
<<<<<<< Updated upstream
            <Header/>
            <div class="auth-page">
                <div class="container page">
                    <div class="row">
                        <div class="col-md-6 offset-md-3 col-xs-12">
                            <h1 class="text-xs-center">Sign up</h1>
                            <p class="text-xs-center">
                                <a href="/login">Have an account?</a>
                                </p>
                                <ul class="error-messages"></ul>
                                <form>
                                    <fieldset class="form-group">
                                        <input name="username" class="form-control form-control-lg" type="text" placeholder="Username"/>
                                        </fieldset>
                                        <fieldset class="form-group">
                                            <input name="email" class="form-control form-control-lg" type="text" placeholder="Email"/>
                                            </fieldset>
                                            <fieldset class="form-group">
                                                <input name="password" class="form-control form-control-lg" type="password" placeholder="Password"/>
                                                </fieldset>
                                                <button type="submit" class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                                                </form>
                                                </div>
                                                </div>
                                                </div>
                                                </div>
            <Footer/>                                   
=======
            SU
>>>>>>> Stashed changes
        </div>
    );
};

export default SignUp;