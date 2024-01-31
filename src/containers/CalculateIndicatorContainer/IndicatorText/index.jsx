import withIndicatorTextLogic from "./withIndicatorTextLogic";

const IndicatorText = withIndicatorTextLogic((props) => {
  const { calculationItemsText } = props;

  return (
    <div className="text-white flex justify-end cursor-default overflow-hidden whitespace-nowrap">
      <div
        className="font-bold text-xl"
        dangerouslySetInnerHTML={{ __html: calculationItemsText }}
      />
    </div>
  );
});

export default IndicatorText;
