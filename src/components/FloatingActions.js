import React, { useState } from 'react';

export default function FloatingActions() {
  const [showMenu, setShowMenu] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Blog của Nguyễn Thành Đạt',
        text: 'Xem blog lập trình của mình nhé!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã copy link!');
    }
  };

  const actions = [
    { icon: '🏠', label: 'Về đầu', action: scrollToTop, color: '#667eea' },
    { icon: '📤', label: 'Chia sẻ', action: shareUrl, color: '#f093fb' },
    { icon: '💬', label: 'Feedback', action: () => alert('Cảm ơn bạn quan tâm! 😊'), color: '#4facfe' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 30,
      right: 30,
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: 12,
      alignItems: 'flex-end'
    }}>
      {/* Action buttons */}
      {showMenu && actions.map((action, i) => (
        <div key={action.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          animation: `fadeInUp 0.3s ease-out ${i * 0.1}s backwards`
        }}>
          <span style={{
            background: 'var(--card)',
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.1)',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {action.label}
          </span>
          <button
            onClick={action.action}
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: action.color,
              border: 'none',
              color: 'white',
              fontSize: 20,
              cursor: 'pointer',
              boxShadow: `0 4px 12px ${action.color}66`,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${action.color}99`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${action.color}66`;
            }}
          >
            {action.icon}
          </button>
        </div>
      ))}

      {/* Main FAB button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          border: 'none',
          color: 'white',
          fontSize: 24,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(102,126,234,0.5)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: showMenu ? 'none' : 'pulse 2s ease-in-out infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.15) rotate(90deg)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(102,126,234,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.5)';
        }}
      >
        {showMenu ? '✕' : '⚡'}
      </button>
    </div>
  );
}
