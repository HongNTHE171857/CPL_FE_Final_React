import React from "react";
import Banner from "./Banner";
import GlobalFeed from "./GlobalFeed";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Header/>
      <Banner />
      <GlobalFeed />
      <Footer/>
    </div>
  );
};

export default Home;
