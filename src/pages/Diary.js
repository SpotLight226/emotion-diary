import { useParams } from "react-router-dom";

const Diary = () => {
  // 사용자 정의 훅 : Custom Hooks
  const { id } = useParams();
  return (
    <div>
      <h1>Diary</h1>
      <p>일기 상세페이지</p>
    </div>
  );
};

export default Diary;
