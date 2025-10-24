import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar(){
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: '🏠' },
    { path: '/about', label: 'Giới thiệu', icon: '👤' },
    { path: '/posts', label: 'Các bài đã học', icon: '📚' },
    { path: '/search', label: 'Tìm kiếm', icon: '🔍' }
  ];
  
  return (
    <nav 
      className="nav" 
      role="navigation" 
      aria-label="main navigation"
      style={{
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(6,182,212,0.2)' : '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link to="/" style={{textDecoration: 'none'}}>
        <div className="brand" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span style={{
            fontSize: 24,
            animation: 'pulse 2s ease-in-out infinite'
          }}>💻</span>
          <span>Blog của Nguyễn Thành Đạt</span>
        </div>
      </Link>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
        <div className="navlinks" style={{
          display: 'flex',
          gap: 8
        }}>
          {navItems.map(item => (
            <Link 
              key={item.path}
              to={item.path} 
              aria-current={loc.pathname === item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                position: 'relative'
              }}
            >
              <span style={{fontSize: 16}}>{item.icon}</span>
              <span>{item.label}</span>
              {loc.pathname === item.path && (
                <span style={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--accent)',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
              )}
            </Link>
          ))}
        </div>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--card)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--text)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
          title={isDark ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}