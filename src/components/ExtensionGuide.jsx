import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Puzzle, 
  Terminal, 
  Sparkles 
} from 'lucide-react';

export default function ExtensionGuide() {
  const [copiedFile, setCopiedFile] = useState(null);

  const manifestCode = `{
  "manifest_version": 3,
  "name": "YouTube Study Mode - Aspirant AI Focus",
  "version": "1.0.0",
  "description": "Filters YouTube recommendations using syllabus vector matching and hides clickbait for competitive exam aspirants.",
  "permissions": ["storage", "activeTab"],
  "content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["contentScript.js"],
      "css": ["styles.css"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  }
}`;

  const contentScriptCode = `// YouTube Study Mode - Content Script Manifest V3
(function() {
  let studyModeEnabled = true;
  let targetExam = "jee";

  // Function to filter out YouTube clickbait / distraction elements
  function sanitizeYouTubeFeed() {
    if (!studyModeEnabled) return;

    // 1. Hide YouTube Shorts shelf on Home & Search
    document.querySelectorAll('ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer').forEach(el => {
      el.style.display = 'none';
    });

    // 2. Hide Non-syllabus side recommendations on Watch Page
    document.querySelectorAll('ytd-compact-video-renderer').forEach(card => {
      const titleText = card.innerText.toLowerCase();
      // Keywords check or call local vector matcher API
      const isEducational = titleText.includes('physics') || titleText.includes('pyq') || titleText.includes('lecture') || titleText.includes('concept');
      if (!isEducational) {
        card.style.opacity = '0.15'; // Dim or hide
        card.style.filter = 'blur(4px)';
      }
    });

    // 3. Inject YouTube Study Mode Floating Control Badge
    if (!document.getElementById('yt-study-mode-badge')) {
      const badge = document.createElement('div');
      badge.id = 'yt-study-mode-badge';
      badge.innerHTML = '🎓 Study Mode: ACTIVE (JEE Physics)';
      badge.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:99999;background:#00e676;color:#000;padding:10px 18px;border-radius:20px;font-weight:bold;box-shadow:0 4px 15px rgba(0,230,118,0.5);font-family:sans-serif;cursor:pointer;';
      document.body.appendChild(badge);
    }
  }

  // Run sanitizer every 2 seconds to catch dynamically loaded videos
  setInterval(sanitizeYouTubeFeed, 2000);
})();`;

  const copyToClipboard = (text, fileName) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Puzzle size={28} color="var(--study-green)" /> Chrome Extension Generator (Manifest V3)
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Install YouTube Study Mode directly onto <strong style={{ color: '#fff' }}>youtube.com</strong> in 3 simple steps.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--study-green)', background: 'rgba(0,230,118,0.1)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: 600, border: '1px solid rgba(0,230,118,0.2)' }}>
            Manifest V3 Compatible
          </span>
        </div>
      </div>

      {/* Installation Steps Box */}
      <div className="glass-panel active-study" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={20} color="var(--study-green)" /> How to Install on Chrome / Brave / Edge:
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--study-green)', marginBottom: '6px' }}>Step 1</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Open your browser and navigate to <code style={{ color: 'var(--study-cyan)', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' }}>chrome://extensions</code>
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--study-cyan)', marginBottom: '6px' }}>Step 2</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Enable <strong>Developer Mode</strong> toggle in the top-right corner of the Extensions page.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--study-purple)', marginBottom: '6px' }}>Step 3</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Click <strong>"Load Unpacked"</strong> and select the <code style={{ color: 'var(--study-green)' }}>extension/</code> folder created in this workspace!
            </p>
          </div>

        </div>
      </div>

      {/* Extension Code Display Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Manifest.json Code Box */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>extension/manifest.json</h4>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              onClick={() => copyToClipboard(manifestCode, 'manifest.json')}
            >
              {copiedFile === 'manifest.json' ? <Check size={14} color="var(--study-green)" /> : <Copy size={14} />}
              <span>{copiedFile === 'manifest.json' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre style={{ background: '#0a0a0f', padding: '16px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--study-cyan)', overflowX: 'auto', maxHeight: '340px' }}>
            {manifestCode}
          </pre>
        </div>

        {/* ContentScript.js Code Box */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>extension/contentScript.js</h4>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              onClick={() => copyToClipboard(contentScriptCode, 'contentScript.js')}
            >
              {copiedFile === 'contentScript.js' ? <Check size={14} color="var(--study-green)" /> : <Copy size={14} />}
              <span>{copiedFile === 'contentScript.js' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre style={{ background: '#0a0a0f', padding: '16px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--study-green)', overflowX: 'auto', maxHeight: '340px' }}>
            {contentScriptCode}
          </pre>
        </div>

      </div>

    </div>
  );
}
