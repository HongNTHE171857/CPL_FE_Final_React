import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Banner from './components/Banner';
import GlobalFeed from './components/GlobalFeed';
import Footer from './components/Footer';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
