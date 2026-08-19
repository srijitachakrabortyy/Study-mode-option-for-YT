# 🎓 YouTube Study Mode

> **An AI & Machine Learning-Powered Desktop Feature Concept for YouTube to Eliminate Personal Watch History Bleed for Competitive Exam Aspirants.**

📄 **[Read Full Product Requirement Document (PRD.md)](PRD.md)**  

## 🚨 Problem Statement Overview

Competitive exam aspirants (preparing for **JEE Main & Advanced, UPSC CSE, NEET, GATE, SSC, CAT**) heavily rely on YouTube Desktop for high-yield lecture series, concept revisions, and past-year question (PYQ) walkthroughs.

However, YouTube’s default recommendation algorithm is optimized for **maximum user engagement and retention**, not educational focus:

1. **Personal Watch History Bleed**: Non-educational personal interests (e.g., *10-Step Korean Glass Skincare Routines*, *3-Tier Chocolate Cake Baking*, *Miss Universe Crowning Speeches*) constantly leak into their home feed during study sessions.
2. **Cognitive Friction & Context Switching**: Spotting attractive entertainment thumbnails induces dopamine triggers, breaking deep study focus and causing hours of lost preparation time.
3. **Lack of Enforced Focus Controls**: Standard YouTube offers no strict date-locking or syllabus-alignment mechanism to protect students during critical exam preparation weeks.

---

## 💡 The Solution Overview

**YouTube Study Mode** transforms standard YouTube into an elite, distraction-free learning environment using a **Machine Learning Content-Based Vector Engine**.

### Key Solution Pillars:

1. **Machine Learning Syllabus Vector Engine ([`server/ml_engine.py`](server/ml_engine.py) & [`api/index.js`](api/index.js))**:
   - Vectorizes exam syllabus documents into **132-dimensional TF-IDF N-gram feature spaces**.
   - Calculates real-time **Cosine Similarity Scores** $\text{CosineSim}(\vec{V}, \vec{S}) = \frac{\vec{V} \cdot \vec{S}}{\|\vec{V}\| \|\vec{S}\|}$ between video metadata vectors $\vec{V}$ and exam syllabus vectors $\vec{S}$.

2. **Personal History Distraction Suppressor**:
   - Identifies non-educational video topics and applies distraction mitigation penalties $P_{\text{distraction}}$, filtering out 100% of personal watch history bleed when Study Mode is active.

3. **Strict Target Exam Date Lock Timer**:
   - Aspirants set a target exam date (e.g., `2026-05-15`). Study Mode is **STRICTLY LOCKED ON** (`🔒 LOCKED ON`) with a live countdown ticker (`⏳ 87 Days Left`), preventing students from disabling focus filtering during exam prep.

4. **Integrated Student Productivity Suite**:
   - **Timestamp Note-Taking**: Save lecture formulas and notes linked to video timestamps (`04:15`, `18:30`), persisted via backend REST API.
   - **Pomodoro 25-Min Study Clock**: Includes celebratory confetti rewards upon completion and logs focus hours.
   - **Dual Video Stream Player**: Hybrid HTML5 video stream player (`.mp4`) and YouTube `<iframe>` embed mode with direct external links.

---

## 🚀 How to Run Locally

### Step 1: Start Backend REST API Server
```bash
python3 server/app.py
# Server running on http://127.0.0.1:5050
```

### Step 2: Open Web Client
Open [`demo.html`](demo.html) directly in any Web Browser, or launch local HTTP server:
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080/demo.html`
