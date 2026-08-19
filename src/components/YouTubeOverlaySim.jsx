import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Play, 
  Info,
  Tv2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { EXAMS_DATABASE, ALGORITHM_DISTRACTIONS } from '../data/examsData';

export default function YouTubeOverlaySim({
  studyModeActive,
  setStudyModeActive,
  selectedExamId,
  strictnessLevel,
  onSelectVideo,
  searchQuery
}) {
  const [selectedChip, setSelectedChip] = useState('All');
  const currentExam = EXAMS_DATABASE[selectedExamId] || EXAMS_DATABASE.jee;

  const examChips = ['All', ...currentExam.subjects.map(s => s.name), 'PYQ Solutions', 'Derivations', 'Formula Revision'];
  const distractionChips = ['Gaming', 'Vlogs', 'Reaction Videos', 'Shorts Trends'];
  const allChips = studyModeActive ? examChips : [...examChips, ...distractionChips];

  const educationalList = currentExam.educationalVideos || [];

  let filteredEducational = educationalList;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredEducational = educationalList.filter(v => 
      v.title.toLowerCase().includes(q) || 
      v.subject.toLowerCase().includes(q) ||
      v.topic.toLowerCase().includes(q)
    );
  }

  if (selectedChip !== 'All' && !distractionChips.includes(selectedChip)) {
    filteredEducational = filteredEducational.filter(v => v.subject.toLowerCase().includes(selectedChip.toLowerCase()) || v.topic.toLowerCase().includes(selectedChip.toLowerCase()));
  }

  let feedVideos = [];
  if (!studyModeActive) {
    feedVideos = [
      ALGORITHM_DISTRACTIONS[0],
      filteredEducational[0] || educationalList[0],
      ALGORITHM_DISTRACTIONS[1],
      filteredEducational[1] || educationalList[1],
      ALGORITHM_DISTRACTIONS[2],
      ...filteredEducational.slice(2)
    ].filter(Boolean);
  } else {
    feedVideos = filteredEducational.filter(v => v.vectorScore >= (100 - strictnessLevel));
  }

  const handleImageError = (e, fallbackSrc) => {
    if (fallbackSrc && e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
    }
  };

  return (
    <div style={{ flex: 1, minWidth: 0, background: 'var(--yt-spec-base-background)' }}>
      
      {/* Chips Carousel */}
      <div className="yt-chips-bar">
        {allChips.map(chip => {
          const isDistraction = distractionChips.includes(chip);
          const isSelected = selectedChip === chip;

          return (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`yt-chip ${isSelected ? 'selected' : ''} ${studyModeActive && !isDistraction ? 'study-highlight' : ''} ${studyModeActive && isDistraction ? 'distraction-dimmed' : ''}`}
            >
              {chip} {isDistraction && studyModeActive && '⚠️'}
            </button>
          );
        })}
      </div>

      {/* Alert Banner */}
      <div style={{ padding: '0 24px', marginTop: '8px' }}>
        <div style={{
          background: studyModeActive ? 'rgba(0, 230, 118, 0.08)' : 'rgba(255, 0, 0, 0.08)',
          border: `1px solid ${studyModeActive ? 'rgba(0, 230, 118, 0.3)' : 'rgba(255, 0, 0, 0.3)'}`,
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {studyModeActive ? (
              <ShieldCheck size={24} color="#00e676" />
            ) : (
              <AlertTriangle size={24} color="#ff5252" />
            )}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: studyModeActive ? '#00e676' : '#ff5252' }}>
                {studyModeActive ? `YouTube Study Mode Active (${currentExam.name})` : 'Standard YouTube Unfiltered Feed'}
              </h4>
              <p style={{ fontSize: '12px', color: '#aaa' }}>
                {studyModeActive 
                  ? `Clickbait & non-syllabus recommendations suppressed. Feed is strictly matched against ${currentExam.name} syllabus tree.`
                  : 'Personal watch history (Korean Glass Skincare, Cake Baking, Miss Universe) bleeds into your feed.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ background: '#121212', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: studyModeActive ? '#00e676' : '#ff5252' }}>
                {studyModeActive ? ALGORITHM_DISTRACTIONS.length : 0}
              </div>
              <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase' }}>Filtered</div>
            </div>

            <div style={{ background: '#121212', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#00e5ff' }}>
                {studyModeActive ? '98%' : '42%'}
              </div>
              <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase' }}>Vector Match</div>
            </div>
          </div>

        </div>
      </div>

      {/* Official YouTube Video Cards Grid (Min 330px Width) */}
      <div className="yt-video-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))' }}>
        {feedVideos.map((video) => {
          const isDistraction = !video.isSyllabusAligned;

          return (
            <div 
              key={video.id}
              className={`yt-video-card ${isDistraction && studyModeActive ? 'yt-card-filtered' : ''}`}
              onClick={() => onSelectVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className="yt-thumbnail-wrapper">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  onError={(e) => handleImageError(e, video.fallbackThumbnail)}
                  className="yt-thumbnail"
                />
                
                {/* Duration Badge */}
                <span className="yt-duration-badge">{video.duration}</span>

                {/* Vector Similarity Score Overlay */}
                {!isDistraction ? (
                  <span className="yt-vector-badge">
                    <Sparkles size={11} /> {video.vectorScore}% Match
                  </span>
                ) : (
                  <span className="yt-distraction-badge">
                    <AlertTriangle size={11} /> {video.biasType}
                  </span>
                )}
              </div>

              {/* Video Details */}
              <div className="yt-video-details">
                <img src={video.avatar} alt={video.channel} className="yt-avatar" />
                
                <div className="yt-video-meta">
                  <h3 className="yt-video-title" title={video.title} style={{ fontSize: '15px', lineHeight: '1.35', fontWeight: 500 }}>
                    {video.title}
                  </h3>

                  <div className="yt-channel-name" style={{ fontSize: '13px' }}>
                    <span>{video.channel}</span>
                    {!isDistraction && <CheckCircle2 size={12} color="#00e676" />}
                  </div>

                  <div className="yt-meta-row" style={{ fontSize: '13px' }}>
                    <span>{video.views}</span>
                    <span> • </span>
                    <span>{video.timeAgo}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
