import PropTypes from "prop-types";

const StatsBar = ({
  clicks,
  totalClicks,
  currentSignal,
  orientation,
  onToggleOrientation,
  isAutomatic,
  onStart,
  onStop,
}) => {
  return (
    <div style={{ textAlign: "left", lineHeight: 1.8 }}>
      <h2>Статистика світлофора</h2>

      <p>Червоний: {clicks.red}</p>
      <p>Жовтий: {clicks.yellow}</p>
      <p>Зелений: {clicks.green}</p>

      <p>Усього натискань: {totalClicks}</p>
      <p>Активний сигнал: {currentSignal}</p>
      <p>
        Орієнтація:{" "}
        {orientation === "vertical" ? "вертикальна" : "горизонтальна"}
      </p>
      <p>
        Режим: {isAutomatic ? "автоматичний" : "ручний"}
      </p>

      <button type="button" onClick={onToggleOrientation}>
        Змінити орієнтацію
      </button>

      <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
        <button type="button" onClick={onStart} disabled={isAutomatic}>
          Запустити
        </button>

        <button type="button" onClick={onStop} disabled={!isAutomatic}>
          Зупинити
        </button>
      </div>
    </div>
  );
};

StatsBar.propTypes = {
  clicks: PropTypes.shape({
    red: PropTypes.number.isRequired,
    yellow: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
  }).isRequired,
  totalClicks: PropTypes.number.isRequired,
  currentSignal: PropTypes.oneOf(["red", "yellow", "green"]).isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  onToggleOrientation: PropTypes.func.isRequired,
  isAutomatic: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default StatsBar;
