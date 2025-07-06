// React
import React from 'react';

// Styles
import '../assets/css/components/stats.css';

// Types
import type { StatsProps } from '../types/components/stats';

// Function
function getTimeString(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
}

// Stats Component
const Stats: React.FC<StatsProps> = ({
    imgSrc,
    altText,
    time
}) => {
    return (
        <div className='stats' title={altText}>
            <img src={imgSrc} alt={altText} />
            <p>{getTimeString(time)}</p>
        </div>
    );
};

export default Stats;