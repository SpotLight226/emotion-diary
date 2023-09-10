import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick, // CallBack 처리 해주어야함
  isSelected,
}) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
      // handleClickEmote 가 emotion_id 를 받아 호출된다
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
