// Backend Recommendation Tuning & Vector Matching Engine (ES Module)
import { EXAMS_DATABASE, DISTRACTION_POOL } from './examsData.js';

export function calculateVectorScore(video, examKeywords) {
  const text = `${video.title} ${video.subject || ''} ${video.topic || ''} ${(video.tags || []).join(' ')}`.toLowerCase();
  const words = text.split(/\W+/).filter(Boolean);
  
  if (words.length === 0 || !examKeywords || examKeywords.length === 0) return 10;

  let matchCount = 0;
  for (const keyword of examKeywords) {
    if (text.includes(keyword.toLowerCase())) {
      matchCount += 1;
    }
  }

  const rawScore = (matchCount / Math.min(examKeywords.length, 10)) * 100;
  const boundedScore = Math.min(99, Math.max(8, Math.round(rawScore + (video.tags ? 35 : 0))));

  return boundedScore;
}

export function generateRecommendationFeed({ examId = 'jee', studyMode = true, strictness = 90, searchQuery = '' }) {
  const exam = EXAMS_DATABASE[examId] || EXAMS_DATABASE.jee;
  const examKeywords = exam.keywords || [];

  const scoredEducational = exam.videos.map(v => {
    const vectorScore = calculateVectorScore(v, examKeywords);
    return {
      ...v,
      vectorScore,
      isSyllabusAligned: true
    };
  });

  const scoredDistractions = DISTRACTION_POOL.map(d => {
    const vectorScore = calculateVectorScore(d, examKeywords);
    return {
      ...d,
      vectorScore: Math.min(15, vectorScore),
      isSyllabusAligned: false
    };
  });

  let finalFeed = [];

  if (studyMode) {
    const minThreshold = 100 - strictness;
    finalFeed = scoredEducational.filter(v => v.vectorScore >= minThreshold);
  } else {
    finalFeed = [
      scoredDistractions[0],
      scoredEducational[0],
      scoredDistractions[1],
      scoredDistractions[2],
      ...scoredEducational.slice(1)
    ].filter(Boolean);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    finalFeed = finalFeed.filter(v => v.title.toLowerCase().includes(q) || (v.subject && v.subject.toLowerCase().includes(q)));
  }

  return {
    examId: exam.id,
    examName: exam.name,
    studyModeActive: studyMode,
    strictnessLevel: strictness,
    totalVideosReturned: finalFeed.length,
    distractionsSuppressedCount: studyMode ? DISTRACTION_POOL.length : 0,
    videos: finalFeed
  };
}
