import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// 모든 데이터 수정, 추가, 삭제는 reducer를 통해 실행된다
const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state]; // 새로운 아이템을 추가
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId); // id가 타켓의 id가 아닌 것만 newState로
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        // 전체 데이터를 변경가능
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default: {
      return state;
    }
  }

  // localStorage 에 저장
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

// Context 생성
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  // localData
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        // 내림차순 기준으로 정렬
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      // localStorage의 개수에 따라 dataId 를 변경
      dataId.current = parseInt(diaryList[0].id) + 1;
      // dispatch 를 호출
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  // 상태관리 로직
  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++; // id 1증가
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* 각 페이지를 Rout  e 컴포넌트로 path에 따라 렌더링되게 작성한다 */}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              {/* pathVariable 할당 */}
              <Route path="/edit/:id" element={<Edit />} />
              {/* diary상세 페이지에서 id가 없는 페이지는 없다 왜? 모든 상세페이지는 id를 가지고 있음 */}
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
