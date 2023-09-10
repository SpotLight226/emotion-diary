import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { DiaryDispatchContext } from "./../App";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

// 각 유틸
import { getStringDate } from "../util/Date";
import { emotionList } from "../util/Emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  // 일기 콘텐츠
  const contentRef = useRef(); // 작성하지 않고 완료 눌렀을 때 focus 를 위한 ref 객체
  const [content, setContent] = useState("");
  // 감정 선택
  const [emotion, setEmotion] = useState(3);
  // 날짜 선택에서 초기값을 설정
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const navigate = useNavigate();

  // 감정 선택 변화를 핸들링할 함수 : setEmotion 을 호출한다
  // EmotionItem 를 최적화 하기 위해 useCallback
  // 가장 최신의 state 를 참조할 필요가 없으므로 [] 설정
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  // submit 버튼 이벤트
  const handleSubmit = () => {
    // content의 길이가 1 이하라면 텍스트 에리어에 포커스
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // 수정, 새 일기인지 판단
    if (window.confirm(isEdit ? "일기를 수정~~!?" : "새로운 일기 작성~~?!?")) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    // 일기 작성 후, 홈으로 돌아간다 => 일기 작성창으로 다시 못 돌아오게 true 전달
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하려구?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  // 수정페이지에서 가져온 데이터를 뿌린다
  // isEdit ,originDat가 변경되면 실행
  useEffect(() => {
    // isEdit이 true == 수정페이지
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          // 수정하기로 들어왔을 때만 보이게
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          {/* 감정을 선택할 수 있는 컴포넌트 */}
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                // 감정이 선택 되었는지를 판단
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          {/* 일기 콘텐츠 작성*/}
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
