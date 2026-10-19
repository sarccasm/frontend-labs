
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TrafficLightsContext } from "./TrafficLightsContext";

const CYCLE = ["red", "yellow", "green", "yellow"];
const INTERVAL_MS = 2000;

function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const [clicks, setClicks] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });

  const [orientation, setOrientation] = useState("vertical");
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

  const selectSignal = (color) => {
    if (isAutomatic || !["red", "yellow", "green"].includes(color)) {
      return;
    }

    setPhaseIndex(CYCLE.indexOf(color));

    setClicks((previous) => ({
      ...previous,
      [color]: previous[color] + 1,
    }));
  };

  const startAutomatic = () => {
    setIsAutomatic(true);
  };

  const stopAutomatic = () => {
    setIsAutomatic(false);
  };

  const toggleOrientation = () => {
    setOrientation((previous) =>
      previous === "vertical" ? "horizontal" : "vertical"
    );
  };

  const value = {
    phaseIndex,
    currentSignal,
    clicks,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

TrafficLightsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrafficLightsProvider;
