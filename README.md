# 🪞 Concept Mirror

> A mirror, not a lecturer.

**Concept Mirror** is an AI-powered web application designed to analyze and reflect your understanding of any concept. Instead of teaching you directly, it reveals the structure, gaps, and flaws in your mental model — helping you understand what you truly know and what needs more exploration.

## ✨ Features

- **Structured Reflection Analysis** — Get detailed feedback in 5 key areas:
  1. What You Clearly Understand
  2. What Is Missing or Incomplete
  3. What Is Incorrect or Misleading
  4. Hidden Assumptions Detected
  5. Mental Model Summary

- **AI-Powered Analysis** — Integrates with Google Gemini API for intelligent concept analysis
- **Demo Mode** — Works without API key using intelligent pattern matching
- **Example Concepts** — Quick-start chips for common concepts (Binary Search, Recursion, REST API, etc.)
- **Modern UI** — Beautiful dark theme with glassmorphism, gradient effects, and smooth animations
- **Responsive Design** — Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/concept-mirror.git
cd concept-mirror

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Optional: Configure Gemini API

For full AI-powered analysis, you'll need a Google Gemini API key:

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a new API key
3. Click the ⚙️ settings icon in the app header
4. Enter your API key and save

Without an API key, the app runs in **Demo Mode** with intelligent pattern-based analysis.

## 🛠️ Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **Vanilla CSS** — Custom styling with CSS variables
- **Google Gemini API** — AI-powered concept analysis

## 📁 Project Structure

```
concept-mirror/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with logo and settings
│   │   ├── Hero.jsx            # Hero section with tagline
│   │   ├── InputSection.jsx    # Concept input and explanation form
│   │   ├── ResultsSection.jsx  # Analysis results container
│   │   ├── ReflectionCard.jsx  # Individual reflection cards
│   │   ├── ApiKeyModal.jsx     # API key configuration modal
│   │   └── ApiKeyModal.css     # Modal styles
│   ├── services/
│   │   └── analyzer.js         # Analysis service with Gemini integration
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App-specific styles
│   ├── index.css               # Design system and base styles
│   └── main.jsx                # App entry point
├── public/
│   └── mirror-icon.svg         # Favicon
└── index.html                  # HTML template with SEO
```

## 🎨 Design Philosophy

Concept Mirror follows a **reflective** design philosophy:

- **Neutral Tone** — No praise padding, no harsh criticism
- **Precision** — Points out specific issues rather than general feedback
- **Diagnostics Over Teaching** — Reveals issues without giving full solutions
- **Uncomfortable Clarity** — Success means users leave clearer about what they don't know

## 📝 How It Works

1. **Enter a Concept** — Type any concept you want to analyze
2. **Explain It** — Write your understanding in your own words
3. **Analyze** — Click the button to get structured reflection
4. **Reflect** — Review gaps, misconceptions, and hidden assumptions
5. **Improve** — Use insights to deepen your understanding

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License — feel free to use this project for learning and building.

---

*"If you walk away slightly uncomfortable but clearer about what you don't understand yet, the mirror did its job."*
