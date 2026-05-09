'use client';

import { useState, useEffect } from 'react';

interface WindowState {
  id: string;
  isMinimized: boolean;
  zIndex: number;
}

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string>('projects');
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', isMinimized: true, zIndex: 2 },
    { id: 'projects', isMinimized: false, zIndex: 3 },
    { id: 'contact', isMinimized: true, zIndex: 1 },
  ]);
  const [activeTab, setActiveTab] = useState<string>('week1');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const toggleWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        const newState = !w.isMinimized;
        if (!newState) {
          setActiveWindow(windowId);
          return { ...w, isMinimized: false, zIndex: Math.max(...prev.map(win => win.zIndex)) + 1 };
        }
        return { ...w, isMinimized: true };
      }
      return w;
    }));
  };

  const bringToFront = (windowId: string) => {
    setActiveWindow(windowId);
    setWindows(prev => prev.map(w =>
      w.id === windowId
        ? { ...w, zIndex: Math.max(...prev.map(win => win.zIndex)) + 1 }
        : w
    ));
  };

  const getWindow = (id: string) => windows.find(w => w.id === id);

  return (
    <>
      {/* Desktop background with pattern */}
      <div
        className="fixed inset-0 overflow-hidden"
        style={{
          background: '#008080',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)
          `
        }}
      >
        {/* Desktop icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-4">
          <div className="win98-desktop-icon" onClick={() => toggleWindow('about')}>
            <div className="text-4xl">👨‍💻</div>
            <span>About Me</span>
          </div>
          <div className="win98-desktop-icon" onClick={() => toggleWindow('projects')}>
            <div className="text-4xl">📁</div>
            <span>AI Maker Journey</span>
          </div>
          <div className="win98-desktop-icon" onClick={() => toggleWindow('contact')}>
            <div className="text-4xl">📧</div>
            <span>Contact</span>
          </div>
        </div>

        {/* About Me Window */}
        {!getWindow('about')?.isMinimized && (
          <div
            className="win98-window window-appear"
            style={{
              top: '40px',
              left: '120px',
              width: '700px',
              maxHeight: 'calc(100vh - 100px)',
              zIndex: getWindow('about')?.zIndex,
            }}
            onClick={() => bringToFront('about')}
          >
            <div className="win98-title-bar">
              <div className="win98-title-text">
                <span className="text-xl">👨‍💻</span>
                <span>Yash Thakker - AI Instructor & Product Leader</span>
              </div>
              <div className="win98-window-controls">
                <button className="win98-button" onClick={() => toggleWindow('about')}>_</button>
                <button className="win98-button">□</button>
                <button className="win98-button">✕</button>
              </div>
            </div>

            <div className="win98-content" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
              {/* Hero Section */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '16px',
                marginBottom: '16px',
                border: '2px solid',
                borderColor: '#ffffff #000000 #000000 #ffffff',
                color: 'white'
              }}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  Yash Thakker
                </h1>
                <p style={{ fontSize: '13px', marginBottom: '4px', color: '#e0e0ff' }}>
                  AI Instructor • Product Leader • Serial Entrepreneur
                </p>
                <p style={{ fontSize: '11px', color: '#d0d0ff', lineHeight: '1.5' }}>
                  Empowering 250,000+ students worldwide to harness the power of AI
                </p>
              </div>

              {/* Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                <div style={{ background: '#ffffcc', border: '2px solid', borderColor: '#ffffff #000000 #000000 #ffffff', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000080' }}>250K+</div>
                  <div style={{ fontSize: '10px', marginTop: '4px' }}>Students Taught</div>
                </div>
                <div style={{ background: '#ccffcc', border: '2px solid', borderColor: '#ffffff #000000 #000000 #ffffff', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#008000' }}>12+</div>
                  <div style={{ fontSize: '10px', marginTop: '4px' }}>Years Experience</div>
                </div>
                <div style={{ background: '#ffcccc', border: '2px solid', borderColor: '#ffffff #000000 #000000 #ffffff', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#800000' }}>$10M+</div>
                  <div style={{ fontSize: '10px', marginTop: '4px' }}>Monthly MRR Built</div>
                </div>
                <div style={{ background: '#cce5ff', border: '2px solid', borderColor: '#ffffff #000000 #000000 #ffffff', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000080' }}>5M+</div>
                  <div style={{ fontSize: '10px', marginTop: '4px' }}>Active Users</div>
                </div>
              </div>

              {/* My Story */}
              <div className="project-card">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📖</span> My Story
                </h3>
                <p style={{ fontSize: '12px', lineHeight: '1.7', marginBottom: '8px' }}>
                  I&apos;m an AI educator and product builder on a mission to democratize AI knowledge.
                  With over a decade of experience in tech, I&apos;ve transitioned from building products
                  at Fortune 500 companies to teaching the next generation of AI practitioners.
                </p>
                <p style={{ fontSize: '12px', lineHeight: '1.7' }}>
                  From <strong>TATA Group</strong> to <strong>PayPal</strong>, I&apos;ve led teams that built
                  products serving millions of users and generating millions in revenue. Now, I channel that
                  expertise into creating world-class AI education that delivers <strong>measurable results</strong> -
                  85% productivity improvement in just 30 days.
                </p>
              </div>

              {/* Educational Impact */}
              <div className="project-card" style={{ background: '#e6f3ff' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎓</span> Educational Impact
                </h3>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '11px' }}>Udemy Platform</strong>
                    <span style={{ fontSize: '10px', background: '#4CAF50', color: 'white', padding: '2px 6px', borderRadius: '3px' }}>4.7★ Rating</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#555', marginBottom: '8px' }}>
                    200,000+ students • 50+ comprehensive AI courses • Top-rated instructor
                  </p>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '11px' }}>YouTube Channel</strong>
                    <span style={{ fontSize: '10px', background: '#FF0000', color: 'white', padding: '2px 6px', borderRadius: '3px' }}>15K+ Subs</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#555', marginBottom: '8px' }}>
                    Free AI tutorials • Weekly content • Practical demonstrations
                  </p>
                </div>
                <div>
                  <strong style={{ fontSize: '11px' }}>ExplainX.ai (Flagship)</strong>
                  <p style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>
                    AI education platform • Interactive learning • Real-world projects
                  </p>
                </div>
              </div>

              {/* Professional Journey */}
              <div className="project-card">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>💼</span> Professional Journey
                </h3>
                <div style={{ borderLeft: '3px solid #000080', paddingLeft: '12px', marginLeft: '8px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>Product Leader @ Fortune 500</div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>TATA Group • PayPal • 8 years</div>
                    <p style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      Led cross-functional teams building AI-powered products. Shipped features
                      serving 5M+ active users with $10M+ monthly recurring revenue.
                    </p>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>AI Software Development</div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>Enterprise & SaaS • 8 years</div>
                    <p style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      Full-stack development, ML model deployment, system architecture,
                      API design, and scaling infrastructure for millions of requests.
                    </p>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>Education & Credentials</div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>MBA (SIMSREE) • B.Tech (IT)</div>
                    <p style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      Combining technical depth with business acumen to build products
                      that solve real problems at scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Companies Founded */}
              <div className="project-card" style={{ background: '#fff3e0' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🚀</span> Companies I&apos;ve Built
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ padding: '8px', background: 'white', border: '1px solid #ddd' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '4px' }}>
                      ExplainX.ai
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      <strong>Flagship AI Education Platform</strong> - Comprehensive courses,
                      hands-on projects, and proven learning methodologies that deliver results.
                    </div>
                  </div>
                  <div style={{ padding: '8px', background: 'white', border: '1px solid #ddd' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '4px' }}>
                      AISOLO Technologies
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      <strong>Parent Company</strong> - Driving AI innovation across education,
                      automation, and enterprise solutions.
                    </div>
                  </div>
                  <div style={{ padding: '8px', background: 'white', border: '1px solid #ddd' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '4px' }}>
                      Olly.social
                      <span style={{ fontSize: '9px', background: '#4CAF50', color: 'white', padding: '1px 4px', borderRadius: '2px', marginLeft: '6px' }}>
                        25K Users
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      <strong>Social Media Growth Tool</strong> - Helping creators and businesses
                      grow their social presence. 5K+ paid subscribers.
                    </div>
                  </div>
                  <div style={{ padding: '8px', background: 'white', border: '1px solid #ddd' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '4px' }}>
                      Infloq.com
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      <strong>AI Influencer Marketing Platform</strong> - Connecting brands with
                      influencers using intelligent matching algorithms.
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Expertise */}
              <div className="project-card">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎯</span> Core Expertise
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#000080', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>⚡</span> Technical Skills
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px' }}>
                      Generative AI • Large Language Models • ChatGPT & Claude AI •
                      Prompt Engineering • AI Agents • RAG Systems • Fine-tuning •
                      Full-Stack Development • Python • JavaScript/TypeScript • Next.js
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#000080', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>💡</span> Business & Strategy
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px' }}>
                      Product Strategy • SaaS Development • Go-to-Market •
                      Tech Leadership • Team Building • Agile Methodologies •
                      AI Consulting • Digital Transformation
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#000080', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📝</span> Content & Marketing
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px' }}>
                      AI for Content Creation • SEO Optimization • Technical Writing •
                      Educational Design • Content Automation • Community Building •
                      Social Media Strategy
                    </div>
                  </div>
                </div>
              </div>

              {/* What I Can Help With */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '14px',
                marginTop: '16px',
                border: '2px solid',
                borderColor: '#ffffff #000000 #000000 #ffffff',
                color: 'white'
              }}>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                  💼 What I Can Help You With
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                  <div>✓ Corporate AI Training</div>
                  <div>✓ AI Strategy Consulting</div>
                  <div>✓ Product Development</div>
                  <div>✓ Speaking Engagements</div>
                  <div>✓ Workshop Facilitation</div>
                  <div>✓ Team Upskilling</div>
                  <div>✓ AI Implementation</div>
                  <div>✓ Technical Advisory</div>
                </div>
              </div>

              {/* Testimonial Style Quote */}
              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#f9f9f9',
                borderLeft: '4px solid #000080',
                fontStyle: 'italic',
                fontSize: '11px',
                lineHeight: '1.6'
              }}>
                &quot;My mission is to make AI accessible to everyone. Whether you&apos;re a complete beginner
                or a seasoned professional, I believe everyone should have the tools and knowledge
                to leverage AI in their work and life.&quot;
              </div>
            </div>

            <div className="win98-status-bar">
              <div className="status-section">Mumbai, India</div>
              <div className="status-section">12+ Years Experience</div>
              <div className="status-section">250K+ Students</div>
            </div>
          </div>
        )}

        {/* Projects Window */}
        {!getWindow('projects')?.isMinimized && (
          <div
            className="win98-window window-appear"
            style={{
              top: '40px',
              left: '150px',
              width: '750px',
              maxHeight: 'calc(100vh - 100px)',
              zIndex: getWindow('projects')?.zIndex,
            }}
            onClick={() => bringToFront('projects')}
          >
            <div className="win98-title-bar">
              <div className="win98-title-text">
                <span className="text-xl">📁</span>
                <span>AI Maker Journey - 6 Weeks of Intensive Learning</span>
              </div>
              <div className="win98-window-controls">
                <button className="win98-button" onClick={() => toggleWindow('projects')}>_</button>
                <button className="win98-button">□</button>
                <button className="win98-button">✕</button>
              </div>
            </div>

            <div className="win98-content" style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
              <div style={{ background: '#ffffcc', border: '1px solid #808080', padding: '8px', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold' }}>
                  🎯 6-Week AI Maker Intensive: From HTML to Production AI Products
                </p>
                <p style={{ fontSize: '11px', marginTop: '4px' }}>
                  A comprehensive journey through modern AI development - from foundational web technologies to deploying production-ready AI applications.
                </p>
              </div>

              {/* Tabs */}
              <div className="win98-tabs">
                <div
                  className={`win98-tab ${activeTab === 'week1' ? 'active' : ''}`}
                  onClick={() => setActiveTab('week1')}
                >
                  Week 1
                </div>
                <div
                  className={`win98-tab ${activeTab === 'week2' ? 'active' : ''}`}
                  onClick={() => setActiveTab('week2')}
                >
                  Week 2
                </div>
                <div
                  className={`win98-tab ${activeTab === 'week3' ? 'active' : ''}`}
                  onClick={() => setActiveTab('week3')}
                >
                  Week 3
                </div>
                <div
                  className={`win98-tab ${activeTab === 'week4' ? 'active' : ''}`}
                  onClick={() => setActiveTab('week4')}
                >
                  Week 4
                </div>
                <div
                  className={`win98-tab ${activeTab === 'week5' ? 'active' : ''}`}
                  onClick={() => setActiveTab('week5')}
                >
                  Week 5
                </div>
                <div
                  className={`win98-tab ${activeTab === 'week6' ? 'active' : ''}`}
                  onClick={() => setActiveTab('week6')}
                >
                  Week 6
                </div>
              </div>

              {/* Week 1 Content */}
              {activeTab === 'week1' && (
                <div className="project-card">
                  <h3>🌐 Week 1: HTML Foundations - 5 Essential Projects</h3>
                  <p>
                    <strong>Focus:</strong> Building foundational web development skills through hands-on HTML projects across diverse categories.
                  </p>
                  <ul className="project-list">
                    <li><strong>Personal Portfolio Website</strong> - Semantic HTML structure, accessibility best practices</li>
                    <li><strong>Recipe Collection Page</strong> - Forms, lists, tables, and content organization</li>
                    <li><strong>Product Landing Page</strong> - Marketing copy, call-to-action buttons, responsive images</li>
                    <li><strong>Documentation Site</strong> - Navigation, anchor links, code snippets, technical writing</li>
                    <li><strong>Event Registration Form</strong> - Complex forms, validation attributes, user input handling</li>
                  </ul>
                  <div style={{ marginTop: '8px', padding: '6px', background: '#c0c0c0', fontSize: '10px' }}>
                    <strong>Key Learnings:</strong> Semantic HTML5, accessibility, SEO foundations, form handling, responsive design principles
                  </div>
                </div>
              )}

              {/* Week 2 Content */}
              {activeTab === 'week2' && (
                <div className="project-card">
                  <h3>🤖 Week 2: AI Note-Taking Full-Stack Application</h3>
                  <p>
                    <strong>Tech Stack:</strong> Next.js 14 (App Router), PostgreSQL, Prisma ORM, AI Integration
                  </p>
                  <ul className="project-list">
                    <li><strong>Database Design:</strong> PostgreSQL schema with Prisma ORM for efficient data modeling</li>
                    <li><strong>AI Features:</strong> Intelligent note summarization, auto-tagging, smart search with semantic understanding</li>
                    <li><strong>Full-Stack Architecture:</strong> RESTful API routes, server components, client-side state management</li>
                    <li><strong>Rich Text Editor:</strong> Markdown support, code highlighting, formatting options</li>
                    <li><strong>User Authentication:</strong> Secure login system, session management, protected routes</li>
                    <li><strong>Real-time Sync:</strong> Auto-save functionality, conflict resolution, optimistic updates</li>
                  </ul>
                  <div style={{ marginTop: '8px', padding: '6px', background: '#c0c0c0', fontSize: '10px' }}>
                    <strong>Key Learnings:</strong> Full-stack development, database design, AI API integration, authentication, real-time data handling
                  </div>
                </div>
              )}

              {/* Week 3 Content */}
              {activeTab === 'week3' && (
                <div className="project-card">
                  <h3>🐍 Week 3: Python Automation & Game Development</h3>
                  <p>
                    <strong>Focus:</strong> Practical automation scripts and interactive game development with Python
                  </p>
                  <h4 style={{ fontSize: '12px', marginTop: '12px', marginBottom: '6px' }}>Automation Projects:</h4>
                  <ul className="project-list">
                    <li><strong>Email Automation:</strong> Bulk email sender with templates, scheduling, tracking</li>
                    <li><strong>Web Scraping Bot:</strong> Data extraction, parsing, CSV export, rate limiting</li>
                    <li><strong>File Organizer:</strong> Auto-sort downloads by type, duplicate finder, batch renaming</li>
                    <li><strong>Report Generator:</strong> PDF creation, charts/graphs, automated distribution</li>
                    <li><strong>Social Media Scheduler:</strong> Multi-platform posting, analytics tracking</li>
                  </ul>
                  <h4 style={{ fontSize: '12px', marginTop: '12px', marginBottom: '6px' }}>Game Development:</h4>
                  <ul className="project-list">
                    <li><strong>Snake Game:</strong> Pygame, collision detection, score tracking, difficulty levels</li>
                    <li><strong>Quiz Game:</strong> Question bank, timer, leaderboard, category selection</li>
                    <li><strong>Hangman:</strong> Word lists, ASCII art, hint system, difficulty modes</li>
                  </ul>
                  <div style={{ marginTop: '8px', padding: '6px', background: '#c0c0c0', fontSize: '10px' }}>
                    <strong>Key Learnings:</strong> Python automation, web scraping, file I/O, Pygame framework, OOP principles, error handling
                  </div>
                </div>
              )}

              {/* Week 4 Content */}
              {activeTab === 'week4' && (
                <div className="project-card">
                  <h3>🤖 Week 4: AI Agents & Autonomous Systems</h3>
                  <p>
                    <strong>Focus:</strong> Building intelligent AI agents capable of autonomous decision-making and task execution
                  </p>
                  <ul className="project-list">
                    <li><strong>Research Agent:</strong> Web search integration, source verification, report compilation, citation management</li>
                    <li><strong>Content Creation Agent:</strong> Multi-step content generation, SEO optimization, fact-checking, plagiarism detection</li>
                    <li><strong>Data Analysis Agent:</strong> CSV/Excel processing, statistical analysis, visualization, insights extraction</li>
                    <li><strong>Customer Support Agent:</strong> Intent recognition, context retention, sentiment analysis, escalation logic</li>
                    <li><strong>Code Review Agent:</strong> Static analysis, best practices checking, security vulnerability detection, refactoring suggestions</li>
                    <li><strong>Task Automation Agent:</strong> Multi-tool integration, workflow orchestration, error recovery, status reporting</li>
                  </ul>
                  <div style={{ marginTop: '8px', padding: '6px', background: '#c0c0c0', fontSize: '10px' }}>
                    <strong>Key Learnings:</strong> LangChain framework, agent architectures, tool use, memory systems, chain-of-thought reasoning, autonomous workflows
                  </div>
                </div>
              )}

              {/* Week 5 Content */}
              {activeTab === 'week5' && (
                <div className="project-card">
                  <h3>🧩 Week 5: Chrome Extensions Development</h3>
                  <p>
                    <strong>Focus:</strong> Building productivity-enhancing browser extensions with modern JavaScript
                  </p>
                  <ul className="project-list">
                    <li><strong>AI Writing Assistant:</strong> Content suggestions, grammar checking, tone adjustment, inline editing</li>
                    <li><strong>Tab Manager:</strong> Session saving, group organization, duplicate detection, memory optimization</li>
                    <li><strong>Web Scraper Extension:</strong> Element picker, data extraction, export formats, scheduled scraping</li>
                    <li><strong>Screenshot Annotator:</strong> Capture areas, markup tools, cloud storage, instant sharing</li>
                    <li><strong>Productivity Tracker:</strong> Time tracking, site blocking, focus mode, analytics dashboard</li>
                    <li><strong>Price Tracker:</strong> Historical data, price alerts, comparison shopping, deal notifications</li>
                  </ul>
                  <div style={{ marginTop: '8px', padding: '6px', background: '#c0c0c0', fontSize: '10px' }}>
                    <strong>Key Learnings:</strong> Chrome Extension API, manifest V3, content scripts, background workers, storage APIs, message passing, permissions
                  </div>
                </div>
              )}

              {/* Week 6 Content */}
              {activeTab === 'week6' && (
                <div className="project-card">
                  <h3>🚀 Week 6: Deployment & Marketing Mastery</h3>
                  <p>
                    <strong>Focus:</strong> Taking products from development to production and reaching users effectively
                  </p>
                  <h4 style={{ fontSize: '12px', marginTop: '12px', marginBottom: '6px' }}>Deployment & Infrastructure:</h4>
                  <ul className="project-list">
                    <li><strong>Vercel Deployment:</strong> CI/CD pipelines, environment variables, preview deployments, analytics</li>
                    <li><strong>Database Hosting:</strong> PostgreSQL on Railway/Supabase, connection pooling, backups, migrations</li>
                    <li><strong>Domain & DNS:</strong> Custom domains, SSL certificates, CDN configuration, performance optimization</li>
                    <li><strong>Monitoring:</strong> Error tracking, performance monitoring, uptime alerts, user analytics</li>
                  </ul>
                  <h4 style={{ fontSize: '12px', marginTop: '12px', marginBottom: '6px' }}>Marketing & Growth:</h4>
                  <ul className="project-list">
                    <li><strong>SEO Optimization:</strong> Meta tags, sitemap, structured data, Core Web Vitals, keyword research</li>
                    <li><strong>Content Marketing:</strong> Blog posts, tutorials, case studies, email campaigns</li>
                    <li><strong>Social Media:</strong> Twitter/X threads, LinkedIn posts, community building, engagement strategies</li>
                    <li><strong>Product Hunt Launch:</strong> Preparation, launch strategy, community engagement, growth tactics</li>
                    <li><strong>Analytics Setup:</strong> Google Analytics, conversion tracking, A/B testing, user behavior analysis</li>
                  </ul>
                  <div style={{ marginTop: '8px', padding: '6px', background: '#c0c0c0', fontSize: '10px' }}>
                    <strong>Key Learnings:</strong> DevOps basics, cloud platforms, SEO, content marketing, growth hacking, analytics, community building
                  </div>
                </div>
              )}

              <div style={{ marginTop: '16px', padding: '10px', background: '#000080', color: 'white', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  🎓 This portfolio showcases hands-on learning across web development, AI, automation, and product deployment
                </p>
              </div>
            </div>

            <div className="win98-status-bar">
              <div className="status-section">6 Weeks Completed</div>
              <div className="status-section">30+ Projects Built</div>
              <div className="status-section">Production Ready</div>
            </div>
          </div>
        )}

        {/* Contact Window */}
        {!getWindow('contact')?.isMinimized && (
          <div
            className="win98-window window-appear"
            style={{
              top: '80px',
              left: '200px',
              width: '500px',
              maxHeight: 'calc(100vh - 150px)',
              zIndex: getWindow('contact')?.zIndex,
            }}
            onClick={() => bringToFront('contact')}
          >
            <div className="win98-title-bar">
              <div className="win98-title-text">
                <span className="text-xl">📧</span>
                <span>Get In Touch</span>
              </div>
              <div className="win98-window-controls">
                <button className="win98-button" onClick={() => toggleWindow('contact')}>_</button>
                <button className="win98-button">□</button>
                <button className="win98-button">✕</button>
              </div>
            </div>

            <div className="win98-content">
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#000080' }}>
                Let&apos;s Connect! 🤝
              </h2>

              <div style={{ background: '#ffffcc', border: '1px solid #808080', padding: '8px', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', lineHeight: '1.5' }}>
                  <strong>Available For:</strong><br/>
                  • Corporate AI Training & Workshops<br/>
                  • Consulting & Strategy Sessions<br/>
                  • Speaking Engagements<br/>
                  • Product Development Partnerships
                </p>
              </div>

              <div className="project-card">
                <h3>🌐 Online Presence</h3>
                <ul className="project-list">
                  <li>
                    <strong>Website:</strong>{' '}
                    <a href="https://www.goyashy.com" target="_blank" rel="noopener noreferrer">
                      goyashy.com
                    </a>
                  </li>
                  <li>
                    <strong>LinkedIn:</strong> Connect with me professionally
                  </li>
                  <li>
                    <strong>Twitter/X:</strong> Follow for AI insights & updates
                  </li>
                  <li>
                    <strong>YouTube:</strong> 15K+ subscribers learning AI
                  </li>
                  <li>
                    <strong>Udemy:</strong> 200K+ students across 50+ courses
                  </li>
                </ul>
              </div>

              <div className="project-card">
                <h3>🏢 Founded Companies</h3>
                <ul className="project-list">
                  <li>
                    <strong>ExplainX.ai</strong> - AI Education Platform
                  </li>
                  <li>
                    <strong>AISOLO Technologies</strong> - AI Innovation Hub
                  </li>
                  <li>
                    <strong>Olly.social</strong> - Social Media Growth (25K+ users)
                  </li>
                  <li>
                    <strong>Infloq.com</strong> - Influencer Marketing Platform
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: '16px', padding: '12px', background: '#000080', color: 'white', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold' }}>
                  📍 Based in Mumbai, India 🇮🇳
                </p>
                <p style={{ fontSize: '11px', marginTop: '4px' }}>
                  Open to remote consulting & global opportunities
                </p>
              </div>
            </div>

            <div className="win98-status-bar">
              <div className="status-section">Always Open to Connect</div>
              <div className="status-section">Response Time: 24h</div>
            </div>
          </div>
        )}

        {/* Taskbar */}
        <div className="win98-taskbar">
          <button className="win98-start-button">
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>🪟</span>
            <span>Start</span>
          </button>

          <div className="win98-taskbar-divider" />

          {windows.map(window => (
            <button
              key={window.id}
              className="win98-start-button"
              style={{
                background: !window.isMinimized && activeWindow === window.id ? '#c0c0c0' : '#dfdfdf',
                borderStyle: !window.isMinimized && activeWindow === window.id ? 'inset' : 'outset',
              }}
              onClick={() => toggleWindow(window.id)}
            >
              {window.id === 'about' && '👨‍💻 About Me'}
              {window.id === 'projects' && '📁 AI Maker Journey'}
              {window.id === 'contact' && '📧 Contact'}
            </button>
          ))}

          <div className="win98-system-tray">
            <span className="text-sm">🔊</span>
            <span className="text-sm">📶</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>
              {formatTime(time)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
