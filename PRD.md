# 📄 PRODUCT REQUIREMENT DOCUMENT (PRD)
## YouTube Study Mode — AI & ML-Powered Focus Feature Concept

---

| Document Detail | Specification |
|:---|:---|
| **Product Name** | YouTube Study Mode |
| **Document Version** | 1.0.0 |
| **Status** | Approved & Implemented |
| **Target Platform** | Web Browser / YouTube Desktop Clone |
| **Backend Engine** | Python REST API Server (`server/app.py`) |
| **ML Vector Engine** | TF-IDF Cosine Similarity Engine (`server/ml_engine.py`) |

---

## 📌 1. Executive Summary & Vision

### 1.1 Product Vision
**YouTube Study Mode** transforms YouTube into a distraction-free, syllabus-matched learning platform for competitive exam aspirants. By re-ranking recommendations using high-dimensional machine learning vector models, YouTube Study Mode filters out personal watch history distractions (Skincare, Baking, Beauty Pageants) while maintaining YouTube's familiar desktop interface.

### 1.2 The Problem
Competitive exam aspirants (JEE, UPSC, NEET, GATE, SSC, CAT) frequently use YouTube to watch high-yield lecture series and past-year question (PYQ) solutions. However, YouTube's default recommendation algorithm maximizes long-term engagement by bleeding non-educational personal watch history interests into the user's home feed. This triggers cognitive friction, context switching, and lost study hours.

### 1.3 Key Solution Mechanics
1. **Syllabus Vector Matching**: Scores video metadata against official exam syllabus documents using TF-IDF term weighting and Cosine Similarity vector space dot product math.
2. **Personal History Bleed Filtering**: Suppresses non-syllabus interest videos when Study Mode is active.
3. **Strict Target Exam Date Lock**: Locks YouTube into Study Mode until a user-selected exam date arrives.
4. **Student Productivity Suite**: Includes timestamp note-taking, a 25-minute Pomodoro study clock, and dual HTML5/iframe stream playback.

---

## 👤 2. User Personas & User Stories

### Persona 1: JEE Main & Advanced Aspirant (Engineering)
- **Name**: Ananya
- **Goal**: Master Rotational Motion, Electromagnetism, and Organic Chemistry.
- **Pain Point**: Spends hours watching skincare vlogs that bleed into her YouTube home feed.
- **User Story**: *As a JEE aspirant, I want non-exam videos hidden from my feed so I can focus strictly on Physics and Chemistry.*

### Persona 2: UPSC CSE Aspirant (Civil Services)
- **Name**: Rahul
- **Goal**: Complete M. Laxmikanth Indian Polity summaries and track Prelims preparation.
- **Pain Point**: Gets distracted by entertainment shorts and comment sections late at night.
- **User Story**: *As a UPSC aspirant, I want to lock YouTube into Study Mode until my Prelims date so I cannot disable focus filtering during critical preparation weeks.*

---

## ⚙️ 3. Functional Requirements (FRD)

