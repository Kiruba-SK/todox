import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
// recoil js
import userInfoAtom from "../../recoil/userInfoAtom";
import addTaskAtom from "../../recoil/addTaskAtom"
import { useRecoilState } from "recoil";
 
const Header = (props) => {
  // global variables
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [addTask, setAddTask] = useRecoilState(addTaskAtom);

  useEffect(() => {
    console.log(addTask);
  }, [addTask]);
  

  const navigate = useNavigate();
  return (
    <header>
      <div className="home-header-container">
        <h1 className="header-logo-text">TodoX</h1>

        <div className="btn-container">
          <button className="new-task-btn" onClick={() => {
            if(addTask){
              setAddTask(null);
            } else {
              setAddTask(true);
            }
          }}>
            <span>
              <AddIcon fontsize="large" />
            </span>{" "}
            New
          </button>
          <button
            className="new-task-btn-2"
            onClick={() => {
              localStorage?.clear();
              setUserInfo(false);
              navigate("/"); 
            }}
          >
            <LogoutRoundedIcon fontSize="large" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
