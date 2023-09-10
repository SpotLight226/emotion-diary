import MyHeader from "./../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  return (
    <div className="New">
      <DiaryEditor />
    </div>
  );
};

export default New;
