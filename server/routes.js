import express from 'express';
import { EXAMS_DATABASE } from './examsData.js';
import { generateRecommendationFeed } from './vectorEngine.js';

const router = express.Router();

const userAnalytics = {
  studyHoursTotal: 42.5,
  distractionsBlockedTotal: 148,
  studyStreakDays: 7,
  focusScore: 96,
  sessions: []
};

router.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'YouTube Study Mode Recommendation Backend API' });
});

router.get('/exams', (req, res) => {
  const list = Object.keys(EXAMS_DATABASE).map(k => ({
    id: EXAMS_DATABASE[k].id,
    name: EXAMS_DATABASE[k].name,
    category: EXAMS_DATABASE[k].category,
    icon: EXAMS_DATABASE[k].icon
  }));
  res.json({ success: true, exams: list });
});

router.post('/recommendations', (req, res) => {
  const { examId, studyMode, strictness, searchQuery } = req.body || {};
  const feedData = generateRecommendationFeed({
    examId: examId || 'jee',
    studyMode: studyMode !== undefined ? studyMode : true,
    strictness: strictness || 90,
    searchQuery: searchQuery || ''
  });
  res.json({ success: true, ...feedData });
});

router.post('/analytics/session', (req, res) => {
  const { durationMinutes = 25, examId = 'jee' } = req.body || {};
  
  userAnalytics.studyHoursTotal += Number((durationMinutes / 60).toFixed(2));
  userAnalytics.distractionsBlockedTotal += 5;
  userAnalytics.sessions.push({
    timestamp: new Date().toISOString(),
    durationMinutes,
    examId
  });

  res.json({
    success: true,
    message: 'Focus session recorded successfully',
    analytics: userAnalytics
  });
});

router.get('/analytics', (req, res) => {
  res.json({ success: true, analytics: userAnalytics });
});

export default router;
