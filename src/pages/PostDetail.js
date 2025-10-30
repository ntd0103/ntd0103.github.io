import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import posts from "../data/posts";

export default function PostDetail(){
  const { id } = useParams();
  const pid = Number(id);
  const post = posts.find(p => p.id === pid);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if(!post){
    return (
      <section style={{marginTop:18}}>
        <div className="card">
          <h2>Bài không tìm thấy</h2>
          <p className="muted">Không tìm thấy bài với id {id}.</p>
          <p><Link to="/posts">Quay về danh sách các bài</Link></p>
        </div>
      </section>
    );
  }

  // content will hold the post body text. If a post provides a bodyFile (public/.md),
  // fetch it at runtime and use that text. Otherwise fall back to inline post.body.
  const [content, setContent] = useState(post.body || '');

  useEffect(() => {
    let mounted = true;

    if (post.bodyFile) {
      // fetch markdown from public folder
      fetch(post.bodyFile)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load post body: ' + res.status);
          return res.text();
        })
        .then(text => {
          if (mounted) setContent(text);
        })
        .catch(err => {
          console.error(err);
          if (mounted) setContent('');
        });
    } else {
      // inline body (already available)
      setContent(post.body || '');
    }

    return () => { mounted = false; };
  }, [post.bodyFile, post.body]);

  const paragraphs = content ? content.split('\n\n') : [];

  const renderBlock = (blk, i) => {
    const trimmed = blk.trim();
    
    // Render code blocks
    if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
      const lines = blk.split('\n');
      const first = lines[0].trim();
      const lang = first.replace(/```/, '').trim();
      const codeLines = lines.slice(1, lines.length - 1);
      const code = codeLines.join('\n');
      return (
        <pre key={i} style={{
          background:'#1e3a8a',
          color:'#e0e7ff',
          padding:16,
          overflowX:'auto',
          borderRadius:6,
          border:'1px solid #1e40af',
          fontSize:14,
          lineHeight:1.6,
          fontFamily:'Consolas, Monaco, "Courier New", monospace'
        }}>
          <code>{code}</code>
        </pre>
      );
    }
    
    // Render headings
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace('## ', '');
      return <h3 key={i} style={{marginTop:20,marginBottom:8,color:'var(--primary)'}}>{text}</h3>;
    }
    
    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace('### ', '');
      return <h4 key={i} style={{marginTop:16,marginBottom:6,fontWeight:600}}>{text}</h4>;
    }
    
    // Render lists
    if (trimmed.startsWith('- ')) {
      const items = blk.split('\n').filter(l => l.trim().startsWith('- '));
      return (
        <ul key={i} style={{marginLeft:20}}>
          {items.map((item, idx) => (
            <li key={idx}>{item.replace(/^- /, '')}</li>
          ))}
        </ul>
      );
    }
    
    // Render tables (simple markdown table)
    if (trimmed.includes('|') && trimmed.split('\n').length > 2) {
      const lines = trimmed.split('\n');
      const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
      const rows = lines.slice(2).map(row => row.split('|').map(c => c.trim()).filter(Boolean));
      
      return (
        <table key={i} style={{width:'100%',marginTop:12,marginBottom:12,borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f6f8fa'}}>
              {headers.map((h, idx) => (
                <th key={idx} style={{padding:8,border:'1px solid #e1e4e8',textAlign:'left'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ridx) => (
              <tr key={ridx}>
                {row.map((cell, cidx) => (
                  <td key={cidx} style={{padding:8,border:'1px solid #e1e4e8'}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    
    // Render bold text **text**
    const renderInline = (text) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    return <p key={i} style={{lineHeight: 1.7, marginBottom: 12}}>{renderInline(trimmed)}</p>;
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'rgba(255,255,255,0.1)',
        zIndex: 1000
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
          width: `${scrollProgress}%`,
          transition: 'width 0.1s ease'
        }} />
      </div>

      <section style={{marginTop: 24}}>
        <article className="card" style={{
          maxWidth: 800,
          margin: '0 auto',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          {/* Header */}
          <div style={{
            borderBottom: '2px solid rgba(255,255,255,0.05)',
            paddingBottom: 20,
            marginBottom: 24
          }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p style={{
                fontSize: 16,
                color: 'var(--muted)',
                fontStyle: 'italic',
                marginBottom: 12,
                lineHeight: 1.6
              }}>
                {post.excerpt}
              </p>
            )}
            
            {post.datetime && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 14,
                color: 'var(--muted)'
              }}>
                <span>📅 {new Date(post.datetime).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>•</span>
                <span>⏱️ {Math.ceil((content || '').length / 500)} phút đọc</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: 'var(--text)'
          }}>
            {paragraphs.map((p, i) => renderBlock(p, i))}
          </div>
          
          {/* Footer Navigation */}
          <div style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '2px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <Link to="/posts" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.3)',
              borderRadius: 8,
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(6,182,212,0.2)';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(6,182,212,0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <span>←</span>
              <span>Quay về danh sách</span>
            </Link>
            
            <div style={{display: 'flex', gap: 12}}>
              {pid > 1 && (
                <Link to={`/posts/${pid - 1}`} style={{
                  padding: '10px 16px',
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontSize: 14,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'var(--muted)';
                }}>
                  ← Bài trước
                </Link>
              )}
              
              {pid < posts.length && (
                <Link to={`/posts/${pid + 1}`} style={{
                  padding: '10px 16px',
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontSize: 14,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'var(--muted)';
                }}>
                  Bài tiếp →
                </Link>
              )}
            </div>
          </div>
        </article>
      </section>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            color: 'white',
            fontSize: 20,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(102,126,234,0.4)',
            transition: 'all 0.3s ease',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102,126,234,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102,126,234,0.4)';
          }}
          title="Về đầu trang"
        >
          ↑
        </button>
      )}
    </>
  );
}
