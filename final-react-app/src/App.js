import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// import Banner from './components/Banner';
// import GlobalFeed from './components/GlobalFeed';
import Footer from './components/Footer';
import Home from './components/Home';
import DetailArticles from './components/DetailArticles';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/article/:slug' element={<DetailArticles/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
