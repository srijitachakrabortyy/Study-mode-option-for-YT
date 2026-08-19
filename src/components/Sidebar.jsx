import React from 'react';
import { 
  Home, 
  Tv2, 
  PlaySquare, 
  History, 
  Clock, 
  ThumbsUp, 
  Flame, 
  ShoppingBag, 
  Music, 
  Gamepad2, 
  Newspaper, 
  Trophy, 
  Settings, 
  HelpCircle, 
  ShieldCheck, 
  BrainCircuit, 
  Puzzle, 
  SlidersHorizontal,
  GraduationCap,
  Ban
} from 'lucide-react';
import { EXAMS_DATABASE } from '../data/examsData';

export default function Sidebar({
  studyModeActive,
  setStudyModeActive,
  selectedExamId,
  setSelectedExamId,
  strictnessLevel,
  setStrictnessLevel,
  activeTab,
  setActiveTab,
  sidebarOpen
}) {
  if (!sidebarOpen) return null;

  const currentExam = EXAMS_DATABASE[selectedExamId] || EXAMS_DATABASE.jee;

  return (
    <aside className="yt-sidebar">
      
      {/* Main YouTube Navigation Items */}
      <div 
        className={`yt-sidebar-item ${activeTab === 'simulator' ? 'active' : ''}`}
        onClick={() => setActiveTab('simulator')}
      >
        <Home size={20} />
        <span>Home</span>
      </div>

      {/* Shorts Item (Shows Blocked in Study Mode) */}
      <div 
        className="yt-sidebar-item" 
        style={{ position: 'relative', opacity: studyModeActive ? 0.4 : 1 }}
        title={studyModeActive ? "YouTube Shorts disabled during Study Mode to prevent dopamine traps" : "Shorts"}
      >
        <Tv2 size={20} color={studyModeActive ? '#ff5252' : 'currentColor'} />
        <span>Shorts</span>
        {studyModeActive && (
          <span style={{ fontSize: '9px', background: '#ff0000', color: '#fff', padding: '1px 5px', borderRadius: '4px', fontWeight: 700, marginLeft: 'auto' }}>
            BLOCKED
          </span>
        )}
      </div>

      <div className="yt-sidebar-item">
        <PlaySquare size={20} />
        <span>Subscriptions</span>
      </div>

      <div className="yt-sidebar-divider" />

      {/* "You" Section */}
      <div className="yt-sidebar-header">You</div>
      
      <div className="yt-sidebar-item">
        <History size={20} />
        <span>History</span>
      </div>

      <div className="yt-sidebar-item">
        <Clock size={20} />
        <span>Watch Later</span>
      </div>

      <div className="yt-sidebar-item">
        <ThumbsUp size={20} />
        <span>Liked videos</span>
      </div>

      <div className="yt-sidebar-divider" />

      {/* SPECIAL NATIVE YOUTUBE STUDY MODE PANEL */}
      <div style={{ background: studyModeActive ? 'rgba(0, 230, 118, 0.08)' : 'rgba(255,255,255,0.03)', margin: '0 8px', borderRadius: '12px', padding: '12px 14px', border: studyModeActive ? '1px solid rgba(0, 230, 118, 0.3)' : '1px solid rgba(255,255,255,0.1)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <GraduationCap size={20} color={studyModeActive ? '#00e676' : '#aaa'} />
          <span style={{ fontWeight: 700, fontSize: '13px', color: studyModeActive ? '#00e676' : '#fff' }}>
            YOUTUBE STUDY MODE
          </span>
        </div>

        {/* Study Mode Navigation Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button 
            className={`yt-sidebar-item ${activeTab === 'dashboard' ? 'study-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            style={{ margin: 0, padding: '0 12px', height: '34px', fontSize: '13px' }}
          >
            <BrainCircuit size={16} />
            <span>Aspirant Focus Hub</span>
          </button>

          <button 
            className={`yt-sidebar-item ${activeTab === 'extension' ? 'study-active' : ''}`}
            onClick={() => setActiveTab('extension')}
            style={{ margin: 0, padding: '0 12px', height: '34px', fontSize: '13px' }}
          >
            <Puzzle size={16} />
            <span>Chrome Extension Code</span>
          </button>
        </div>

        {/* Strictness Control inside Sidebar */}
        {studyModeActive && (
          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>
              <span>Recommendation Strictness</span>
              <strong style={{ color: '#00e676' }}>{strictnessLevel}%</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              value={strictnessLevel}
              onChange={(e) => setStrictnessLevel(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#00e676', cursor: 'pointer' }}
            />
          </div>
        )}

      </div>

      <div className="yt-sidebar-divider" />

      {/* Standard Explore Categories */}
      <div className="yt-sidebar-header">Explore</div>

      <div className="yt-sidebar-item" style={{ opacity: studyModeActive ? 0.3 : 1 }}>
        <Flame size={20} />
        <span>Trending</span>
      </div>

      <div className="yt-sidebar-item" style={{ opacity: studyModeActive ? 0.3 : 1 }}>
        <Music size={20} />
        <span>Music</span>
      </div>

      <div className="yt-sidebar-item" style={{ opacity: studyModeActive ? 0.3 : 1 }}>
        <Gamepad2 size={20} />
        <span>Gaming</span>
      </div>

      <div className="yt-sidebar-divider" />

      <div className="yt-sidebar-item">
        <Settings size={20} />
        <span>Settings</span>
      </div>

    </aside>
  );
}
