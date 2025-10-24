import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = posts.filter(post => {
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.body.toLowerCase().includes(searchLower)
      );
    });

    setResults(filtered);
  }, [query]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.trim() && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <mark key={i} style={{
          background: 'rgba(6,182,212,0.3)',
          color: 'var(--accent)',
          padding: '2px 4px',
          borderRadius: 3
        }}>{part}</mark> : part
    );
  };

  return (
    <section style={{ marginTop: 24 }}>
      {/* Search Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))',
        padding: 40,
        borderRadius: 16,
        marginBottom: 32,
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          marginBottom: 12,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🔍 Tìm kiếm bài viết
        </h1>
        <p style={{
          color: 'var(--muted)',
          fontSize: 16,
          marginBottom: 24
        }}>
          Tìm kiếm trong {posts.length} bài viết
        </p>

        {/* Search Input */}
        <div style={{
          position: 'relative',
          maxWidth: 600,
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="Nhập từ khóa: Java, WebSocket, Spring Boot..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '16px 56px 16px 24px',
              fontSize: 16,
              background: 'var(--card)',
              border: '2px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: 'var(--text)',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.boxShadow = '0 0 0 4px rgba(6,182,212,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <span style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 24,
            pointerEvents: 'none'
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* Search History */}
      {!query && searchHistory.length > 0 && (
        <div style={{
          marginBottom: 32,
          padding: 24,
          background: 'var(--card)',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <h3 style={{
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>🕒</span>
              <span>Lịch sử tìm kiếm</span>
            </h3>
            <button
              onClick={clearHistory}
              style={{
                padding: '6px 12px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                color: 'var(--muted)',
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.color = 'var(--muted)';
              }}
            >
              Xóa lịch sử
            </button>
          </div>
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
            {searchHistory.map((term, i) => (
              <button
                key={i}
                onClick={() => handleSearch(term)}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  borderRadius: 20,
                  color: 'var(--text)',
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(6,182,212,0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(6,182,212,0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {query && (
        <div>
          <h2 style={{
            fontSize: 24,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span>📊</span>
            <span>
              {results.length > 0 
                ? `Tìm thấy ${results.length} kết quả cho "${query}"`
                : `Không tìm thấy kết quả cho "${query}"`
              }
            </span>
          </h2>

          {results.length > 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              {results.map((post, idx) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <article 
                    className="card"
                    style={{
                      animation: `cardFadeIn 0.5s ease-out ${idx * 0.1}s backwards`,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'start'
                    }}>
                      <div style={{
                        fontSize: 32,
                        flexShrink: 0
                      }}>
                        {['🚀', '⚡', '🔥', '💡', '🎯', '✨', '🌟', '💻', '🔧', '🎓'][post.id - 1]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: 20,
                          marginBottom: 8,
                          lineHeight: 1.4
                        }}>
                          {highlightText(post.title, query)}
                        </h3>
                        {post.datetime && (
                          <p style={{
                            fontSize: 12,
                            color: 'var(--muted)',
                            marginBottom: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}>
                            <span>📅</span>
                            {new Date(post.datetime).toLocaleDateString('vi-VN')}
                          </p>
                        )}
                        <p style={{
                          color: 'var(--muted)',
                          lineHeight: 1.6,
                          fontSize: 14
                        }}>
                          {highlightText(post.excerpt, query)}
                        </p>
                        <div style={{
                          marginTop: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          color: 'var(--accent)',
                          fontSize: 13,
                          fontWeight: 500
                        }}>
                          <span>Đọc thêm</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: 60,
              background: 'var(--card)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
              <h3 style={{ marginBottom: 8 }}>Không tìm thấy kết quả</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết
              </p>
              <Link
                to="/posts"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: 'rgba(6,182,212,0.15)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  borderRadius: 8,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Xem tất cả bài viết
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Popular Topics (when no search) */}
      {!query && (
        <div style={{
          marginTop: 32,
          padding: 24,
          background: 'var(--card)',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <h3 style={{
            fontSize: 18,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span>🔥</span>
            <span>Chủ đề phổ biến</span>
          </h3>
          <div style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap'
          }}>
            {['Java', 'JavaScript', 'Spring Boot', 'WebSocket', 'MQTT', 'IoT', 'REST API', 'React', 'Network Programming', 'Debugging'].map(topic => (
              <button
                key={topic}
                onClick={() => handleSearch(topic)}
                style={{
                  padding: '10px 18px',
                  background: 'rgba(102,126,234,0.1)',
                  border: '1px solid rgba(102,126,234,0.2)',
                  borderRadius: 8,
                  color: 'var(--text)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(102,126,234,0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.borderColor = 'rgba(102,126,234,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(102,126,234,0.1)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.borderColor = 'rgba(102,126,234,0.2)';
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
