<div align="center">

# Concept Mirror 🪞
### Intelligent Metacognitive Analysis Tool

[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*“If you walk away slightly uncomfortable but clearer about what you don't understand yet, the mirror did its job.”*

</div>

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Pedagogical Philosophy](#-pedagogical-philosophy)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔭 Overview

**Concept Mirror** acts as a diagnostic interface for human cognition. Unlike traditional educational tools that focus on content delivery or rote validation, this application allows users to articulate their mental models of complex subjects and receive immediate, high-fidelity feedback on the *structure* of their understanding.

Leveraging **Google's Gemini 2.0 Flash**, the system performs a semantic analysis of user explanations, prioritizing the identification of:
- **Hidden Assumptions**: Unstated beliefs that may be incorrect.
- **Structural Gaps**: Missing logic bridges or essential preconditions.
- **Confidence Mismatches**: Areas where high confidence correlates with low accuracy.

This project serves as both a study aid for advanced learners and a demonstration of high-precision prompt engineering for educational AI.

---

## ✨ Key Features

### 🧠 **Deep Cognitive Analysis**
The core engine deconstructs user input against canonical definitions, rigorous preconditions, and known constraints. It moves beyond keyword matching to understand the *relationship* between ideas.

### 🎭 **Adaptive Operation Modes**
- **AI Mode (Production)**: Connects to the Gemini API for unrestricted analysis on any topic.
- **Demo Mode (Heuristic)**: A simulation mode equipped with pre-loaded heuristic profiles for common computer science concepts (e.g., *Binary Search*, *Recursion*, *REST API*), allowing users to test the interface without API credentials.

### 📊 **Structured Feedback Matrix**
Feedback is organized into four distinct quadrants for maximum clarity:
- **✅ Verification**: Confirmation of correctly understood principles.
- **🧩 Omissions**: Identification of missing edge cases or "why" vs "how" nuances.
- **⚠️ Corrections**: Direct remediation of misconceptions.
- **🤔 Assumption Surface**: Extraction of implicit premises underlying the user's logic.

### 🎨 **Premium User Experience**
- **Aesthetic**: Minimalist "Educational Dark Mode" designed to reduce eye strain during long study sessions.
- **Interface**: Glassmorphism visuals with fluid, stagger-motion animations.
- **Formatting**: Full Markdown support for rich text outputs (code blocks, bolding, lists).

---

## � Technical Architecture

The application is built on a modern, performance-oriented stack ensuring low latency and high maintainability.

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | React 19 | Leveraging the latest concurrent features for UI responsiveness. |
| **Build System** | Vite | Ultra-fast HMR and optimized production builds. |
| **Styling** | Vanilla CSS3 | Custom design system using CSS Variables and Flexbox/Grid. |
| **AI Engine** | Google Gemini 2.0 | 'Flash' model optimized for low-latency reasoning tasks. |
| **State** | React Hooks | `useState`, `useEffect`, `useCallback` for local state management. |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **Package Manager**: npm or yarn
- **API Key**: A valid [Google Gemini API Key](https://aistudio.google.com/app/apikey) (Optional for Demo Mode)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/tech-akash010/Concept-Mirror.git
    cd Concept-Mirror
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Launch Development Server**
    ```bash
    npm run dev
    ```

4.  **Access Application**
    Navigate to `http://localhost:5173` in your browser.

### � Configuration

For full functionality, configure your Personal API Key:
1.  Navigate to **Settings** (⚙️ icon).
2.  Input your Gemini API Key.
3.  The key is persisted securely in your browser's `localStorage` and is never transmitted to any third-party server besides Google's API endpoint.

---

## 📖 Usage Guide

1.  **Concept Definition**: Input the target concept (e.g., *"Entropy"*, *"Closures"*, *"CAP Theorem"*).
2.  **Articulation**: Explain the concept as if teaching a peer. Detailed explanations yield higher quality feedback.
3.  **Analysis**: Trigger the analysis engine.
4.  **Review**: Examine the generated report, paying close attention to the **Hidden Assumptions** section to uncover subconscious biases in your reasoning.

---

## 🧠 Pedagogical Philosophy

Building on the Feynman Technique and Socratic questioning:

> **"The most dangerous type of ignorance is the illusion of knowledge."**

Concept Mirror is opinionated software; it refuses to simply provide answers. Instead, it holds a mirror to the user's thought process. It assumes that the user is capable of bridging the gap once the gap is made visible. This **"Diagnosis Over Explanation"** approach fosters long-term retention and deeper cognitive mapping.

---

## 🤝 Contributing

We welcome contributions to improve the analysis heuristics or UI/UX.

1.  **Fork** the project.
2.  **Branch**: `git checkout -b feature/NewHeuristic`
3.  **Commit**: `git commit -m 'Add heuristic for Graph Theory'`
4.  **Push**: `git push origin feature/NewHeuristic`
5.  **Pull Request**: Open a PR for review.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Created by <a href="https://github.com/tech-akash010">Akash Kundu</a></p>
</div>
