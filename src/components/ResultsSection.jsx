import PropTypes from 'prop-types';
import ReflectionCard from './ReflectionCard';
import { MirrorIcon, RefreshIcon, CheckIcon, CircleIcon, XIcon, DiamondIcon, BrainIcon } from './Icons';

function ResultsSection({ result, conceptName, onNewAnalysis }) {
    const sections = [
        {
            number: '01',
            title: 'What You Got Right',
            icon: <CheckIcon size={20} />,
            iconType: 'success',
            items: result.understood,
            type: 'list'
        },
        {
            number: '02',
            title: 'What You Missed',
            icon: <CircleIcon size={20} />,
            iconType: 'warning',
            items: result.missing,
            type: 'list'
        },
        {
            number: '03',
            title: 'What Needs Fixing',
            icon: <XIcon size={20} />,
            iconType: 'error',
            items: result.incorrect,
            type: 'list'
        },
        {
            number: '04',
            title: 'Hidden Assumptions',
            icon: <DiamondIcon size={20} />,
            iconType: 'info',
            items: result.assumptions,
            type: 'list'
        },
        {
            number: '05',
            title: 'Your Thinking Style',
            icon: <BrainIcon size={20} />,
            iconType: 'neutral',
            content: result.summary,
            type: 'paragraph',
            special: true
        }
    ];

    return (
        <section className="results-section">
            <div className="results-header">
                <div className="results-title">
                    <div className="results-icon">
                        <MirrorIcon size={32} />
                    </div>
                    <div>
                        <p className="concept-label">Concept Reflection</p>
                        <h2 className="concept-name">{conceptName}</h2>
                    </div>
                </div>

                <div className="results-actions">
                    <button className="btn btn-secondary" onClick={onNewAnalysis}>
                        <RefreshIcon size={18} />
                        <span>New Analysis</span>
                    </button>
                </div>
            </div>

            <div className="results-grid">
                {sections.map((section, index) => (
                    <ReflectionCard
                        key={index}
                        number={section.number}
                        title={section.title}
                        icon={section.icon}
                        iconType={section.iconType}
                        items={section.items}
                        content={section.content}
                        type={section.type}
                        special={section.special}
                    />
                ))}
            </div>

            <div className="new-analysis-section">
                <p className="new-analysis-text">
                    If you walk away slightly uncomfortable but clearer about what you don't understand yet, the mirror did its job.
                </p>
                <button className="btn btn-ghost" onClick={onNewAnalysis}>
                    Analyze Another Concept
                </button>
            </div>
        </section>
    );
}

ResultsSection.propTypes = {
    result: PropTypes.shape({
        understood: PropTypes.arrayOf(PropTypes.string),
        missing: PropTypes.arrayOf(PropTypes.string),
        incorrect: PropTypes.arrayOf(PropTypes.string),
        assumptions: PropTypes.arrayOf(PropTypes.string),
        summary: PropTypes.string
    }).isRequired,
    conceptName: PropTypes.string.isRequired,
    onNewAnalysis: PropTypes.func.isRequired
};

export default ResultsSection;
