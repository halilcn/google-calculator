import CalculateContainer from "./containers/CalculateContainer";
import CalculateIndicatorContainer from "./containers/CalculateIndicatorContainer";
import useOutsideClick from "./hooks/useOutsideClick";
import useCalculation from "./stores/calculation";

function App() {
  const { setIsFocusedOnIndicator } = useCalculation();
  const ref = useOutsideClick(() => {
    setIsFocusedOnIndicator(false);
  });

  const handleClickCalculate = () => {
    setIsFocusedOnIndicator(true);
  };

  return (
    <div className="flex justify-center items-center h-full bg-zinc-800">
      <div
        ref={ref}
        onClick={handleClickCalculate}
        className="w-80 flex flex-col border p-6 rounded-md border-zinc-700 shadow-lg shadow-zinc-700"
      >
        <CalculateIndicatorContainer />
        <CalculateContainer />
      </div>
    </div>
  );
}

export default App;
