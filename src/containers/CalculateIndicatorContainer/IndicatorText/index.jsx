import withIndicatorTextLogic from "./withIndicatorTextLogic";

const IndicatorText = withIndicatorTextLogic((props) => {
  const { calculationItemsText } = props;

  return (
    <div className="text-white flex justify-end cursor-default">
      <div className="font-bold text-xl">{calculationItemsText}</div>
    </div>
  );
});

export default IndicatorText;
