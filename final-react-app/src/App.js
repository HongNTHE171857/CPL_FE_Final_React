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
import Setting from './components/Settings';
import NewArticle from './components/NewArticle';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/article/:slug' element={<DetailArticles/>} />
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/settings' element={<Setting />} />
          <Route path='/new-article' element={<NewArticle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
