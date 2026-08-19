import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import YouTubeOverlaySim from './components/YouTubeOverlaySim';
import VideoPlayerView from './components/VideoPlayerView';
import FocusDashboard from './components/FocusDashboard';
import ExtensionGuide from './components/ExtensionGuide';

export default function App() {
  const [studyModeActive, setStudyModeActive] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState('jee');
  const [strictnessLevel, setStrictnessLevel] = useState(90);
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'dashboard' | 'extension'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [streakCount, setStreakCount] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--yt-spec-base-background)' }}>
      
      {/* Exact YouTube Original Top Header */}
      <Header 
        studyModeActive={studyModeActive}
        setStudyModeActive={setStudyModeActive}
        selectedExamId={selectedExamId}
        setSelectedExamId={(examId) => {
          setSelectedExamId(examId);
          setSelectedVideo(null);
        }}
        strictnessLevel={strictnessLevel}
        setStrictnessLevel={setStrictnessLevel}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedVideo(null);
        }}
        streakCount={streakCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Body Layout: Left Sidebar + Center View */}
      <div style={{ display: 'flex', flex: 1, minWidth: 0 }}>
        
        {/* Exact YouTube Original Left Sidebar */}
        <Sidebar 
          studyModeActive={studyModeActive}
          setStudyModeActive={setStudyModeActive}
          selectedExamId={selectedExamId}
          setSelectedExamId={setSelectedExamId}
          strictnessLevel={strictnessLevel}
          setStrictnessLevel={setStrictnessLevel}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedVideo(null);
          }}
          sidebarOpen={sidebarOpen}
        />

        {/* Primary View */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {selectedVideo ? (
            <VideoPlayerView 
              video={selectedVideo}
              onBack={() => setSelectedVideo(null)}
              studyModeActive={studyModeActive}
              selectedExamId={selectedExamId}
              onSelectVideo={(video) => setSelectedVideo(video)}
            />
          ) : (
            <>
              {activeTab === 'simulator' && (
                <YouTubeOverlaySim 
                  studyModeActive={studyModeActive}
                  setStudyModeActive={setStudyModeActive}
                  selectedExamId={selectedExamId}
                  strictnessLevel={strictnessLevel}
                  onSelectVideo={(video) => setSelectedVideo(video)}
                  searchQuery={searchQuery}
                />
              )}

              {activeTab === 'dashboard' && (
                <FocusDashboard 
                  selectedExamId={selectedExamId}
                  streakCount={streakCount}
                />
              )}

              {activeTab === 'extension' && (
                <ExtensionGuide />
              )}
            </>
          )}
        </main>

      </div>

    </div>
  );
}
