import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const optionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

// value : select 의 선택,
// onChange : 선택시 바꿀 함수
// optionList : selct 의 옵션
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  // navigate
  const navigate = useNavigate();

  // 시간순 필터 기본 값을 최신으로
  const [sortType, setSortType] = useState("latest");
  // 감정 필터 기본 값 all
  const [filter, setFilter] = useState("all");

  // 시간 순, 감정 필터 거쳐서 나온 리스트
  const getProcessedDiaryList = () => {
    // 감정 필터 함수
    const filterCallBack = (item) => {
      // good 이라면 문자열이 들어올 수 잇으므로 parse 해서 3 이하 일 때
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 비교함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        // 뒤의 날짜에서 앞의 날짜를 빼서 양수 일 때 뒤로 음수일 때 앞으로
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 깊은 복사를 해서 복사
    // diaryList 를 JSON 해서 문자열로 바꾼 후, 다시 배열로 복호화한 뒤 넣음 => 값만 들어간다
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정 필터 거친 리스트
    // all 이면 모든 리스트
    // 아니라면
    const filteredList =
      // filterCallBack 에서 true 를 반환하는 녀석들만 filtering 한다
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 정렬 함수를 전달해서 정렬
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          {/* 시간순 필터 */}
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={optionList}
          />
          {/* 감정 필터 */}
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          {/* onClick 이므로 navigate 사용 */}
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {/* 정렬을 수행한 리스트를 map으로 뿌린다 */}
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
