// React
import React from 'react';

// Styles
import '../assets/css/components/history.css';

// Types
import type { HistoryItemProps } from '../types/components/history.tsx';

// Function
function getTimeString(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join('');
}

// Stats Component
const History = () => {
    return (
        <div className='history'>
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Work Session"
                time={3600}
                date="2023-10-01"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Break Session"
                time={3000}
                date="2023-10-02"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Work Session"
                time={5400}
                date="2023-10-03"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Break Session"
                time={1800}
                date="2023-10-04"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Work Session"
                time={7200}
                date="2023-10-05"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Break Session"
                time={2400}
                date="2023-10-06"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Work Session"
                time={3600}
                date="2023-10-07"
            />
            <HistoryItem
                imgSrc="https://placehold.co/50"
                altText="Break Session"
                time={3000}
                date="2023-10-08"
            />
        </div>
    );
};

const HistoryItem: React.FC<HistoryItemProps> = ({
    imgSrc,
    altText,
    time,
    date
}) => {
    return (
        <div className='history-item'>
            <div className='history-item-header'>
                <img src={imgSrc} alt={altText} />
                <p>{altText}</p>
            </div>
            <div className='history-item-time'>
                <p>{getTimeString(time)} - {new Date(date).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default History;