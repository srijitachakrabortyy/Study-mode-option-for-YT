import React from 'react';
import { 
  Menu, 
  Search, 
  Mic, 
  Video, 
  Bell, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Flame, 
  BookOpen, 
  Code, 
  Tv, 
  BrainCircuit,
  CheckCircle
} from 'lucide-react';
import { EXAMS_DATABASE } from '../data/examsData';

export default function Header({ 
  studyModeActive, 
  setStudyModeActive,
  selectedExamId, 
  setSelectedExamId,
  strictnessLevel,
  setStrictnessLevel,
  activeTab,
  setActiveTab,
  streakCount,
  searchQuery,
  setSearchQuery,
  toggleSidebar
}) {
  const currentExam = EXAMS_DATABASE[selectedExamId] || EXAMS_DATABASE.jee;

  return (
    <header className="yt-header">
      
      {/* Left: Hamburger Menu & Official YouTube Brand Logo */}
      <div className="yt-logo-container">
        <button className="yt-icon-btn" onClick={toggleSidebar} title="Guide / Navigation">
          <Menu size={20} />
        </button>

        {/* Official YouTube Logo SVG */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => setActiveTab('simulator')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <svg height="20" viewBox="0 0 28 20" width="28" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.9727 3.12324C27.6435 1.89112 26.6747 0.922333 25.4426 0.593122C23.2056 0 14 0 14 0C14 0 4.7944 0 2.5574 0.593122C1.32528 0.922333 0.356494 1.89112 0.0272827 3.12324C0 5.36024 0 10 0 10C0 10 0 14.6398 0.0272827 16.8768C0.356494 18.1089 1.32528 19.0777 2.5574 19.4069C4.7944 20 14 20 14 20C14 20 23.2056 20 25.4426 19.4069C26.6747 19.0777 27.6435 18.1089 27.9727 16.8768C28 14.6398 28 10 28 10C28 10 28 5.36024 27.9727 3.12324Z" fill="#FF0000"/>
              <path d="M11.2 14.2857L18.4 10L11.2 5.71429V14.2857Z" fill="white"/>
            </svg>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.8px', color: '#fff', marginLeft: '4px' }}>
              YouTube
            </span>
            <span style={{ fontSize: '10px', color: '#aaa', marginLeft: '2px', fontWeight: 500 }}>IN</span>
          </div>

          {/* Integrated YouTube Study Mode Native Badge */}
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '12px',
            background: studyModeActive ? 'rgba(0,230,118,0.15)' : 'rgba(255,255,255,0.1)',
            color: studyModeActive ? '#00e676' : '#aaa',
            border: `1px solid ${studyModeActive ? 'rgba(0,230,118,0.3)' : 'rgba(255,255,255,0.1)'}`,
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            🎓 STUDY MODE
          </span>
        </div>
      </div>

      {/* Center: Search Bar & Voice Mic */}
      <div className="yt-search-container">
        <div style={{ display: 'flex', width: '100%' }}>
          <input 
            type="text" 
            className="yt-search-box"
            placeholder={`Search ${currentExam.name} topics... (e.g. Rotational Motion, Fundamental Rights)`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="yt-search-btn" title="Search">
            <Search size={18} />
          </button>
        </div>

        <button className="yt-mic-btn" title="Search with your voice">
          <Mic size={18} />
        </button>
      </div>

      {/* Right: Actions, Native Study Mode Switch & User Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Exam Selector Pill */}
        <select 
          value={selectedExamId} 
          onChange={(e) => setSelectedExamId(e.target.value)}
          style={{
            background: '#272727',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '18px',
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {Object.values(EXAMS_DATABASE).map(exam => (
            <option key={exam.id} value={exam.id}>
              {exam.icon} {exam.name}
            </option>
          ))}
        </select>

        {/* NATIVE STUDY MODE TOGGLE BUTTON */}
        <button 
          className={`yt-study-switch-btn ${studyModeActive ? 'active' : 'inactive'}`}
          onClick={() => setStudyModeActive(!studyModeActive)}
          title="Toggle YouTube Study Mode AI Recommendation Tuning"
        >
          {studyModeActive ? <ShieldCheck size={18} /> : <Sparkles size={18} />}
          <span>STUDY MODE {studyModeActive ? 'ON' : 'OFF'}</span>
        </button>

        {/* Create (+) Icon */}
        <button className="yt-icon-btn" title="Create">
          <Video size={20} />
        </button>

        {/* Notifications Icon */}
        <button className="yt-icon-btn" title="Notifications">
          <Bell size={20} />
        </button>

        {/* User Profile Avatar */}
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00e676', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>
          A
        </div>

      </div>

    </header>
  );
}
