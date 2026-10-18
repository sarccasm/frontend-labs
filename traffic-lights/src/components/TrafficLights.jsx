import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Light from "./Light";
import StatsBar from "./StatsBar";

const COLORS = ["red", "yellow", "green"];
const CYCLE = ["red", "yellow", "green", "yellow"];
const INTERVAL_MS = 2000;

const TrafficLights = ({ orientation = "vertical" }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clicks, setClicks] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });
  const [currentOrientation, setCurrentOrientation] = useState(orientation);
  const [isAutomatic, setIsAutomatic] = useState(false);

  const currentSignal = CYCLE[phaseIndex];
  const totalClicks = clicks.red + clicks.yellow + clicks.green;

  useEffect(() => {
    if (!isAutomatic) return;

    const timerId = setInterval(() => {
      setPhaseIndex((previous) => (previous + 1) % CYCLE.length);
    }, INTERVAL_MS);

    return () => clearInterval(timerId);
  }, [isAutomatic]);

  const handleSelect = (color) => {
    if (isAutomatic) return;

    setPhaseIndex(CYCLE.indexOf(color));

    setClicks((previous) => ({
      ...previous,
      [color]: previous[color] + 1,
    }));
  };

  const toggleOrientation = () => {
    setCurrentOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical"
    );
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection:
            currentOrientation === "horizontal" ? "row" : "column",
          backgroundColor: "#333",
          padding: 10,
          borderRadius: 10,
          width: "fit-content",
          margin: "0 auto 20px",
        }}
      >
        {COLORS.map((color) => (
          <Light
            key={color}
            tlColor={color}
            active={currentSignal === color}
            onSelect={handleSelect}
            disabled={isAutomatic}
          />
        ))}
      </div>

      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={currentOrientation}
        onToggleOrientation={toggleOrientation}
        isAutomatic={isAutomatic}
        onStart={() => setIsAutomatic(true)}
        onStop={() => setIsAutomatic(false)}
      />
    </section>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default TrafficLights;
