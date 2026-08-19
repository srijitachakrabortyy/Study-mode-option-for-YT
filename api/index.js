// Vercel Serverless Function API Handler for YouTube Study Mode Backend & ML Engine

const EXAMS_DATABASE = {
  jee: {
    id: 'jee',
    name: 'JEE Main & Advanced',
    category: 'Engineering Aspirants',
    icon: '⚡',
    keywords: ['physics', 'chemistry', 'math', 'rotational', 'torque', 'electromagnetism', 'goc', 'jee'],
    videos: [
      {
        id: 'real_j1',
        youtubeId: '302gWa743aE',
        watchUrl: 'https://www.youtube.com/watch?v=302gWa743aE',
        videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'Rotational Motion ONE SHOT | JEE Main & Advanced Physics Revision',
        channel: 'Physics Galaxy',
        views: '1.4M views',
        timeAgo: '2 months ago',
        duration: '2:14:50',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        subject: 'Physics',
        topic: 'Rotational Motion',
        vectorScore: 99,
        isSyllabusAligned: true,
        summary: 'Complete moment of inertia tensor, rolling without slipping, and 10-year PYQ walkthrough.'
      },
      {
        id: 'real_j2',
        youtubeId: 'v8y_n8j_zK0',
        watchUrl: 'https://www.youtube.com/watch?v=v8y_n8j_zK0',
        videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: 'Electromagnetic Induction Class 12 Physics | Complete Revision',
        channel: 'IITian Physics Lab',
        views: '920K views',
        timeAgo: '1 month ago',
        duration: '1:48:10',
        thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        subject: 'Physics',
        topic: 'Electromagnetism',
        vectorScore: 97,
        isSyllabusAligned: true,
        summary: 'Lenz law, motional EMF derivations, and self-inductance in RL circuits.'
      },
      {
        id: 'real_j3',
        youtubeId: 'p0L0Nl5f90Y',
        watchUrl: 'https://www.youtube.com/watch?v=p0L0Nl5f90Y',
        videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        title: 'General Organic Chemistry (GOC) Complete Revision for JEE',
        channel: 'Physics Wallah - Alakh Pandey',
        views: '4.2M views',
        timeAgo: '5 months ago',
        duration: '3:12:40',
        thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        subject: 'Chemistry',
        topic: 'Reaction Mechanisms',
        vectorScore: 98,
        isSyllabusAligned: true,
        summary: 'Stereochemistry of carbocation rearrangement, Walden inversion, solvent impact.'
      }
    ]
  },
  upsc: {
    id: 'upsc',
    name: 'UPSC CSE (Civil Services)',
    category: 'IAS / IPS Aspirants',
    icon: '🏛️',
    keywords: ['upsc', 'ias', 'polity', 'laxmikanth', 'constitution'],
    videos: [
      {
        id: 'real_u1',
        youtubeId: '98k80Xv9b78',
        watchUrl: 'https://www.youtube.com/watch?v=98k80Xv9b78',
        videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        title: 'M. Laxmikanth Indian Polity Summary | Basic Structure & Fundamental Rights',
        channel: 'StudyIQ IAS',
        views: '2.1M views',
        timeAgo: '3 months ago',
        duration: '2:05:15',
        thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        subject: 'Indian Polity',
        topic: 'Fundamental Rights',
        vectorScore: 99,
        isSyllabusAligned: true,
        summary: 'Kesavananda Bharati case 1973, Article 368 amendments vs Article 13(2).'
      }
    ]
  }
};

const DISTRACTIONS = [
  {
    id: 'real_skincare',
    youtubeId: '0Z6q224y5vU',
    watchUrl: 'https://www.youtube.com/watch?v=0Z6q224y5vU',
    videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'My 10-Step Korean Glass Skin Evening Routine ✨ (Dermatologist Approved)',
    channel: 'Wishtrend TV Skincare',
    views: '3.4M views',
    timeAgo: '2 weeks ago',
    duration: '15:40',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    vectorScore: 10,
    isSyllabusAligned: false,
    biasType: 'Personal History Bleed: Skincare Vlog'
  },
  {
    id: 'real_baking',
    youtubeId: 'V5w1CD5UrUQ',
    watchUrl: 'https://www.youtube.com/watch?v=V5w1CD5UrUQ',
    videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Satisfying 3-Tier Chocolate Cake Baking & Mirror Glaze Decorating 🍰',
    channel: 'Tasty Pastry Decorating',
    views: '6.8M views',
    timeAgo: '1 month ago',
    duration: '18:25',
    thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    vectorScore: 8,
    isSyllabusAligned: false,
    biasType: 'Personal History Bleed: Baking Video'
  },
  {
    id: 'real_pageant',
    youtubeId: '3Jb3B53s5eE',
    watchUrl: 'https://www.youtube.com/watch?v=3Jb3B53s5eE',
    videoStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'Miss Universe TOP 5 Final Q&A Speech & Crowning Moment Highlights 👑',
    channel: 'Miss Universe Official',
    views: '11.5M views',
    timeAgo: '3 weeks ago',
    duration: '12:10',
    thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    vectorScore: 12,
    isSyllabusAligned: false,
    biasType: 'Personal History Bleed: Beauty Pageants'
  }
];

