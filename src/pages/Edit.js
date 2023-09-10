import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  // 리스트를 받아옴
  const diaryList = useContext(DiaryStateContext);

  // 마운트될 때 데이터 가져옴
  useEffect(() => {
    // 일기 데이터가 1개 라도 있어야 작동
    if (diaryList.length >= 1) {
      // 숫자가 아닌 문자열일 수 도 있으므로 parse
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      // undefined 일 때 false 로 판단된다
      if (targetDiary) {
        // 오리진 데이터로 set
        setOriginData(targetDiary);
      } else {
        // 없는 일기라면 홈으로 보내버림
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* originData 가 있을 때, isEdit 과 originData 를 보낸다 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
