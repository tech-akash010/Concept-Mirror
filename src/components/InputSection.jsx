import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { BookIcon, ThoughtIcon, LightBulbIcon, KeyboardIcon, MicrophoneIcon } from './Icons';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const EXAMPLE_CONCEPTS = [
    { name: 'Binary Search', description: 'Algorithm for finding items' },
    { name: 'Recursion', description: 'Functions calling themselves' },
    { name: 'REST API', description: 'Web service architecture' },
    { name: 'Machine Learning', description: 'AI pattern recognition' },
    { name: 'Big O Notation', description: 'Algorithm efficiency' },
];

function InputSection({
    conceptName,
    explanation,
    onConceptNameChange,
    onExplanationChange,
    onAnalyze,
    isValid
}) {
    const { isListening, transcript, isSupported, error, startListening, stopListening, resetTranscript, clearError } = useSpeechRecognition();

    // Update explanation when transcript changes
    useEffect(() => {
        if (transcript) {
            onExplanationChange(transcript);
        }
    }, [transcript, onExplanationChange]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.metaKey && isValid) {
            onAnalyze();
        }
    };

    const handleExampleClick = (name) => {
        onConceptNameChange(name);
    };

    const toggleVoiceInput = () => {
        if (isListening) {
            stopListening();
        } else {
            resetTranscript();
            clearError();
            startListening();
        }
    };

    return (
        <section className="input-section">
            <div className="input-card">
                <div className="input-grid">
                    <div className="input-group">
                        <label className="input-label" htmlFor="concept-name">
                            <BookIcon size={18} />
                            <span>Concept Name</span>
                        </label>
                        <div className="concept-input-wrapper">
                            <input
                                id="concept-name"
                                type="text"
                                className="input concept-input"
                                placeholder="e.g., Binary Search, Recursion, REST API..."
                                value={conceptName}
                                onChange={(e) => onConceptNameChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="example-chips">
                            {EXAMPLE_CONCEPTS.map((example) => (
                                <button
                                    key={example.name}
                                    className="example-chip"
                                    onClick={() => handleExampleClick(example.name)}
                                    title={example.description}
                                >
                                    {example.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="explanation">
                            <ThoughtIcon size={18} />
                            <span>Your Explanation</span>
                            {isSupported && (
                                <span className="voice-input-badge">
                                    Voice input available
                                </span>
                            )}
                        </label>
                        <div className="explanation-wrapper">
                            <textarea
                                id="explanation"
                                className={`input textarea explanation-textarea ${isListening ? 'listening' : ''}`}
                                placeholder="Explain this concept in your own words. Be as detailed or brief as you naturally would — don't worry about being 'correct'. The analysis works best when you explain it how you actually understand it..."
                                value={explanation}
                                onChange={(e) => onExplanationChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isListening}
                            />
                            <div className="textarea-controls">
                                <span className="char-count">
                                    {explanation.length} characters
                                </span>
                                {isSupported && (
                                    <button
                                        type="button"
                                        className={`voice-input-btn ${isListening ? 'listening' : ''}`}
                                        onClick={toggleVoiceInput}
                                        title={isListening ? 'Stop recording' : 'Start voice input'}
                                    >
                                        <MicrophoneIcon size={20} />
                                        {isListening && <span className="listening-indicator"></span>}
                                    </button>
                                )}
                            </div>
                            {isListening && (
                                <div className="voice-feedback">
                                    <div className="voice-pulse"></div>
                                    <span>Listening... Speak now</span>
                                </div>
                            )}
                            {error && (
                                <div className="voice-error">
                                    <span className="error-icon">⚠️</span>
                                    <span>{error}</span>
                                    <button
                                        className="error-dismiss"
                                        onClick={clearError}
                                        title="Dismiss error"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="action-bar">
                    <div className="action-hints">
                        <span className="hint">
                            <LightBulbIcon size={16} className="hint-icon" />
                            <span>Explain naturally, as if teaching someone</span>
                        </span>
                        <span className="hint">
                            <KeyboardIcon size={16} className="hint-icon" />
                            <span>Press ⌘ + Enter to analyze</span>
                        </span>
                    </div>

                    <button
                        className="btn btn-primary analyze-btn"
                        onClick={onAnalyze}
                        disabled={!isValid}
                    >
                        <span>Analyze Understanding</span>
                        <span className="btn-icon">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

InputSection.propTypes = {
    conceptName: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    onConceptNameChange: PropTypes.func.isRequired,
    onExplanationChange: PropTypes.func.isRequired,
    onAnalyze: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired
};

export default InputSection;
