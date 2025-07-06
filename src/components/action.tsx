// React
import React from 'react';

// Styles
import '../assets/css/components/action.css';

// Types
import { type ActionProps } from '../types/components/action.tsx';

// Action component
const Action: React.FC<ActionProps> = ({ imgSrc, altText, onClick, disabled }) => {
    return (
        <div className="action" title={altText} onClick={onClick} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
            <img src={imgSrc} alt={altText} />
        </div>
    );
};

export default Action;