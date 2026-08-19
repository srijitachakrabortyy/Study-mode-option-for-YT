import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  BookMarked, 
  Clock, 
  Plus, 
  Check, 
  BrainCircuit, 
  Download, 
  Share2,
  ExternalLink,
  Play
} from 'lucide-react';
import { EXAMS_DATABASE, ALGORITHM_DISTRACTIONS } from '../data/examsData';

export default function VideoPlayerView({ 
  video, 
  onBack, 
  studyModeActive, 
  selectedExamId,
  onSelectVideo 
}) {
  const [distractionShieldActive, setDistractionShieldActive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [userNotes, setUserNotes] = useState([
    { id: 1, timestamp: '04:15', text: 'Moment of inertia derivation for rolling motion without slipping.' },
    { id: 2, timestamp: '18:30', text: 'Parallel Axis theorem applies only to center of mass reference.' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [noteTimestamp, setNoteTimestamp] = useState('12:00');

  const currentExam = EXAMS_DATABASE[selectedExamId] || EXAMS_DATABASE.jee;
  const relatedVideos = studyModeActive ? currentExam.educationalVideos : ALGORITHM_DISTRACTIONS;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setUserNotes([
      ...userNotes,
      { id: Date.now(), timestamp: noteTimestamp, text: newNoteText.trim() }
    ]);
    setNewNoteText('');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Recommendation Feed
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a 
            href={video.watchUrl || `https://www.youtube.com/watch?v=${video.youtubeId}`} 
            target="_blank" 
            rel="noreferrer"
            style={{
              background: '#ff0000',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)'
            }}
          >
            <span>Watch Directly on YouTube.com</span>
            <ExternalLink size={14} />
          </a>

          <button 
            className={`btn ${distractionShieldActive ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setDistractionShieldActive(!distractionShieldActive)}
          >
            {distractionShieldActive ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
            <span>Comment Shield: {distractionShieldActive ? 'ACTIVE' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Video Player & Takeaways */}
        <div>
          {/* ZERO-BLANK DUAL HYBRID VIDEO PLAYER */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            background: '#000',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)'
          }}>
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId || 'aircAruvnKk'}?autoplay=1&modestbranding=1&rel=0`}
                title={video.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Interactive Backup Poster Player */
              <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0a0a0f', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
                <img src={video.thumbnail} alt={video.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <span className="vector-score-badge">
                    <Sparkles size={12} /> {video.vectorScore || 98}% Syllabus Match
                  </span>
                </div>

                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--study-green)', border: 'none', color: '#000', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ▶
                  </button>
                  <span style={{ fontSize: '0.85rem', color: '#fff', background: 'rgba(0,0,0,0.8)', padding: '4px 12px', borderRadius: '12px', marginTop: '12px', fontWeight: 600 }}>
                    Click to Load Embed Player
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Video Metadata Header */}
          <div style={{ marginTop: '16px', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="tag-pill syllabus">
                {video.subject || 'Physics'}: {video.topic || 'Rotational Motion'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--study-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} /> {video.vectorScore || 98}% Syllabus Match
              </span>
            </div>

            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
              {video.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={video.avatar} alt={video.channel} className="channel-avatar" style={{ width: '42px', height: '42px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{video.channel}</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1.2M Subscribers</span>
                </div>
              </div>

              <a 
                href={video.watchUrl || `https://www.youtube.com/watch?v=${video.youtubeId}`} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.82rem', textDecoration: 'none' }}
              >
                <span>Watch on YouTube.com ↗</span>
              </a>
            </div>
          </div>

          {/* AI Syllabus Key Points */}
          <div className="glass-panel" style={{ marginTop: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <BrainCircuit size={18} color="var(--study-green)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>AI Syllabus Key Takeaways</h3>
            </div>
            
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.6 }}>
              {video.summary || 'Deep dive into moment of inertia tensor derivations, rolling without slipping dynamics, and 10-year PYQ walkthrough.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {video.keyPoints?.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  <Check size={16} color="var(--study-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shielded Comments */}
          <div style={{ marginTop: '24px', position: 'relative' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Student Q&A & Discussion</h3>
            
            <div className={distractionShieldActive ? 'distraction-shield-active' : ''}>
              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--study-cyan)' }}>Rohan S. (JEE Ranker)</span>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Great derivation walkthrough at 14:20!</p>
              </div>
            </div>

            {distractionShieldActive && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, width: '90%', maxWidth: '480px' }}>
                <div className="shield-warning-box">
                  <ShieldCheck size={32} color="var(--study-green)" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Comment Shield Active</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '12px' }}>
                    Comments are blurred during active focus sessions.
                  </p>
                  <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }} onClick={() => setDistractionShieldActive(false)}>
                    Unblur Comments
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: AI Timestamp Notes & Related Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Notes Card */}
          <div className="glass-panel" style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--study-green)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookMarked size={16} /> Timestamp Notes & Formulas
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto', marginBottom: '14px' }}>
              {userNotes.map(n => (
                <div key={n.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--study-green)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--study-green)' }}>⏱️ {n.timestamp}</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>{n.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Add lecture note..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 10px', fontSize: '0.8rem', color: '#fff' }}
              />
              <button type="submit" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Add</button>
            </form>
          </div>

          {/* Related Recommendations Column */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Vector-Matched Next Lectures</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {relatedVideos.map(rel => (
                <div 
                  key={rel.id} 
                  style={{ display: 'flex', gap: '10px', background: 'var(--bg-surface)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                >
                  <img 
                    src={rel.thumbnail} 
                    alt={rel.title} 
                    onClick={() => { onSelectVideo(rel); setIsPlaying(true); }}
                    style={{ width: '110px', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }} 
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 
                      onClick={() => { onSelectVideo(rel); setIsPlaying(true); }}
                      style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, cursor: 'pointer', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {rel.title}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{rel.channel}</span>
                    <a 
                      href={rel.watchUrl || `https://www.youtube.com/watch?v=${rel.youtubeId}`} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '0.7rem', color: '#ff5252', fontWeight: 600, textDecoration: 'none', marginTop: '4px', display: 'inline-block' }}
                    >
                      Open on YouTube ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
