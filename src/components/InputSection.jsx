import PropTypes from 'prop-types';

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
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.metaKey && isValid) {
            onAnalyze();
        }
    };

    const handleExampleClick = (name) => {
        onConceptNameChange(name);
    };

    return (
        <section className="input-section">
            <div className="input-card">
                <div className="input-grid">
                    <div className="input-group">
                        <label className="input-label" htmlFor="concept-name">
                            <span>📚</span>
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
                            <span>💭</span>
                            <span>Your Explanation</span>
                        </label>
                        <div className="explanation-wrapper">
                            <textarea
                                id="explanation"
                                className="input textarea explanation-textarea"
                                placeholder="Explain this concept in your own words. Be as detailed or brief as you naturally would — don't worry about being 'correct'. The analysis works best when you explain it how you actually understand it..."
                                value={explanation}
                                onChange={(e) => onExplanationChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <span className="char-count">
                                {explanation.length} characters
                            </span>
                        </div>
                    </div>
                </div>

                <div className="action-bar">
                    <div className="action-hints">
                        <span className="hint">
                            <span className="hint-icon">💡</span>
                            <span>Explain naturally, as if teaching someone</span>
                        </span>
                        <span className="hint">
                            <span className="hint-icon">⌘</span>
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
