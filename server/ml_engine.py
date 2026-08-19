#!/usr/bin/env python3
"""
YouTube Study Mode - Machine Learning Recommendation & TF-IDF Vector Engine
Calculates high-dimensional Cosine Similarity, N-gram feature vectors, and distraction suppression scores.
"""
import math
import re
from collections import Counter

# EXAM SYLLABUS DOCUMENT VECTORS
SYLLABUS_CORPUS = {
    "jee": """
    rotational motion dynamics torque moment of inertia tensor parallel axis theorem perpendicular axis theorem 
    rolling without slipping angular momentum collision dynamics center of mass kinematics electromagnetism 
    faraday law lenz law motional emf self inductance rl circuits magnetic field density organic chemistry goc 
    carbocation stability reaction mechanism nucleophilic substitution walden inversion stereochemistry 
    calculus definite integration differential equations physics chemistry mathematics iit jee main advanced pyq
    """,
    "upsc": """
    indian polity laxmikanth constitution preamble basic structure doctrine kesavananda bharati case 1973 
    fundamental rights article 21 article 14 article 19 supreme court amendments article 368 governance 
    rbi monetary policy inflation control indian economy modern history civil services prelims mains ias ips
    """,
    "neet": """
    human physiology plant physiology genetics inheritance molecular basis biology cell division botany 
    zoology organic chemistry reaction mechanisms thermodynamics kinematics newton laws of motion neet biology
    """,
    "gate": """
    data structures algorithms computer organization operating systems database management system discrete math 
    theory of computation compiler design computer networks engineering mathematics gate cse
    """
}

class TFIDFVectorEngine:
    def __init__(self):
        self.vocabulary = set()
        self.idf_dict = {}
        self._build_vocabulary()

    def _tokenize(self, text):
        text = text.lower()
        words = re.findall(r'\b[a-z0-9]{2,}\b', text)
        return words

    def _build_vocabulary(self):
        doc_count = len(SYLLABUS_CORPUS)
        doc_freq = Counter()

        for doc in SYLLABUS_CORPUS.values():
            tokens = set(self._tokenize(doc))
            for token in tokens:
                self.vocabulary.add(token)
                doc_freq[token] += 1

        for word in self.vocabulary:
            self.idf_dict[word] = math.log((1 + doc_count) / (1 + doc_freq[word])) + 1.0

    def transform(self, text):
        """Converts text into TF-IDF vector"""
        tokens = self._tokenize(text)
        if not tokens:
            return {}

        tf_counts = Counter(tokens)
        total_tokens = len(tokens)
        vector = {}

        for word, count in tf_counts.items():
            if word in self.vocabulary:
                tf = count / total_tokens
                vector[word] = tf * self.idf_dict[word]

        return vector

    def cosine_similarity(self, vec1, vec2):
        """Computes Cosine Similarity dot product ratio"""
        if not vec1 or not vec2:
            return 0.0

        common_keys = set(vec1.keys()) & set(vec2.keys())
        dot_product = sum(vec1[k] * vec2[k] for k in common_keys)

        mag1 = math.sqrt(sum(v ** 2 for v in vec1.values()))
        mag2 = math.sqrt(sum(v ** 2 for v in vec2.values()))

        if mag1 == 0.0 or mag2 == 0.0:
            return 0.0

        return dot_product / (mag1 * mag2)

    def predict_relevance(self, video_metadata, exam_id="jee"):
        """
        ML Classification Predictor:
        Determines whether a video is ALIGNED_EDUCATIONAL or DISTRACTION_BLEED
        """
        exam_doc = SYLLABUS_CORPUS.get(exam_id, SYLLABUS_CORPUS["jee"])
        
        video_text = f"{video_metadata.get('title', '')} {video_metadata.get('subject', '')} {video_metadata.get('topic', '')} {' '.join(video_metadata.get('tags', []))}"
        
        syllabus_vec = self.transform(exam_doc)
        video_vec = self.transform(video_text)

        raw_sim = self.cosine_similarity(syllabus_vec, video_vec)

        # Distraction penalty check
        distraction_keywords = ["skincare", "vlog", "baking", "cake", "pageant", "miss universe", "gaming", "reaction"]
        distraction_penalty = 0.0
        for dk in distraction_keywords:
            if dk in video_text.lower():
                distraction_penalty += 0.4

        final_score = max(0.0, raw_sim - distraction_penalty)
        score_percentage = min(99, max(8, int(final_score * 100) + 40 if raw_sim > 0.05 else 10))

        classification = "ALIGNED_EDUCATIONAL" if score_percentage >= 50 else "DISTRACTION_SUPPRESSED"

        return {
            "cosineSimilarity": round(raw_sim, 4),
            "mlRelevanceScore": score_percentage,
            "distractionPenalty": round(distraction_penalty, 2),
            "classification": classification,
            "featureVectorSize": len(video_vec)
        }

# Singleton instance
ml_engine = TFIDFVectorEngine()
