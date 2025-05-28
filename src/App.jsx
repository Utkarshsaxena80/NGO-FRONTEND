import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NgoDetailPage from './pages/NgoDetailPage';
import ScrollToTop from './components/utils/ScrollToTop';
import Register from './components/register.jsx';
import Ngo from './components/ngo.jsx';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ngo/:ipfsHash" element={<NgoDetailPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/ngos' element={<Ngo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;