
import PropTypes from "prop-types";

const Light = ({ tlColor = "red", active = false, onSelect }) => {
  return (
    <button
      type="button"
      aria-label={`Увімкнути ${tlColor} сигнал`}
      aria-pressed={active}
      onClick={() => onSelect(tlColor)}
      style={{
        backgroundColor: tlColor,
        width: 50,
        height: 50,
        borderRadius: "50%",
        margin: 5,
        border: active ? "3px solid white" : "3px solid transparent",
        opacity: active ? 1 : 0.3,
        boxShadow: active ? `0 0 15px ${tlColor}` : "none",
        cursor: "pointer",
      }}
    />
  );
};

Light.propTypes = {
  tlColor: PropTypes.oneOf(["red", "yellow", "green"]),
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default Light;
