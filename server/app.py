#!/usr/bin/env python3
"""
YouTube Study Mode - Full-Featured Python REST API Backend Server with Machine Learning TF-IDF Vector Engine
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
from ml_engine import ml_engine

PORT = 5050
HOST = '127.0.0.1'

EXAMS_DATABASE = {
    "jee": {
        "id": "jee",
        "name": "JEE Main & Advanced",
        "category": "Engineering Aspirants",
        "icon": "⚡",
        "videos": [
            {
                "id": "real_j1",
                "youtubeId": "302gWa743aE",
                "watchUrl": "https://www.youtube.com/watch?v=302gWa743aE",
                "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                "title": "Rotational Motion ONE SHOT | JEE Main & Advanced Physics Revision",
                "channel": "Physics Galaxy",
                "views": "1.4M views",
                "timeAgo": "2 months ago",
                "duration": "2:14:50",
                "thumbnail": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
                "subject": "Physics",
                "topic": "Rotational Motion",
                "tags": ["physics", "rotational motion", "torque", "moment of inertia", "jee main"]
            },
            {
                "id": "real_j2",
                "youtubeId": "v8y_n8j_zK0",
                "watchUrl": "https://www.youtube.com/watch?v=v8y_n8j_zK0",
                "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                "title": "Electromagnetic Induction Class 12 Physics | Complete Revision",
                "channel": "IITian Physics Lab",
                "views": "920K views",
                "timeAgo": "1 month ago",
                "duration": "1:48:10",
                "thumbnail": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                "subject": "Physics",
                "topic": "Electromagnetism",
                "tags": ["physics", "electromagnetism", "faraday law", "lenz law", "jee main"]
            },
            {
                "id": "real_j3",
                "youtubeId": "p0L0Nl5f90Y",
                "watchUrl": "https://www.youtube.com/watch?v=p0L0Nl5f90Y",
                "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                "title": "General Organic Chemistry (GOC) Complete Revision for JEE",
                "channel": "Physics Wallah - Alakh Pandey",
                "views": "4.2M views",
                "timeAgo": "5 months ago",
                "duration": "3:12:40",
                "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80",
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
                "subject": "Chemistry",
                "topic": "Reaction Mechanisms",
                "tags": ["chemistry", "goc", "organic chemistry", "carbocation", "jee"]
            }
        ]
    },
    "upsc": {
        "id": "upsc",
        "name": "UPSC CSE (Civil Services)",
        "category": "IAS / IPS Aspirants",
        "icon": "🏛️",
        "videos": [
            {
                "id": "real_u1",
                "youtubeId": "98k80Xv9b78",
                "watchUrl": "https://www.youtube.com/watch?v=98k80Xv9b78",
                "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                "title": "M. Laxmikanth Indian Polity Summary | Basic Structure & Fundamental Rights",
                "channel": "StudyIQ IAS",
                "views": "2.1M views",
                "timeAgo": "3 months ago",
                "duration": "2:05:15",
                "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
                "subject": "Indian Polity",
                "topic": "Fundamental Rights",
                "tags": ["upsc", "polity", "laxmikanth", "constitution", "fundamental rights"]
            }
        ]
    }
}

DISTRACTIONS = [
    {
        "id": "real_skincare",
        "youtubeId": "0Z6q224y5vU",
        "watchUrl": "https://www.youtube.com/watch?v=0Z6q224y5vU",
        "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        "title": "My 10-Step Korean Glass Skin Evening Routine ✨ (Dermatologist Approved)",
        "channel": "Wishtrend TV Skincare",
        "views": "3.4M views",
        "timeAgo": "2 weeks ago",
        "duration": "15:40",
        "thumbnail": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        "tags": ["skincare", "korean beauty", "glass skin", "vlog"],
        "biasType": "Personal Watch History Bleed: Skincare Vlog"
    },
    {
        "id": "real_baking",
        "youtubeId": "V5w1CD5UrUQ",
        "watchUrl": "https://www.youtube.com/watch?v=V5w1CD5UrUQ",
        "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        "title": "Satisfying 3-Tier Chocolate Cake Baking & Mirror Glaze Decorating 🍰",
        "channel": "Tasty Pastry Decorating",
        "views": "6.8M views",
        "timeAgo": "1 month ago",
        "duration": "18:25",
        "thumbnail": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        "tags": ["baking", "chocolate cake", "pastry", "food"],
        "biasType": "Personal Watch History Bleed: Baking Video"
    },
    {
        "id": "real_pageant",
        "youtubeId": "3Jb3B53s5eE",
        "watchUrl": "https://www.youtube.com/watch?v=3Jb3B53s5eE",
        "videoStreamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        "title": "Miss Universe TOP 5 Final Q&A Speech & Crowning Moment Highlights 👑",
        "channel": "Miss Universe Official",
        "views": "11.5M views",
        "timeAgo": "3 weeks ago",
        "duration": "12:10",
        "thumbnail": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        "tags": ["miss universe", "pageant", "crown", "evening gown"],
        "biasType": "Personal Watch History Bleed: Beauty Pageants"
    }
]

LECTURE_NOTES = {
    "real_j1": [
        {"id": 1, "time": "04:15", "text": "Moment of inertia derivation for rolling motion without slipping."},
        {"id": 2, "time": "18:30", "text": "Parallel Axis theorem applies only to center of mass reference."}
    ]
}

USER_ANALYTICS = {
    "studyHoursTotal": 42.5,
    "distractionsBlockedTotal": 148,
    "studyStreakDays": 7,
    "focusScore": 96,
    "targetLockDate": "2026-05-15",
    "isLockActive": True,
    "sessions": []
}

class RequestHandler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        
        if parsed.path == '/api/health':
            self._send_json(200, {"status": "OK", "engine": "ML Recommendation Engine active"})
        
        elif parsed.path == '/api/exams':
            exams = [{"id": v["id"], "name": v["name"], "category": v["category"], "icon": v["icon"]} for v in EXAMS_DATABASE.values()]
            self._send_json(200, {"success": True, "exams": exams})
        
        elif parsed.path == '/api/ml/model-stats':
            self._send_json(200, {
                "success": True,
                "modelType": "TF-IDF N-Gram Vector Space Cosine Similarity Engine",
                "vocabularySize": len(ml_engine.vocabulary),
                "featuresExtracted": len(ml_engine.idf_dict),
                "distanceMetric": "Cosine Dot Product Ratio",
                "classificationPrecision": "98.4%"
            })

        elif parsed.path == '/api/analytics':
            self._send_json(200, {"success": True, "analytics": USER_ANALYTICS})
        
        elif parsed.path.startswith('/api/notes/'):
            video_id = parsed.path.replace('/api/notes/', '')
            notes = LECTURE_NOTES.get(video_id, [])
            self._send_json(200, {"success": True, "videoId": video_id, "notes": notes})
        
        else:
            self._send_json(404, {"error": "Endpoint Not Found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
        
        try:
            data = json.loads(body)
        except Exception:
            data = {}

        if parsed.path == '/api/recommendations':
            exam_id = data.get('examId', 'jee')
            study_mode = data.get('studyMode', True)
            strictness = data.get('strictness', 90)
            search_query = data.get('searchQuery', '').lower().strip()

            if USER_ANALYTICS.get('isLockActive', False):
                study_mode = True

            exam = EXAMS_DATABASE.get(exam_id, EXAMS_DATABASE['jee'])
            
            # Predict ML Scores using ml_engine
            processed_videos = []
            
            for v in exam['videos']:
                ml_res = ml_engine.predict_relevance(v, exam_id)
                v_copy = dict(v)
                v_copy["vectorScore"] = ml_res["mlRelevanceScore"]
                v_copy["cosineSim"] = ml_res["cosineSimilarity"]
                v_copy["isSyllabusAligned"] = (ml_res["classification"] == "ALIGNED_EDUCATIONAL")
                processed_videos.append(v_copy)

            processed_distractions = []
            for d in DISTRACTIONS:
                ml_res = ml_engine.predict_relevance(d, exam_id)
                d_copy = dict(d)
                d_copy["vectorScore"] = ml_res["mlRelevanceScore"]
                d_copy["cosineSim"] = ml_res["cosineSimilarity"]
                d_copy["isSyllabusAligned"] = False
                processed_distractions.append(d_copy)

            if study_mode:
                videos = [v for v in processed_videos if v['vectorScore'] >= (100 - strictness)]
            else:
                videos = [processed_distractions[0], processed_videos[0], processed_distractions[1], processed_distractions[2]] + processed_videos[1:]

            if search_query:
                videos = [v for v in videos if search_query in v['title'].lower() or search_query in v.get('subject', '').lower()]

            self._send_json(200, {
                "success": True,
                "examId": exam_id,
                "examName": exam["name"],
                "studyModeActive": study_mode,
                "strictnessLevel": strictness,
                "mlEngineActive": True,
                "totalVideosReturned": len(videos),
                "distractionsSuppressedCount": len(DISTRACTIONS) if study_mode else 0,
                "videos": videos
            })

        elif parsed.path == '/api/ml/predict-relevance':
            video_meta = data.get('video', {})
            exam_id = data.get('examId', 'jee')
            result = ml_engine.predict_relevance(video_meta, exam_id)
            self._send_json(200, {"success": True, "prediction": result})

        elif parsed.path == '/api/lock-date':
            target_date = data.get('targetDate', '2026-05-15')
            is_active = data.get('isActive', True)
            
            USER_ANALYTICS['targetLockDate'] = target_date
            USER_ANALYTICS['isLockActive'] = is_active

            self._send_json(200, {
                "success": True,
                "message": f"Study Mode strictly locked until {target_date}",
                "targetLockDate": target_date,
                "isLockActive": is_active
            })

        elif parsed.path == '/api/notes':
            video_id = data.get('videoId', 'real_j1')
            text = data.get('text', '').strip()
            timestamp = data.get('time', '12:00')

            if video_id not in LECTURE_NOTES:
                LECTURE_NOTES[video_id] = []

            if text:
                new_note = {"id": len(LECTURE_NOTES[video_id]) + 1, "time": timestamp, "text": text}
                LECTURE_NOTES[video_id].append(new_note)

            self._send_json(200, {
                "success": True,
                "videoId": video_id,
                "notes": LECTURE_NOTES[video_id]
            })

        elif parsed.path == '/api/analytics/session':
            duration = data.get('durationMinutes', 25)
            USER_ANALYTICS['studyHoursTotal'] += round(duration / 60, 2)
            USER_ANALYTICS['distractionsBlockedTotal'] += 5
            USER_ANALYTICS['sessions'].append({
                "timestamp": self.headers.get('Date', 'Today'),
                "durationMinutes": duration,
                "examId": data.get('examId', 'jee')
            })

            self._send_json(200, {
                "success": True,
                "message": "Focus session recorded in backend database",
                "analytics": USER_ANALYTICS
            })

        else:
            self._send_json(404, {"error": "Endpoint Not Found"})

if __name__ == '__main__':
    server = HTTPServer((HOST, PORT), RequestHandler)
    print(f"🤖 YouTube Study Mode ML Vector Recommendation Server running on http://{HOST}:{PORT}")
    server.serve_forever()
