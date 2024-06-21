import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './component/Register/RegisterForm';
import HeroSection from './component/herosection/HeroSection';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Login from './component/login/Login';
import Reviews from './component/reviews/Reviews';
import ScrollToTop from './component/scrollToTop/ScrollToTop';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<HeroSection />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reviews' element={<Reviews />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
