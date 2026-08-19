document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('studyModeToggle');
  const examSelect = document.getElementById('examSelect');

  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(['studyModeActive', 'targetExam'], (res) => {
      if (res.studyModeActive !== undefined) toggle.checked = res.studyModeActive;
      if (res.targetExam) examSelect.value = res.targetExam;
    });

    toggle.addEventListener('change', () => {
      chrome.storage.sync.set({ studyModeActive: toggle.checked });
    });

    examSelect.addEventListener('change', () => {
      chrome.storage.sync.set({ targetExam: examSelect.value });
    });
  }
});
