import React, { useState, useEffect } from "react";

export default function Home(){
  const [text, setText] = useState("");
  const fullText = "Chào mừng đến với Blog của Nguyễn Thành Đạt";
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);
  
  return (
    <header className="header">
      <div className="hero">
        <h1 style={{
          fontSize: 32,
          marginBottom: 16,
          fontWeight: 700,
          letterSpacing: '-0.5px',
          lineHeight: 1.2
        }}>
          {text}
          <span style={{
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s',
            color: 'var(--accent)',
            marginLeft: 2
          }}>|</span>
        </h1>
        <p className="muted" style={{
          fontSize: 16,
          lineHeight: 1.6,
          marginTop: 12
        }}>
          🚀 Nơi lưu lại hành trình học tập — lập trình mạng, Java, Spring Boot, WebSocket, và IoT
        </p>
        
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: 24,
          flexWrap: 'wrap'
        }}>
          {['Java', 'JavaScript', 'Spring Boot', 'WebSocket', 'MQTT', 'IoT'].map((tag, i) => (
            <span key={tag} style={{
              padding: '6px 14px',
              background: 'rgba(6,182,212,0.15)',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--accent)',
              border: '1px solid rgba(6,182,212,0.3)',
              animation: `cardFadeIn 0.6s ease-out ${i * 0.1}s backwards`,
              cursor: 'default',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1) rotate(2deg)';
              e.target.style.background = 'rgba(6,182,212,0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.background = 'rgba(6,182,212,0.15)';
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 16,
        marginTop: 24
      }}>
        {[
          { label: 'Bài viết', value: '10+', icon: '📝' },
          { label: 'Chủ đề', value: '6+', icon: '🎯' },
          { label: 'Code Examples', value: '50+', icon: '💻' }
        ].map((stat, i) => (
          <div key={stat.label} style={{
            background: 'var(--card)',
            padding: 20,
            borderRadius: 12,
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.03)',
            animation: `cardFadeIn 0.8s ease-out ${i * 0.15}s backwards`,
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </header>
  );
}