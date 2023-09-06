import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
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
};

// Context 생성
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// 더미데이터
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1694012388227,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1694012388229,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1694012388233,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1694012388240,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1694012388242,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  // 상태관리 로직
  const dataId = useRef(0);
  //CREATE
  // 언제 작성된 일기까지 받음
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
    dataId.current += 1; // id 1증가
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, emotion, content) => {
    dispatch({
      type: "EDIT",
      date: new Date(date).getTime(),
      content,
      emotion,
    });
  };

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
          <BrowserRouter>
            <Routes>
              {/* 각 페이지를 Route 컴포넌트로 path에 따라 렌더링되게 작성한다 */}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              {/* diary상세 페이지에서 id가 없는 페이지는 없다 왜? 모든 상세페이지는 id를 가지고 있음 */}
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
