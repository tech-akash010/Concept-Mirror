import { useState, useCallback, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';
import ApiKeyModal from './components/ApiKeyModal';
import { analyzeConceptExplanation, hasApiKey } from './services/analyzer';

function App() {
  const [conceptName, setConceptName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedConcept, setAnalyzedConcept] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(false);

  useEffect(() => {
    // Check if API key is already configured
    setApiConfigured(hasApiKey());
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!conceptName.trim() || !explanation.trim()) return;

    setIsAnalyzing(true);
    setAnalyzedConcept(conceptName.trim());

    try {
      const result = await analyzeConceptExplanation(conceptName.trim(), explanation.trim());
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [conceptName, explanation]);

  const handleNewAnalysis = useCallback(() => {
    setConceptName('');
    setExplanation('');
    setAnalysisResult(null);
    setAnalyzedConcept('');
  }, []);

  const handleOpenSettings = useCallback(() => {
    setShowApiModal(true);
  }, []);

  const handleApiKeySaved = useCallback(() => {
    setApiConfigured(true);
  }, []);

  const isInputValid = conceptName.trim().length > 0 && explanation.trim().length >= 20;

  return (
    <div className="app">
      <Header
        onOpenSettings={handleOpenSettings}
        apiConfigured={apiConfigured}
      />
      <main className="main">
        <div className="container">
          <Hero />

          {!analysisResult && !isAnalyzing && (
            <InputSection
              conceptName={conceptName}
              explanation={explanation}
              onConceptNameChange={setConceptName}
              onExplanationChange={setExplanation}
              onAnalyze={handleAnalyze}
              isValid={isInputValid}
            />
          )}

          {isAnalyzing && (
            <div className="input-section">
              <div className="input-card">
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">Analyzing your understanding...</p>
                  <p className="loading-subtext">Comparing against mental models and identifying gaps</p>
                </div>
              </div>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <ResultsSection
              result={analysisResult}
              conceptName={analyzedConcept}
              onNewAnalysis={handleNewAnalysis}
            />
          )}
        </div>
      </main>
      <Footer />

      {showApiModal && (
        <ApiKeyModal
          onClose={() => setShowApiModal(false)}
          onSave={handleApiKeySaved}
        />
      )}
    </div>
  );
}

export default App;
