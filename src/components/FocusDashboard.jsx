import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  BarChart3, 
  CheckCircle2, 
  BrainCircuit, 
  Target, 
  Zap, 
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXAMS_DATABASE } from '../data/examsData';

export default function FocusDashboard({ selectedExamId, streakCount }) {
  const currentExam = EXAMS_DATABASE[selectedExamId] || EXAMS_DATABASE.jee;
  
  // Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState('study'); // 'study' | 'break'

  // Topic Mastery Checklist State
  const [completedTopics, setCompletedTopics] = useState({
    physics_rotational: true,
    chemistry_organic: true,
    math_calculus: false
  });

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      // Trigger confetti celebration on study session finish!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(timerMode === 'study' ? 25 * 60 : 5 * 60);
  };

  const switchTimerMode = (mode) => {
    setTimerMode(mode);
    setTimerActive(false);
    setTimerSeconds(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTopic = (topicKey) => {
    setCompletedTopics(prev => ({ ...prev, [topicKey]: !prev[topicKey] }));
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Dashboard Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BrainCircuit size={28} color="var(--study-green)" /> Aspirant Focus Hub & Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Real-time metric tracking for <strong style={{ color: 'var(--study-green)' }}>{currentExam.name}</strong> ({currentExam.targetCandidates})
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)', padding: '8px 16px', borderRadius: 'var(--radius-full)', color: 'var(--study-green)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} /> Focus Rating: 96/100 (Optimal)
          </div>
        </div>
      </div>

      {/* Key Metric Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Focus Study Hours</span>
            <Clock size={18} color="var(--study-green)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>42.5 hrs</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--study-green)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <Zap size={12} /> +6.2 hrs saved from distractions
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Distractions Blocked</span>
            <ShieldCheck size={18} color="var(--study-cyan)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--study-cyan)' }}>148 Videos</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Clickbait & Shorts filtered out
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Study Streak</span>
            <Flame size={18} color="var(--study-amber)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--study-amber)' }}>{streakCount} Days</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Consistent YouTube Study Mode usage
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Syllabus Mastery</span>
            <Target size={18} color="var(--study-purple)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--study-purple)' }}>68%</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Target exam roadmap completed
          </div>
        </div>

      </div>

      {/* Main Grid: Pomodoro Timer (Left 5 cols) + Syllabus Progress (Right 7 cols) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left: Pomodoro Focus Timer Card */}
        <div className="glass-panel active-study" style={{ padding: '28px', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
            <button 
              className={`nav-tab ${timerMode === 'study' ? 'active study-tab' : ''}`}
              onClick={() => switchTimerMode('study')}
            >
              🎯 25m Focus Block
            </button>
            <button 
              className={`nav-tab ${timerMode === 'break' ? 'active study-tab' : ''}`}
              onClick={() => switchTimerMode('break')}
            >
              ☕ 5m Revision Break
            </button>
          </div>

          {/* Big Timer Display */}
          <div style={{ 
            fontSize: '4.5rem', 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 800, 
            letterSpacing: '2px', 
            color: timerMode === 'study' ? 'var(--study-green)' : 'var(--study-cyan)',
            margin: '16px 0',
            textShadow: timerMode === 'study' ? '0 0 20px rgba(0,230,118,0.4)' : '0 0 20px rgba(0,229,255,0.4)'
          }}>
            {formatTime(timerSeconds)}
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {timerActive ? '⚡ Study session in progress. Stay focused on your lecture!' : 'Ready to start your next study block?'}
          </p>

          {/* Timer Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button 
              className={`btn ${timerActive ? 'btn-secondary' : 'btn-primary'}`}
              onClick={toggleTimer}
              style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
            >
              {timerActive ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
              <span>{timerActive ? 'Pause Session' : 'Start Focus Clock'}</span>
            </button>

            <button 
              className="btn btn-secondary"
              onClick={resetTimer}
              style={{ borderRadius: 'var(--radius-full)', padding: '12px' }}
              title="Reset Timer"
            >
              <RotateCcw size={18} />
            </button>
          </div>

        </div>

        {/* Right: Subject Syllabus Coverage Tree */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color="var(--study-cyan)" /> {currentExam.name} Syllabus Roadmap
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Updated via Vector Match</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {currentExam.subjects.map(subject => {
              const topics = currentExam.topics[subject.id] || [];
              
              return (
                <div key={subject.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  
                  {/* Subject Title & Progress */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {subject.icon} {subject.name}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--study-green)', fontWeight: 700 }}>75% Mastered</span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #00e676, #00e5ff)', borderRadius: '3px' }} />
                  </div>

                  {/* Topic Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {topics.map(topic => (
                      <div 
                        key={topic.id} 
                        onClick={() => toggleTopic(topic.id)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: completedTopics[topic.id] ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: completedTopics[topic.id] ? 'line-through' : 'none' }}>
                          <CheckCircle2 size={14} color={completedTopics[topic.id] ? 'var(--study-green)' : 'var(--text-muted)'} />
                          {topic.name}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--study-green)', fontWeight: 600 }}>
                          {topic.similarityScore}% Vector
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
