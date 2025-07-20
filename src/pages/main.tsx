// React
import { useState, useEffect } from "react";

// Styles
import "../assets/css/pages/main.css";

// Components
import Stats from "../components/stats";
import Action from "../components/action";
import Timer from "../components/timer";
import History from "../components/history";

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
import deleteIcon from "../assets/icons/delete.svg";

const Main = () => {
  // Default Timer Values
  const defaultWorkTime = 1200;
  const defaultBreakTime = 30;

  // Timer
  const [workTime, setWorkTime] = useState(defaultWorkTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [isRunning, setIsRunning] = useState(false);

  // Total Time
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
  const [totalBreakTime, setTotalBreakTime] = useState<number>(0);

  // Option
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  // Get time in local storage
  useEffect(() => {
    setTotalWorkTime(
      parseInt(localStorage.getItem("totalWorkTime") || "0", 10)
    );
    setTotalBreakTime(
      parseInt(localStorage.getItem("totalBreakTime") || "0", 10)
    );
  }, []);

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
            time: totalWorkTime,
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
            time: totalBreakTime,
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
            disabled={workTime < 0}
          />
          <Action
            imgSrc={autoPlay ? autoPlayIcon : stopIcon}
            altText={autoPlay ? "Disable Auto Play" : "Enable Auto Play"}
            onClick={() => setAutoPlay(!autoPlay)}
          />
        </div>

        {workTime < 0 && (
          <div
            style={{ textAlign: "center", marginTop: "20px", color: "#4CAF50" }}
          >
            Break Time - Look away from your screen!
          </div>
        )}
      </main>
      <footer>
        <History />
      </footer>
      <a
        href="https://benjamin-bonneton.com"
        target="_blank"
        className="copyright"
      >
        © Vision Care - Benjamin Bonneton
      </a>
    </div>
  );
};

export default Main;