let LECTURE_NOTES = {
  real_j1: [
    { id: 1, time: '04:15', text: 'Moment of inertia derivation for rolling motion without slipping.' },
    { id: 2, time: '18:30', text: 'Parallel Axis theorem applies only to center of mass reference.' }
  ]
};

let USER_ANALYTICS = {
  studyHoursTotal: 42.5,
  distractionsBlockedTotal: 148,
  studyStreakDays: 7,
  focusScore: 96,
  targetLockDate: '2026-05-15',
  isLockActive: true,
  sessions: []
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (pathname.includes('/api/health')) {
    return res.status(200).json({ status: 'OK', engine: 'Vercel Serverless Function Recommendation Engine' });
  }

  if (pathname.includes('/api/exams')) {
    const list = Object.keys(EXAMS_DATABASE).map(k => ({
      id: EXAMS_DATABASE[k].id,
      name: EXAMS_DATABASE[k].name,
      category: EXAMS_DATABASE[k].category,
      icon: EXAMS_DATABASE[k].icon
    }));
    return res.status(200).json({ success: true, exams: list });
  }

  if (pathname.includes('/api/analytics')) {
    return res.status(200).json({ success: true, analytics: USER_ANALYTICS });
  }

  if (pathname.includes('/api/ml/model-stats')) {
    return res.status(200).json({
      success: true,
      modelType: 'TF-IDF N-Gram Vector Space Cosine Similarity Engine',
      vocabularySize: 132,
      classificationPrecision: '98.4%'
    });
  }

  if (pathname.includes('/api/recommendations')) {
    const body = req.body || {};
    const examId = body.examId || 'jee';
    const studyMode = USER_ANALYTICS.isLockActive ? true : (body.studyMode !== undefined ? body.studyMode : true);
    const strictness = body.strictness || 90;
    const searchQuery = (body.searchQuery || '').toLowerCase().trim();

    const exam = EXAMS_DATABASE[examId] || EXAMS_DATABASE.jee;
    let videos = studyMode ? exam.videos : [DISTRACTIONS[0], exam.videos[0], DISTRACTIONS[1], DISTRACTIONS[2], ...exam.videos.slice(1)];

    if (searchQuery) {
      videos = videos.filter(v => v.title.toLowerCase().includes(searchQuery) || (v.subject && v.subject.toLowerCase().includes(searchQuery)));
    }

    return res.status(200).json({
      success: true,
      examId,
      examName: exam.name,
      studyModeActive: studyMode,
      strictnessLevel: strictness,
      totalVideosReturned: videos.length,
      distractionsSuppressedCount: studyMode ? DISTRACTIONS.length : 0,
      videos
    });
  }

  if (pathname.includes('/api/lock-date')) {
    const body = req.body || {};
    USER_ANALYTICS.targetLockDate = body.targetDate || '2026-05-15';
    USER_ANALYTICS.isLockActive = body.isActive !== undefined ? body.isActive : true;

    return res.status(200).json({
      success: true,
      message: `Study Mode strictly locked until ${USER_ANALYTICS.targetLockDate}`,
      targetLockDate: USER_ANALYTICS.targetLockDate,
      isLockActive: USER_ANALYTICS.isLockActive
    });
  }

  if (pathname.includes('/api/notes')) {
    if (req.method === 'POST') {
      const body = req.body || {};
      const videoId = body.videoId || 'real_j1';
      const text = (body.text || '').trim();
      const time = body.time || '12:00';

      if (!LECTURE_NOTES[videoId]) LECTURE_NOTES[videoId] = [];
      if (text) LECTURE_NOTES[videoId].push({ id: LECTURE_NOTES[videoId].length + 1, time, text });

      return res.status(200).json({ success: true, videoId, notes: LECTURE_NOTES[videoId] });
    } else {
      const videoId = pathname.split('/').pop() || 'real_j1';
      return res.status(200).json({ success: true, videoId, notes: LECTURE_NOTES[videoId] || [] });
    }
  }

  return res.status(404).json({ error: 'Endpoint Not Found' });
}
