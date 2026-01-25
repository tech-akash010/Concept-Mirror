import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

function ReflectionCard({
    number,
    title,
    icon,
    iconType,
    items,
    content,
    type,
    special
}) {
    const cardClass = special
        ? 'reflection-card mental-model-summary'
        : 'reflection-card';

    const hasContent = type === 'list'
        ? items && items.length > 0
        : content && content.trim().length > 0;

    return (
        <div className={cardClass}>
            <div className="reflection-card-header">
                <div className={`card-icon ${iconType}`}>
                    {icon}
                </div>
                <div className="card-title-group">
                    <p className="card-number">{number}</p>
                    <h3 className="card-title">{title}</h3>
                </div>
            </div>

            <div className="reflection-card-content">
                {!hasContent ? (
                    <p className="empty-state">No items identified in this category</p>
                ) : type === 'list' ? (
                    <ul className="reflection-list">
                        {items.map((item, index) => (
                            <li key={index} className="reflection-item">
                                <ReactMarkdown>{item}</ReactMarkdown>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={`reflection-paragraph ${special ? 'mental-model-content' : ''}`}>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}

ReflectionCard.propTypes = {
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    iconType: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'neutral']).isRequired,
    items: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
    type: PropTypes.oneOf(['list', 'paragraph']).isRequired,
    special: PropTypes.bool
};

ReflectionCard.defaultProps = {
    items: [],
    content: '',
    special: false
};

export default ReflectionCard;
