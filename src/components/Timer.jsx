import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(100);
  const [totalTime, setTotalTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [min, setMins] = useState(0);
  const [hours, setHours] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const resetTimer = () => {
    setHours(0);
    setMins(0);
    setSeconds(0);
    setProgress(100);
    setTotalTime(0);
    setIsRunning(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    const [newHours, newMinutes, newSeconds] = e.target.innerText
      .split(":")
      .map(Number);

    if (!isNaN(newHours)) setHours(newHours);
    if (!isNaN(newMinutes)) setMins(newMinutes);
    if (!isNaN(newSeconds)) setSeconds(newSeconds);

    const newTotalTime = newHours * 3600 + newMinutes * 60 + newSeconds;
    setTotalTime(newTotalTime);
    setProgress(100); // Reset progress on blur
  };

  useEffect(() => {
    const calculatedTotalTime = hours * 3600 + min * 60 + seconds;
    setTotalTime(calculatedTotalTime);
    setProgress(100); // Reset progress when total time changes
  }, [hours, min, seconds]);

  useEffect(() => {
    let interval;
    if (isRunning && totalTime > 0) {
      interval = setInterval(() => {
        setTotalTime((prevTotal) => {
          const newTotal = prevTotal - 1;

          // Calculate remaining time in seconds
          const remainingTimeInSeconds = newTotal;

          // Calculate progress based on remaining time
          const remainingProgress =
            (remainingTimeInSeconds / (hours * 3600 + min * 60 + seconds)) *
            100;
          // Set progress to fill counter-clockwise
          setProgress(100 - remainingProgress); // Invert for counter-clockwise

          if (newTotal <= 0) {
            clearInterval(interval); // Stop the interval when time runs out
            return 0;
          }
          return newTotal;
        });

        // Update timer display
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (min > 0) {
          setMins((prevMin) => prevMin - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMins(59);
          setSeconds(59);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, totalTime, seconds, min, hours]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#30336b",
          padding: "60px",
          borderRadius: "10px",
          position: "relative",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            pathColor: "#3498db",
            trailColor: "#4b5563",
            textColor: "#ffffff",
            strokeWidth: 10,
            transform: "rotate(-90deg)", // Rotate to start from top
            transformOrigin: "center center", // Keep rotation centered
          })}
        />
        <div
          contentEditable={isEditing}
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          suppressContentEditableWarning={true}
          style={{
            fontFamily: "sans-serif",
            position: "absolute",
            top: "47%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "40px",
            textAlign: "center",
            outline: isEditing ? "1px dashed white" : "none",
          }}
        >
          {`${String(hours).padStart(2, "0")}:${String(min).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              style={{
                marginRight: "20px",
                padding: "10px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Stop
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(true)}
              style={{
                marginRight: "20px",
                padding: "10px",
                backgroundColor: "#2ecc71",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Start
            </button>
          )}
          <button
            onClick={resetTimer}
            style={{
              padding: "10px",
              backgroundColor: "#3498db",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
