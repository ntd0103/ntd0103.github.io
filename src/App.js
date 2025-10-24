import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";
import FloatingActions from "./components/FloatingActions";
import useKonamiCode from "./hooks/useKonamiCode";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Search from "./pages/Search";

function AppContent() {
  const location = useLocation();
  useKonamiCode(); // Easter egg!
  
  return (
    <>
      <div className="container">
        <Navbar />
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </PageTransition>
        <footer className="footer" style={{
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 8
          }}>
            <span style={{fontSize: 20}}>💻</span>
            <span>© {new Date().getFullYear()} Blog của Nguyễn Thành Đạt</span>
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--muted)',
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
              <span>⚡</span>
              <span>Built with React</span>
            </span>
            <span>•</span>
            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
              <span>🎨</span>
              <span>Designed with love</span>
            </span>
            <span>•</span>
            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
              <span>🚀</span>
              <span>Made in Vietnam</span>
            </span>
          </div>
        </footer>
      </div>
      <FloatingActions />
    </>
  );
}

export default function App(){
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}