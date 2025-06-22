import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Loader
import PageLoader from './components/shared/lazyLoader/PageLoader';
import { Drop } from './pages/shop';

// Lazy Components
const Home = React.lazy(() => import('./pages/home'));
const UnderConstruction = React.lazy(() => import('./pages/underContruction'));
const Navbar = React.lazy(() => import('./components/layout/navbar'));
const Footer = React.lazy(() => import('./components/layout/footer'));


function App() {
  // useEffect(() => {
  //   document.body.style.overflow = 'auto';
  // }, []);

  return (
    <Router>
      <React.Suspense fallback={<PageLoader isVisible={true} />}>
        <div className="app-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drop" element={<Drop />} />
            <Route path="/journal" element={<UnderConstruction />} />
            <Route path="/tribe" element={<UnderConstruction />} />
          </Routes>
          <Footer />
        </div>
      </React.Suspense>
    </Router>
  );
}

export default App;