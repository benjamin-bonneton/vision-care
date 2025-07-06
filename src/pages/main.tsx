// React
import { useState, useEffect, useRef } from 'react';

// Styles
import '../assets/css/pages/main.css'

// Components
import Stats from '../components/stats';
import Action from '../components/action';
import Timer from '../components/timer';
import History from '../components/history';

// Icon
import workIcon from '../assets/icons/work.svg';
import breakIcon from '../assets/icons/break.svg';
import settingsIcon from '../assets/icons/settings.svg';
import resetIcon from '../assets/icons/reset.svg';
import startIcon from '../assets/icons/start.svg';
import pauseIcon from '../assets/icons/pause.svg';


const Main = () => {
    const [defaultTime, setDefaultTime] = useState(10); // Default time in seconds (20 minutes : 1200 seconds)

    // Timer
    const [time, setTime] = useState(defaultTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [breakTime, setBreakTime] = useState(20); // 20 seconds break
    const timerRef = useRef<number | null>(null);
    const notifiedStartRef = useRef(false);
    const notifiedEndRef = useRef(false);

    // Request notification permission on component mount
    useEffect(() => {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        if (isRunning) {
            if (!isBreakTime) {
                notifiedStartRef.current = false; // reset break notification
                // Main timer countdown
                timerRef.current = setInterval(() => {
                    setTime(prevTime => {
                        if (prevTime <= 1) {
                            if (!notifiedStartRef.current && Notification.permission === 'granted') {
                                new Notification('VisionCare', {
                                    body: 'Time to take a break! Look away from your screen.',
                                    icon: '/favicon.ico'
                                });
                                notifiedStartRef.current = true;
                            }
                            setIsBreakTime(true);
                            setBreakTime(20);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            } else {
                notifiedEndRef.current = false; // reset work notification
                // Break timer countdown
                timerRef.current = setInterval(() => {
                    setBreakTime(prevTime => {
                        if (prevTime <= 1) {
                            if (!notifiedEndRef.current && Notification.permission === 'granted') {
                                new Notification('VisionCare', {
                                    body: 'Break time is over! You can resume your work.',
                                    icon: '/favicon.ico'
                                });
                                notifiedEndRef.current = true;
                            }
                            setIsBreakTime(false);
                            setIsRunning(false);
                            setTime(defaultTime);
                            return 20;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, isBreakTime, defaultTime]);

    const resetTimer = () => {
        setIsRunning(false);
        setIsBreakTime(false);
        setTime(defaultTime);
        setBreakTime(20);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    // Render
    return (
        <div id="main">
            <header>
                <div className='stats-container'>
                    <Stats
                        imgSrc={workIcon}
                        altText="Time Spent on Work"
                        time={3600}
                    />
                    <Stats
                        imgSrc={breakIcon}
                        altText="Time Spent on Breaks"
                        time={3950}
                    />
                </div>
                <div className='actions-container'>
                    <Action
                        imgSrc={settingsIcon}
                        altText="Open Settings"
                        onClick={() => console.log("Settings clicked")}
                    />
                </div>
            </header>
            <main>
                <Timer time={isBreakTime ? breakTime : time} />
                {isBreakTime && (
                    <div style={{ textAlign: 'center', marginTop: '10px', color: '#4CAF50' }}>
                        Break Time - Look away from your screen!
                    </div>
                )}
                <div className='timer-controls'>
                    <Action
                        imgSrc={resetIcon}
                        altText="Reset Timer"
                        onClick={resetTimer}
                    />
                    <Action
                        imgSrc={isRunning ? pauseIcon : startIcon}
                        altText={isRunning ? "Pause Timer" : "Start Timer"}
                        onClick={toggleTimer}
                        disabled={isBreakTime}
                    />
                </div>
            </main>
            <footer>
                <History />
            </footer>
        </div>
    )
}

export default Main;