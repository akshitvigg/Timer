import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import ldlogo from "./logo/ld.png";

function App() {
  const [seconds, setseconds] = useState(10);
  const [min, setMins] = useState(0);
  const [hours, sethours] = useState(0);
  const [isRunning, setisRunning] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {

    if (isDark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDark]);

  const changebgcolor = () => {
    setIsDark(!isDark);
  };
    // improved the prev code
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", margin: 50 }}>
        <img onClick={changebgcolor} width={20} src={ldlogo} alt="" />
      </div>
      <Timer
        seconds={seconds}
        setseconds={setseconds}
        setisRunning={setisRunning}
        min={min}
        setMins={setMins}
        hours={hours}
        sethours={sethours}
        isRunning={isRunning}
      />
      <br />
    </>
  );
}

export default App;
