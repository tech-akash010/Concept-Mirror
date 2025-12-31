import PropTypes from 'prop-types';

function Header({ onOpenSettings, apiConfigured }) {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">
                            🪞
                        </div>
                        <span className="logo-text">Concept Mirror</span>
                    </div>
                    <div className="header-right">
                        <div className="header-badge">
                            <span className={`header-badge-dot ${apiConfigured ? 'active' : ''}`}></span>
                            <span>{apiConfigured ? 'AI Connected' : 'Demo Mode'}</span>
                        </div>
                        <button
                            className="btn btn-ghost settings-btn"
                            onClick={onOpenSettings}
                            title="Configure API Key"
                        >
                            ⚙️
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    onOpenSettings: PropTypes.func.isRequired,
    apiConfigured: PropTypes.bool
};

Header.defaultProps = {
    apiConfigured: false
};

export default Header;
