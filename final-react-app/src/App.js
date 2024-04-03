import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Banner from './components/Banner';
import GlobalFeed from './components/GlobalFeed';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Banner/>
        <GlobalFeed/>
        <Routes>
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