| FR ID | Feature Name | Description | Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---|
| **FR-01** | **Syllabus Vector Feed Re-Ranking** | Re-ranks home feed videos by Cosine Similarity against exam syllabus vectors. | • Calculates TF-IDF vector score for each video.<br>• Filters out videos scoring below strictness threshold when Study Mode is ON. | `P0` |
| **FR-02** | **Personal Watch History Suppression** | Identifies and suppresses non-syllabus personal history videos. | • Identifies non-educational video tags (Skincare, Baking, Beauty Pageants).<br>• Suppresses 100% of distraction videos when Study Mode is active. | `P0` |
| **FR-03** | **Strict Target Exam Date Lock Timer** | Locks Study Mode ON until a candidate's target exam date. | • User selects target date (e.g. `2026-05-15`).<br>• Real-time countdown ticker (`⏳ 87 Days Left`).<br>• Disables Study Mode toggle switch (`🔒 STRICT LOCK ACTIVE`) until target date. | `P0` |
| **FR-04** | **Dual Video Stream Player** | Provides hybrid playback for lecture videos. | • HTML5 direct stream player (`.mp4`) with custom poster.<br>• YouTube official `<iframe>` embed mode.<br>• External `YouTube.com ↗` watch links. | `P1` |
| **FR-05** | **Timestamp Note-Taking & Formulas** | Allows students to write timestamp notes during lecture playback. | • Input notes with video timestamps (`04:15`, `18:30`).<br>• Saves notes to backend database via REST API.<br>• Reloads notes automatically when reopening video. | `P1` |
| **FR-06** | **Aspirant Focus Hub & Pomodoro Clock** | Integrated 25-minute Pomodoro focus clock and analytics. | • 25-minute Pomodoro timer with start/pause/reset.<br>• Triggers celebratory confetti upon completion.<br>• Logs focus session stats to backend database. | `P1` |
| **FR-07** | **Live Search Autocomplete & Filter** | Live autocomplete search suggestions for exam syllabus topics. | • Autocomplete dropdown as user types in search bar.<br>• Dynamically filters home feed videos in real time. | `P2` |

---

## 🎨 4. Non-Functional Requirements (NFR)

### 4.1 UI/UX Boundary Constraints
- **Clean Text Policy**: Raw technical terms (TF-IDF weights, Cosine Similarity math) must **NOT** appear in the user-facing frontend UI. Frontend UI must present clean, intuitive badges: `✨ High Syllabus Match`, `⚡ Exam Aligned`, `🔒 STRICT EXAM LOCK`.
- **Pixel-Perfect Parity**: Matches YouTube's official Dark Theme (`#0f0f0f` background, 56px sticky header, 240px drawer navigation, 16:9 thumbnail ratio).

### 4.2 Performance & Reliability
- **API Response SLA**: REST API recommendation processing completes in `< 50ms`.
- **Zero CORS Errors**: Implements full HTTP/1.1 REST API preflight OPTIONS support across ports (`5050`, `8080`, `3000`).
- **Reliable Media**: Uses high-definition photography fallbacks to guarantee 0% blank thumbnail images.

---

## 🤖 5. Machine Learning Vector Engine Architecture

### Mathematical Model
1. **TF-IDF N-Gram Vectorizer**:
   $$\text{TF-IDF}(t, d) = \text{TF}(t, d) \times \left( \ln \frac{1 + N}{1 + \text{DF}(t)} + 1 \right)$$
2. **Cosine Similarity Dot Product Ratio**:
   $$\text{CosineSimilarity}(\vec{V}, \vec{S}) = \frac{\vec{V} \cdot \vec{S}}{\|\vec{V}\| \|\vec{S}\|} = \frac{\sum_{i=1}^{n} V_i S_i}{\sqrt{\sum_{i=1}^{n} V_i^2} \sqrt{\sum_{i=1}^{n} S_i^2}}$$
3. **Distraction Mitigation Penalty**:
   $$\text{FinalScore} = \max\left(0, \text{CosineSim}(\vec{V}, \vec{S}) - P_{\text{distraction}}\right)$$

---

## 📊 6. Key Performance Indicators (KPIs)

| KPI Metric | Target Goal | Verification Method |
|:---|:---|:---|
| **Distraction Block Rate** | `> 99.5%` | Verified via automated feed classification test suite. |
| **Focus Hours Logged** | `+35% Increase` | Measured via Pomodoro focus session REST API endpoint. |
| **Model Classification Accuracy** | `98.4% Precision` | Evaluated against 132-dimensional syllabus feature vectors. |

---

## 🚀 7. Execution Guide

### Start Backend REST API Server
```bash
python3 server/app.py
# Server running on http://127.0.0.1:5050
```

### Launch Web Client
Open [`demo.html`](file:///Users/srijitachakraborty/Desktop/YT%20Study%20mode%20feature/demo.html) directly in any Web Browser or launch local HTTP server:
```bash
python3 -m http.server 8080
```
Then open: `http://localhost:8080/demo.html`
