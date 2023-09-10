import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

// 날짜를 가져오는 유틸
import { getStringDate } from "../util/Date";
import { emotionList } from "../util/Emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  // 사용자 정의 훅 : Custom Hooks
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        // 일기가 있을 때
        setData(targetDiary);
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  // data가 false 일 때 true == 데이터가 없을 때
  if (!data) {
    return <div className="DiaryPage">로딩 중입니다</div>;
  } else {
    // 데이터가 존재할 때

    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        {/* 시간 객체 Date 를 전달 */}
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          // 각 버튼에 text 와 이동하는 주소를 전달
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        {/* article 내부가 컨텐츠 */}
        <article>
          <section>
            <h4>오늘의 감정</h4>
            {/* 클래스 이름 동적 지정 */}
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
