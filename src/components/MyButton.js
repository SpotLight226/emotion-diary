const MyButton = ({ text, type, onClick }) => {
  // type 에 positive, negative 각 아니라면 default 로 강제 지정
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      onClick={onClick}
      // 타입에 따라 동적으로 설정
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
