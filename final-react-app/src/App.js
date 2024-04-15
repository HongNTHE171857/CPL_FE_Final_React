import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import DetailArticles from './components/DetailArticles';
import Setting from './components/Settings';
import NewArticle from './components/NewArticle';
import Profile from './components/Profile';
import YourFeed from './components/YourFeed';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/article/:slug' element={<DetailArticles/>} />
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/settings' element={<Setting />} />
          <Route path='/new-article' element={<NewArticle />} />
          <Route path="/profile/:username" element={<Profile/>} />
          <Route path='/your-feed' element={<YourFeed/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
