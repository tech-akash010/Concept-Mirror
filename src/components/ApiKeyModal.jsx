import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { hasApiKey, setApiKey } from '../services/analyzer';
import './ApiKeyModal.css';

function ApiKeyModal({ onClose, onSave }) {
    const [key, setKey] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleSave = () => {
        if (key.trim()) {
            setApiKey(key.trim());
            onSave?.();
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    const handleSkip = () => {
        handleClose();
    };

    return (
        <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-icon">🔑</div>
                    <h2 className="modal-title">Configure API Key</h2>
                    <p className="modal-subtitle">
                        Add your Gemini API key for AI-powered analysis
                    </p>
                </div>

                <div className="modal-body">
                    <div className="input-group">
                        <label className="input-label" htmlFor="api-key">
                            Gemini API Key
                        </label>
                        <input
                            id="api-key"
                            type="password"
                            className="input"
                            placeholder="Enter your API key..."
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        />
                    </div>

                    <div className="api-info">
                        <p>Get your free API key from:</p>
                        <a
                            href="https://aistudio.google.com/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="api-link"
                        >
                            Google AI Studio →
                        </a>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={handleSkip}>
                        Skip (Demo Mode)
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={!key.trim()}
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

ApiKeyModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func
};

export default ApiKeyModal;

export { hasApiKey };
