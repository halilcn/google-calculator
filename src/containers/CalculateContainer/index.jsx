import withCalculationContainerLogic from "./withCalculationContainerLogic";

const CalculateContainer = withCalculationContainerLogic((props) => {
  const { allCalculationItems, renderCalculationItem } = props;

  return (
    <div className="flex flex-col">
      {allCalculationItems.map((rowItems, rowIndex) => (
        <div className="flex mt-4" key={rowIndex}>
          {rowItems.map(renderCalculationItem(rowIndex))}
        </div>
      ))}
    </div>
  );
});

export default CalculateContainer;
