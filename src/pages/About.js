import React, { useState } from "react";

export default function About(){
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skills = [
    { name: 'Java', level: 85, icon: '☕', color: '#f89820' },
    { name: 'Spring Boot', level: 80, icon: '🍃', color: '#6db33f' },
    { name: 'JavaScript', level: 90, icon: '⚡', color: '#f7df1e' },
    { name: 'React', level: 75, icon: '⚛️', color: '#61dafb' },
    { name: 'WebSocket', level: 70, icon: '🔌', color: '#06b6d4' },
    { name: 'MQTT/IoT', level: 65, icon: '📡', color: '#660099' }
  ];
  
  return (
    <section style={{marginTop: 24}}>
      <div className="card" style={{
        maxWidth: 900,
        margin: '0 auto',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        {/* Header with gradient */}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))',
          borderRadius: 12,
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Profile Image with effects */}
          <div style={{
            width: 180,
            height: 180,
            margin: '0 auto 24px',
            position: 'relative',
            animation: 'heroFloat 3s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute',
              inset: -4,
              background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
              borderRadius: '50%',
              animation: 'rotate 8s linear infinite',
              zIndex: 0
            }} />
            <img 
              src="/profile.jpg" 
              alt="Nguyễn Thành Đạt"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid var(--bg)',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
              onError={(e) => {
                // Fallback to emoji if image not found
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 80,
              border: '4px solid var(--bg)',
              position: 'relative',
              zIndex: 1
            }}>
              👨‍💻
            </div>
          </div>
          
          <h1 style={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 8,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            NGUYỄN THÀNH ĐẠT
          </h1>
          
          <p style={{
            fontSize: 18,
            color: 'var(--accent)',
            fontWeight: 500,
            marginBottom: 12
          }}>
            Full-stack Developer & Tech Enthusiast
          </p>
          
          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 20
          }}>
            {['🎓 Student', '💻 Developer', '📝 Blogger', '🚀 Learner'].map((badge, i) => (
              <span key={badge} style={{
                padding: '8px 16px',
                background: 'rgba(6,182,212,0.15)',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 500,
                border: '1px solid rgba(6,182,212,0.3)',
                animation: `cardFadeIn 0.6s ease-out ${i * 0.1}s backwards`
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Intro */}
        <div style={{marginBottom: 32}}>
          <h3 style={{
            fontSize: 24,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span>👋</span>
            <span>Xin chào!</span>
          </h3>
          <p style={{
            lineHeight: 1.8,
            fontSize: 15,
            color: 'var(--muted)',
            marginBottom: 12
          }}>
            Mình là <strong style={{color: 'var(--accent)'}}>Nguyễn Thành Đạt (Đạt Thức)</strong> — một developer trẻ đam mê công nghệ và chia sẻ kiến thức. Hiện tại mình là sinh viên, tập trung vào lập trình mạng và phát triển web.
          </p>
          <p style={{
            lineHeight: 1.8,
            fontSize: 15,
            color: 'var(--muted)'
          }}>
            Blog này là nơi mình lưu lại hành trình học tập, từ những kiến thức cơ bản đến các dự án thực tế với <strong>Java, JavaScript, Spring Boot, WebSocket</strong> và <strong>IoT</strong>.
          </p>
        </div>

        {/* About Me Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
          marginBottom: 32
        }}>
          {[
            {
              icon: '🚀',
              title: 'Về mình',
              items: [
                '🎓 Sinh viên năng động',
                '💡 Luôn học hỏi công nghệ mới',
                '📝 Chia sẻ kiến thức tiếng Việt',
                '🤝 Tin vào open knowledge'
              ]
            },
            {
              icon: '🎯',
              title: 'Mục tiêu',
              items: [
                '📚 Series Java & JS chất lượng',
                '� Sâu về Network Programming',
                '🏗️ Dự án IoT thực tế',
                '🌟 Cộng đồng dev Việt Nam'
              ]
            }
          ].map((section, idx) => (
            <div key={section.title} style={{
              background: 'rgba(6,182,212,0.05)',
              padding: 24,
              borderRadius: 12,
              border: '1px solid rgba(6,182,212,0.1)',
              transition: 'all 0.3s ease',
              animation: `cardFadeIn 0.6s ease-out ${idx * 0.2}s backwards`,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{fontSize: 32, marginBottom: 12}}>{section.icon}</div>
              <h4 style={{fontSize: 18, marginBottom: 16, color: 'var(--accent)'}}>
                {section.title}
              </h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                {section.items.map(item => (
                  <li key={item} style={{
                    padding: '6px 0',
                    fontSize: 14,
                    color: 'var(--muted)',
                    lineHeight: 1.6
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div style={{marginBottom: 32}}>
          <h3 style={{
            fontSize: 24,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span>💻</span>
            <span>Kỹ năng chuyên môn</span>
          </h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {skills.map((skill, i) => (
              <div 
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  animation: `cardFadeIn 0.6s ease-out ${i * 0.1}s backwards`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 15,
                    fontWeight: 500
                  }}>
                    <span style={{fontSize: 20}}>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                  <span style={{
                    fontSize: 14,
                    color: 'var(--accent)',
                    fontWeight: 600
                  }}>
                    {skill.level}%
                  </span>
                </div>
                
                <div style={{
                  height: 8,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    height: '100%',
                    width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                    borderRadius: 4,
                    transition: 'width 1s ease-out',
                    boxShadow: `0 0 10px ${skill.color}66`
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{marginBottom: 32}}>
          <h3 style={{
            fontSize: 24,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span>🛠️</span>
            <span>Tech Stack</span>
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12
          }}>
            {[
              'Java', 'JavaScript', 'Spring Boot', 'React', 'Node.js',
              'WebSocket', 'MQTT', 'Git', 'Docker', 'VS Code', 'Flutter', 'PostgreSQL'
            ].map((tech, i) => (
              <div key={tech} style={{
                padding: '12px 16px',
                background: 'var(--card)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 500,
                transition: 'all 0.3s ease',
                animation: `cardFadeIn 0.6s ease-out ${i * 0.05}s backwards`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.background = 'rgba(6,182,212,0.1)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'var(--card)';
                e.currentTarget.style.color = 'var(--text)';
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))',
          padding: 32,
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: 24,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}>
            <span>📫</span>
            <span>Liên hệ</span>
          </h3>
          <p style={{
            color: 'var(--muted)',
            lineHeight: 1.7,
            marginBottom: 20,
            fontSize: 15
          }}>
            Bạn có thể liên hệ với mình qua các kênh sau. Mình luôn hoan nghênh góp ý và cộng tác!
          </p>
          
          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { 
                icon: '📧', 
                text: 'Email', 
                color: '#ea4335',
                link: 'mailto:nguyenthanhdat010324@gmail.com',
                label: 'nguyenthanhdat010324@gmail.com'
              },
              { 
                icon: '�', 
                text: 'Facebook', 
                color: '#1877f2',
                link: 'https://www.facebook.com/nguyen.thanh.at.148170',
                label: 'Facebook Profile'
              },
              { 
                icon: '�', 
                text: 'GitHub', 
                color: '#333',
                link: 'https://github.com/ntd0103/ntd0103.github.io',
                label: 'GitHub Repository'
              }
            ].map(contact => (
              <a 
                key={contact.text}
                href={contact.link}
                target={contact.text !== 'Email' ? '_blank' : undefined}
                rel={contact.text !== 'Email' ? 'noopener noreferrer' : undefined}
                style={{
                  padding: '12px 24px',
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: 'var(--text)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = contact.color;
                  e.currentTarget.style.boxShadow = `0 4px 12px ${contact.color}66`;
                  e.currentTarget.style.background = `${contact.color}11`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'var(--card)';
                }}
                title={contact.label}
              >
                <span style={{fontSize: 20}}>{contact.icon}</span>
                <span>{contact.text}</span>
              </a>
            ))}
          </div>
          
          {/* Contact Details */}
          <div style={{
            marginTop: 24,
            padding: 20,
            background: 'var(--card)',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              textAlign: 'left',
              fontSize: 14
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <span style={{fontSize: 20}}>📧</span>
                <div>
                  <div style={{color: 'var(--muted)', fontSize: 12}}>Email</div>
                  <a href="mailto:nguyenthanhdat010324@gmail.com" style={{
                    color: 'var(--accent)',
                    textDecoration: 'none'
                  }}>
                    nguyenthanhdat010324@gmail.com
                  </a>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <span style={{fontSize: 20}}>💙</span>
                <div>
                  <div style={{color: 'var(--muted)', fontSize: 12}}>Facebook</div>
                  <a 
                    href="https://www.facebook.com/nguyen.thanh.at.148170"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      textDecoration: 'none'
                    }}
                  >
                    Nguyễn Thành Đạt
                  </a>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <span style={{fontSize: 20}}>💻</span>
                <div>
                  <div style={{color: 'var(--muted)', fontSize: 12}}>GitHub</div>
                  <a 
                    href="https://github.com/ntd0103/ntd0103.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      textDecoration: 'none'
                    }}
                  >
                    github.com/ntd0103
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}