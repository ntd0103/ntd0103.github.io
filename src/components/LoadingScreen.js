import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: progress === 100 ? 0 : 1,
      transition: 'opacity 0.5s ease'
    }}>
      {/* Animated Logo */}
      <div style={{
        fontSize: 80,
        marginBottom: 32,
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        💻
      </div>

      {/* Brand Name */}
      <h1 style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 32,
        background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 3s ease infinite'
      }}>
        THÀNH ĐẠT BLOG
      </h1>

      {/* Progress Bar */}
      <div style={{
        width: 300,
        height: 4,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 16
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
          borderRadius: 2,
          transition: 'width 0.1s ease',
          boxShadow: '0 0 20px rgba(102,126,234,0.5)'
        }} />
      </div>

      {/* Loading Text */}
      <p style={{
        color: 'var(--muted)',
        fontSize: 14,
        fontWeight: 500
      }}>
        {progress < 30 ? 'Đang tải...' : 
         progress < 60 ? 'Chuẩn bị nội dung...' : 
         progress < 90 ? 'Gần xong rồi...' : 
         'Hoàn tất!'}
      </p>

      {/* Spinning circles */}
      <div style={{
        position: 'absolute',
        width: 200,
        height: 200,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '2px solid transparent',
            borderTopColor: ['#667eea', '#764ba2', '#f093fb'][i],
            borderRadius: '50%',
            animation: `rotate ${3 + i}s linear infinite`,
            opacity: 0.3,
            animationDelay: `${i * 0.3}s`
          }} />
        ))}
      </div>
    </div>
  );
}
