// Backend Syllabus Taxonomy & Exam Keywords Index (ES Module)
export const EXAMS_DATABASE = {
  jee: {
    id: 'jee',
    name: 'JEE Main & Advanced',
    category: 'Engineering Aspirants',
    icon: '⚡',
    keywords: [
      'physics', 'chemistry', 'math', 'mathematics', 'rotational motion', 'torque', 
      'moment of inertia', 'electromagnetism', 'faraday', 'lenz law', 'organic chemistry', 
      'goc', 'carbocation', 'nucleophile', 'integration', 'calculus', 'iit', 'jee main', 
      'jee advanced', 'pyq', 'derivation', 'one shot'
    ],
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
        tags: ['physics', 'rotational motion', 'jee', 'torque', 'moment of inertia'],
        summary: 'Complete moment of inertia tensor, rolling without slipping, and 10-year PYQ walkthrough.',
        keyPoints: [
          'Parallel & Perpendicular axis theorem derivations',
          'Angular momentum conservation in collision dynamics'
        ]
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
        tags: ['physics', 'electromagnetism', 'faraday law', 'jee main'],
        summary: 'Lenz law, motional EMF derivations, and self-inductance in RL circuits.',
        keyPoints: [
          'Motional EMF in rotating conductor rods',
          'Energy density stored in magnetic fields'
        ]
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
        tags: ['chemistry', 'goc', 'organic chemistry', 'jee'],
        summary: 'Stereochemistry of carbocation rearrangement, Walden inversion, solvent impact.',
        keyPoints: [
          'Carbocation stability order and hydride shifts',
          'Steric hindrance in nucleophilic attack'
        ]
      }
    ]
  },
  upsc: {
    id: 'upsc',
    name: 'UPSC CSE (Civil Services)',
    category: 'IAS / IPS Aspirants',
    icon: '🏛️',
    keywords: [
      'upsc', 'ias', 'ips', 'polity', 'laxmikanth', 'constitution', 'fundamental rights', 
      'article 21', 'basic structure', 'preamble', 'supreme court', 'governance', 'economy'
    ],
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
        tags: ['upsc', 'polity', 'laxmikanth', 'constitution', 'fundamental rights'],
        summary: 'Kesavananda Bharati case 1973, Article 368 amendments vs Article 13(2).',
        keyPoints: [
          'Evolution of Basic Structure Doctrine',
          'Preamble as part of basic structure'
        ]
      }
    ]
  }
};

export const DISTRACTION_POOL = [
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
    tags: ['skincare', 'korean beauty', 'glass skin', 'routine', 'vlog'],
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
    tags: ['baking', 'chocolate cake', 'pastry', 'satisfying', 'food'],
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
    tags: ['miss universe', 'pageant', 'crown', 'evening gown', 'qna'],
    biasType: 'Personal History Bleed: Beauty Pageants'
  }
];
