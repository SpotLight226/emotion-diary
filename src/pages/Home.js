import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  // 받아온 데이터
  const diaryList = useContext(DiaryStateContext);

  // 데이터를 날짜에따라 가공
  const [data, setData] = useState([]);

  // 기본 값을 현재 시간으로
  const [curDate, setCurDate] = useState(new Date());

  // getFullYear : 년, getMoth : 월 ( 0부터 시작 ), getDay : 일 ( 0부터 시작 )
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // curDate 가 변경될 때마다 리스트 변경
  useEffect(() => {
    // diaryList 가 비어있을 때는 수행 X
    if (diaryList.length >= 1) {
      // 현재 헤더에 선택한 날짜의 1일 의 ms를 날짜로
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 현재 헤더의 마지막 날짜 의 ms를 날짜로
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
    // diaryList 가 수정, 삭제, 추가 시 같이 변경되어야 한다
  }, [diaryList, curDate]);

  // 이동시 월 하나씩 증가 감소
  // 새로운 날짜를 받아서 각 월을 증가 감소하여 setDate 한다
  const increaseMonth = () => {
    setCurDate(
      // 년, 월 , 일
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      // 년, 월 , 일
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
