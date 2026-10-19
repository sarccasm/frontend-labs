
import TrafficLights from "../components/TrafficLights";
import StatsBar from "../components/StatsBar";
import { useTrafficLights } from "../context/TrafficLightsContext";

function TrafficLightPage() {
  const {
    currentSignal,
    clicks,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  } = useTrafficLights();

  return (
    <section>
      <h1>Керування світлофором</h1>

      <TrafficLights
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onSelect={selectSignal}
      />

      <StatsBar
        clicks={clicks}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onToggleOrientation={toggleOrientation}
        onStart={startAutomatic}
        onStop={stopAutomatic}
      />
    </section>
  );
}

export default TrafficLightPage;
