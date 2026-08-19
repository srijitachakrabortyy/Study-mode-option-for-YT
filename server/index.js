// Standalone Zero-Dependency Node.js Backend Server for YouTube Study Mode
import http from 'node:http';
import { URL } from 'node:url';
import { EXAMS_DATABASE } from './examsData.js';
import { generateRecommendationFeed } from './vectorEngine.js';

const PORT = 5050;
const HOST = '127.0.0.1';

// In-memory analytics store
const userAnalytics = {
  studyHoursTotal: 42.5,
  distractionsBlockedTotal: 148,
  studyStreakDays: 7,
  focusScore: 96,
  sessions: []
};

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJSON(res, 200, {
      status: 'OK',
      service: 'YouTube Study Mode Node.js Recommendation Engine Backend'
    });
  }

  if (req.method === 'GET' && pathname === '/api/exams') {
    const list = Object.keys(EXAMS_DATABASE).map(k => ({
      id: EXAMS_DATABASE[k].id,
      name: EXAMS_DATABASE[k].name,
      category: EXAMS_DATABASE[k].category,
      icon: EXAMS_DATABASE[k].icon
    }));
    return sendJSON(res, 200, { success: true, exams: list });
  }

  if (req.method === 'GET' && pathname === '/api/analytics') {
    return sendJSON(res, 200, { success: true, analytics: userAnalytics });
  }

  if (req.method === 'POST' && pathname === '/api/recommendations') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch(e) {}
      
      const feed = generateRecommendationFeed({
        examId: parsed.examId || 'jee',
        studyMode: parsed.studyMode !== undefined ? parsed.studyMode : true,
        strictness: parsed.strictness || 90,
        searchQuery: parsed.searchQuery || ''
      });

      sendJSON(res, 200, { success: true, ...feed });
    });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/analytics/session') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch(e) {}
      
      const duration = parsed.durationMinutes || 25;
      userAnalytics.studyHoursTotal += Number((duration / 60).toFixed(2));
      userAnalytics.distractionsBlockedTotal += 5;
      userAnalytics.sessions.push({
        timestamp: new Date().toISOString(),
        durationMinutes: duration,
        examId: parsed.examId || 'jee'
      });

      sendJSON(res, 200, {
        success: true,
        message: 'Pomodoro study session recorded',
        analytics: userAnalytics
      });
    });
    return;
  }

  sendJSON(res, 404, { success: false, error: 'Endpoint Not Found' });
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🎓 YouTube Study Mode Backend Running on http://${HOST}:${PORT}`);
  console.log(`👉 REST API Base Endpoint: http://${HOST}:${PORT}/api/recommendations`);
  console.log(`====================================================`);
});
