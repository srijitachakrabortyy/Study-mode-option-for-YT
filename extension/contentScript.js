// YouTube Study Mode - Content Script
(function () {
  let studyModeActive = true;
  let targetExam = 'jee';

  // Load user settings from chrome storage if available
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(['studyModeActive', 'targetExam'], (result) => {
      if (result.studyModeActive !== undefined) studyModeActive = result.studyModeActive;
      if (result.targetExam) targetExam = result.targetExam;
      applyStudyMode();
    });
  }

  function injectBadge() {
    if (document.getElementById('yt-study-mode-floating-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'yt-study-mode-floating-badge';
    badge.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:16px;">🎓</span>
        <div>
          <div style="font-weight:800;font-size:12px;letter-spacing:0.5px;">STUDY MODE: ${studyModeActive ? 'ACTIVE' : 'OFF'}</div>
          <div style="font-size:10px;opacity:0.8;">Target: ${targetExam.toUpperCase()} (Vector Filter ON)</div>
        </div>
      </div>
    `;
    badge.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: ${studyModeActive ? 'linear-gradient(135deg, #00e676, #00b0ff)' : '#ff0000'};
      color: ${studyModeActive ? '#05180f' : '#ffffff'};
      padding: 10px 18px;
      border-radius: 30px;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 8px 25px rgba(0,0,0,0.5);
      cursor: pointer;
      transition: all 0.3s ease;
    `;

    badge.addEventListener('click', () => {
      studyModeActive = !studyModeActive;
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.sync.set({ studyModeActive });
      }
      applyStudyMode();
      injectBadge();
    });

    document.body.appendChild(badge);
  }

  function applyStudyMode() {
    if (!studyModeActive) {
      document.body.classList.remove('yt-study-mode-enabled');
      return;
    }

    document.body.classList.add('yt-study-mode-enabled');

    // 1. Hide Shorts Shelf
    document.querySelectorAll('ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer, ytd-shorts').forEach(el => {
      el.style.display = 'none';
    });

    // 2. Filter Recommendations Feed
    const videoSelectors = 'ytd-rich-item-renderer, ytd-compact-video-renderer';
    document.querySelectorAll(videoSelectors).forEach(card => {
      const text = card.innerText.toLowerCase();
      const isStudyRelated = text.includes('lecture') || text.includes('pyq') || text.includes('physics') || text.includes('chemistry') || text.includes('math') || text.includes('upsc') || text.includes('jee') || text.includes('neet') || text.includes('gate') || text.includes('revision');
      
      if (!isStudyRelated && !card.dataset.studyChecked) {
        card.dataset.studyChecked = 'true';
        card.style.opacity = '0.2';
        card.style.filter = 'blur(3px)';
        card.title = 'Distraction Outlier Filtered by YouTube Study Mode';
      }
    });
  }

  // Observe page changes
  const observer = new MutationObserver(() => {
    applyStudyMode();
    injectBadge();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial call
  setTimeout(() => {
    injectBadge();
    applyStudyMode();
  }, 1000);
})();
