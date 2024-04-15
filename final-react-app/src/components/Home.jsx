import React from "react";
import { NavLink } from 'react-router-dom';
import Banner from "./Banner";
import GlobalFeed from "./GlobalFeed";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Header/>
      <Banner />
      <NavLink to="/your-feed">Your Feed</NavLink>
      <GlobalFeed />
      <Footer/>
    </div>
  );
};

export default Home;
