import CalculateContainer from "./containers/CalculateContainer";
import CalculateIndicatorContainer from "./containers/CalculateIndicatorContainer";

function App() {
  return (
    <div className="flex justify-center items-center h-full bg-zinc-800">
      <div className="w-80 flex flex-col border p-6 rounded-md border-zinc-700 shadow-lg shadow-zinc-700">
        <CalculateIndicatorContainer />
        <CalculateContainer />
      </div>
    </div>
  );
}

export default App;
