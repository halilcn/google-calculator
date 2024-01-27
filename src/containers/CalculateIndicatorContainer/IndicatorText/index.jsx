import withIndicatorTextLogic from "./withIndicatorTextLogic";

const IndicatorText = withIndicatorTextLogic((props) => {
  const { indicatorText } = props;

  return (
    <div className="text-white flex justify-end cursor-default">
      <div
        className="font-bold text-xl"
        dangerouslySetInnerHTML={{ __html: indicatorText }}
      />
    </div>
  );
});

export default IndicatorText;
