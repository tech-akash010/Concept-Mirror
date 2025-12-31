# Concept Mirror 🪞

> **"If you walk away slightly uncomfortable but clearer about what you don't understand yet, the mirror did its job."**

**Concept Mirror** is an intelligent, AI-powered tool designed to analyze and reflect your understanding of complex concepts. Unlike traditional educational tools that simply grade you or provide correct answers, Concept Mirror acts as a diagnostic tool for your mental models.

It prioritizes **diagnosis over explanation**, helping you identify not just what you got wrong, but *why*—revealing hidden assumptions, confidence mismatches, and structural gaps in your knowledge.

---

## ✨ Features

- **🧠 Deep Concept Analysis**: Uses **Google's Gemini 2.0 Flash** model to deconstruct your explanations.
- **🔍 Structured Reflection**: Breaks down feedback into clear categories:
  - **What You Got Right**: Validates your current understanding.
  - **What You Missed**: Highlights critical missing components.
  - **What Needs Fixing**: Corrects misconceptions and misleading ideas.
  - **Hidden Assumptions**: Surfaces the implicit beliefs underlying your explanation.
- **📊 Mental Model Summary**: Provides a high-level summary of your thinking style (e.g., "Intuitive but shallow," "Procedural," "Comprehensive").
- **🎨 Premium UI/UX**:
  - Educational **Dark Mode** aesthetic.
  - Modern **Glassmorphism** design elements.
  - Smooth, staggered animations for a fluid experience.
  - Markdown support for rich, readable feedback.
- **🔒 Privacy-Focused**: Your API key is stored locally in your browser and used only for your requests.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Keyframe Animations)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)
- **Markdown Rendering**: `react-markdown`

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey) (Free)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tech-akash010/Concept-Mirror.git
    cd Concept-Mirror
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` (or the URL shown in your terminal).

5.  **Configure API Key**
    - Click the **Settings (⚙️)** icon in the top right corner.
    - Paste your Google Gemini API Key.
    - Click **Save Key**.

## 📖 How to Use

1.  **Enter a Concept**: Type the name of the concept you want to test your understanding of (e.g., "Recursion", "Entropy", "Closures").
2.  **Explain It**: In the text area, explain the concept as if you were teaching it to someone else. Be as detailed as possible.
3.  **Analyze**: Click the **"Analyze Understanding"** button.
4.  **Reflect**: Review the generated feedback. Pay special attention to the "Hidden Assumptions" and "What You Missed" sections.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
