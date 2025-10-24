import React, { useState } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts";

export default function Posts(){
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  
  const tags = ["all", "Java", "JavaScript", "Spring Boot", "WebSocket", "MQTT", "IoT"];
  
  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                         p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "all" || 
                      p.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
                      p.excerpt.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });
  
  return (
    <section style={{marginTop: 24}}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          📚 Các bài đã học ({filteredPosts.length})
        </h2>
        
        {/* Search Box */}
        <div style={{position: 'relative'}}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px 16px 10px 40px',
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: 'var(--text)',
              fontSize: 14,
              width: 280,
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <span style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 16
          }}>🔍</span>
        </div>
      </div>
      
      {/* Filter Tags */}
      <div style={{
        display: 'flex',
        gap: 10,
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{
              padding: '8px 18px',
              background: selectedTag === tag ? 'rgba(6,182,212,0.2)' : 'var(--card)',
              border: selectedTag === tag ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              color: selectedTag === tag ? 'var(--accent)' : 'var(--muted)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedTag !== tag) {
                e.target.style.background = 'rgba(6,182,212,0.1)';
                e.target.style.borderColor = 'rgba(6,182,212,0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTag !== tag) {
                e.target.style.background = 'var(--card)';
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {tag === "all" ? "🌟 Tất cả" : tag}
          </button>
        ))}
      </div>
      
      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="posts">
          {filteredPosts.map((p, idx) => (
            <article 
              key={p.id} 
              className="card" 
              aria-labelledby={"title-"+p.id}
              style={{
                animationDelay: `${idx * 0.1}s`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{
                  fontSize: 24,
                  filter: 'grayscale(0.3)'
                }}>
                  {['🚀', '⚡', '🔥', '💡', '🎯', '✨', '🌟', '💻', '🔧', '🎓'][p.id - 1]}
                </span>
                <h3 id={"title-"+p.id} style={{fontSize: 17, lineHeight: 1.4}}>
                  <Link to={`/posts/${p.id}`} style={{
                    background: 'linear-gradient(135deg, var(--text), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textDecoration: 'none'
                  }}>
                    {p.title}
                  </Link>
                </h3>
              </div>
              
              {p.datetime && (
                <p className="muted" style={{
                  fontSize: 12,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <span>📅</span>
                  {new Date(p.datetime).toLocaleDateString('vi-VN')}
                </p>
              )}
              
              <p className="muted" style={{
                lineHeight: 1.6,
                fontSize: 13
              }}>
                {p.excerpt}
              </p>
              
              {/* Read more indicator */}
              <div style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--accent)',
                fontSize: 13,
                fontWeight: 500
              }}>
                <span>Đọc thêm</span>
                <span style={{
                  transition: 'transform 0.3s ease'
                }}>→</span>
              </div>
            </article>
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
          <div style={{fontSize: 48, marginBottom: 16}}>🔍</div>
          <h3 style={{marginBottom: 8}}>Không tìm thấy bài viết</h3>
          <p className="muted">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </section>
  );
}