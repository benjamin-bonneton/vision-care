// React
import { useState, useEffect } from "react";

// Styles
import "../assets/css/pages/main.css";

// Components
import Stats from "../components/stats";
import Action from "../components/action";
import Timer from "../components/timer";
import History from "../components/history";
import SettingsModal from "../components/settings-modal";

// Services
import sendNotification from "../services/notification";
import createHistoryItem from "../services/history";

// Icon
import workIcon from "../assets/icons/work.svg";
import breakIcon from "../assets/icons/break.svg";
import resetIcon from "../assets/icons/reset.svg";
import startIcon from "../assets/icons/start.svg";
import pauseIcon from "../assets/icons/pause.svg";
import autoPlayIcon from "../assets/icons/autoplay.svg";
import stopIcon from "../assets/icons/stop.svg";
import settingsIcon from "../assets/icons/settings.svg";
import deleteIcon from "../assets/icons/delete.svg";

const DEFAULT_WORK_TIME = 1200;
const DEFAULT_BREAK_TIME = 30;

const Main = () => {
  // Timer
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Total Time
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
  const [totalBreakTime, setTotalBreakTime] = useState<number>(0);

  // Option
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  // Settings Modal
  const [showSettings, setShowSettings] = useState(false);

  // Default Timer Values (from localStorage or fallback)
  const [defaultWorkTime, setDefaultWorkTime] = useState(() => {
    return parseInt(
      localStorage.getItem("defaultWorkTime") || `${DEFAULT_WORK_TIME}`,
      10
    );
  });
  const [defaultBreakTime, setDefaultBreakTime] = useState(() => {
    return parseInt(
      localStorage.getItem("defaultBreakTime") || `${DEFAULT_BREAK_TIME}`,
      10
    );
  });

  // Get time in local storage
  useEffect(() => {
    setTotalWorkTime(
      parseInt(localStorage.getItem("totalWorkTime") || "0", 10)
    );
    setTotalBreakTime(
      parseInt(localStorage.getItem("totalBreakTime") || "0", 10)
    );
  }, []);

  // Update timer values if defaults change
  useEffect(() => {
    setWorkTime(defaultWorkTime);
    setBreakTime(defaultBreakTime);
  }, [defaultWorkTime, defaultBreakTime]);

  // Handle timer updates
  const updateWorkTime = () => {
    // Remove one second from work time
    setWorkTime((prev) => prev - 1);

    // Add one second to total work time
    setTotalWorkTime((prev) => {
      const newTotal = prev + 1;
      localStorage.setItem("totalWorkTime", newTotal.toString());
      return newTotal;
    });
  };

  const updateBreakTime = () => {
    // Remove one second from break time
    setBreakTime((prev) => prev - 1);

    // Add one second to total break time
    setTotalBreakTime((prev) => {
      const newTotal = prev + 1;
      localStorage.setItem("totalBreakTime", newTotal.toString());
      return newTotal;
    });
  };

  // Request notification permission
  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        if (workTime > 0) {
          // Decrement work time
          updateWorkTime();
        } else if (workTime === 0) {
          // Work time is over
          setWorkTime(-1);
          createHistoryItem({
            altText: "Work Session",
            time: defaultWorkTime,
          });
          sendNotification({
            title: "VisionCare",
            message: "Time to take a break! Look away from your screen.",
          });
        } else if (breakTime > 0) {
          // Decrement break time
          updateBreakTime();
        } else if (breakTime === 0) {
          // Break time is over
          setBreakTime(-1);
          createHistoryItem({
            altText: "Break Session",
            time: defaultBreakTime,
          });
          sendNotification({
            title: "VisionCare",
            message: "Break time is over! You can resume your work.",
          });
        } else if (workTime < 0 && breakTime < 0) {
          // Reset both timers
          setWorkTime(defaultWorkTime);
          setBreakTime(defaultBreakTime);

          if (!autoPlay) {
            setIsRunning(false);
          }
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, workTime, breakTime, defaultWorkTime, defaultBreakTime]);

  const handleSaveSettings = (work: number, brk: number) => {
    setDefaultWorkTime(work);
    setDefaultBreakTime(brk);
    localStorage.setItem("defaultWorkTime", work.toString());
    localStorage.setItem("defaultBreakTime", brk.toString());
    setWorkTime(work);
    setBreakTime(brk);
    setShowSettings(false);
  };

  const handleCloseSettings = () => setShowSettings(false);

  const resetTimer = () => {
    setIsRunning(false);
    setWorkTime(defaultWorkTime);
    setBreakTime(defaultBreakTime);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const removeData = () => {
    localStorage.removeItem("totalWorkTime");
    localStorage.removeItem("totalBreakTime");
    localStorage.removeItem("history");
    localStorage.removeItem("defaultWorkTime");
    localStorage.removeItem("defaultBreakTime");
    setDefaultWorkTime(DEFAULT_WORK_TIME);
    setDefaultBreakTime(DEFAULT_BREAK_TIME);
    setTotalWorkTime(0);
    setTotalBreakTime(0);
    resetTimer();
    sendNotification({
      title: "VisionCare",
      message: "All data has been removed.",
    });
  };

  // Render
  return (
    <div id="main">
      {showSettings && (
        <SettingsModal
          workTime={defaultWorkTime}
          breakTime={defaultBreakTime}
          onSave={handleSaveSettings}
          onClose={handleCloseSettings}
        />
      )}
      <header>
        <div className="stats-container">
          <Stats
            imgSrc={workIcon}
            altText="Time Spent on Work"
            time={totalWorkTime}
          />
          <Stats
            imgSrc={breakIcon}
            altText="Time Spent on Breaks"
            time={totalBreakTime}
          />
        </div>
        <div className="actions-container">
          <Action
            imgSrc={settingsIcon}
            altText="Settings"
            onClick={() => setShowSettings(true)}
          />
          <Action
            imgSrc={deleteIcon}
            altText="Remove Data"
            onClick={removeData}
          />
        </div>
      </header>
      <main>
        <Timer time={workTime < 0 ? breakTime : workTime} />

        <div className="timer-controls">
          <Action
            imgSrc={resetIcon}
            altText="Reset Timer"
            onClick={resetTimer}
          />
          <Action
            imgSrc={isRunning ? pauseIcon : startIcon}
            altText={isRunning ? "Pause Timer" : "Start Timer"}
            onClick={toggleTimer}
          />
          <Action
            imgSrc={autoPlay ? autoPlayIcon : stopIcon}
            altText={autoPlay ? "Disable Auto Play" : "Enable Auto Play"}
            onClick={() => setAutoPlay(!autoPlay)}
          />
        </div>

        {workTime < 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#4CAF50",
            }}
          >
            Break Time - Look away from your screen!
          </div>
        )}
      </main>
      <footer>
        <History />
      </footer>
    </div>
  );
};

export default Main;
