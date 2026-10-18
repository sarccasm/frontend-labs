
import { useState } from "react";
import PropTypes from "prop-types";
import Light from "./Light";
import StatsBar from "./StatsBar";

const COLORS = ["red", "yellow", "green"];

const TrafficLights = ({ orientation = "vertical" }) => {
  const [currentSignal, setCurrentSignal] = useState("red");

  const [clicks, setClicks] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });

  const [currentOrientation, setCurrentOrientation] = useState(orientation);

  const handleSelect = (color) => {
    setCurrentSignal(color);

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

  const totalClicks = clicks.red + clicks.yellow + clicks.green;

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
          />
        ))}
      </div>

      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={currentOrientation}
        onToggleOrientation={toggleOrientation}
      />
    </section>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default TrafficLights;
