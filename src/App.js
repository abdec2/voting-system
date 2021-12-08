import './App.css';
import Home from './components/Home'
import Admin from './components/Admin'
import Voting from './components/Voting'
import { Routes, Route } from 'react-router-dom'
import logo from './img/logo.png'


function App() {
  return (
    <div className="App" style={{ backgroundImage: 'url(/images/bg.jpg)',height: '100vh', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="voting" element={<Voting />} />
      </Routes>
    </div>
  );
}

export default App;
