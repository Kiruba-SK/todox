import React, { useEffect, useState } from "react";
import addTaskAtom from "../recoil/addTaskAtom";
import todoDataAtom from "../recoil/todoDataAtom";
import AddTask from "../components/home/AddTask";
import Header from "../components/home/Header";
import Searchbar from "../components/home/Searchbar";
import Filters from "../components/home/Filters";
import Todos from "../components/home/Todos";
import { useRecoilState } from "recoil";
import "./Home.css";
import apiDataAtom from "../recoil/apiDataAtom";
import editTaskAtom from "../recoil/editTaskAtom";
import EditTask from "../components/home/EditTask";
import filterDataAtom from "../recoil/filterDataAtom";
import closeTaskAtom from "../recoil/closeTaskAtom";

const Home = () => {
  const [addTask, setAddTask] = useRecoilState(addTaskAtom);
  const [apiData, setApiData] = useRecoilState(apiDataAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  const [closeTask, setCloseTask] = useRecoilState(closeTaskAtom);
  const [csrfToken, setCsrfToken] = useState("");

  const homeData = {
    stats: [
      { label: "All", value: 4 },
      { label: "Completed", value: 6 },
      { label: "In Progress", value: 2 },
      { label: "Archieved", value: 10 },
    ],

    todo_data: [
      {
        id: 1,
        title: "Title 1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, atque. Quo dolor eaque quam non rerum in ipsam repudiandae accusantium.",
        status: "all",
      },
      {
        id: 2,
        title: "Title 2",
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quam.",
        status: "completed",
      },
      {
        id: 3,
        title: "Title 3",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium molestiae, error ut assumenda deserunt similique saepe!",
        status: "in progress",
      },
      {
        id: 4,
        title: "Title 4",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum perferendis rem rerum!",
        status: "archieved",
      },
    ],
  };

  // Fetch CSRF Token from Django when component loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/csrf/", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent
    })
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken)) // Save token to state
      .catch((error) => console.error("CSRF Token Fetch Error:", error));
  }, []);

  // initial call to get apiData

  useEffect(() => {
    fetch("http://127.0.0.1:8000/intial_call", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
        setTodoApiData(data?.todo_data);
        setFilterData(data?.stats);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="relative">
      {addTask && (
        <div>
          <div
            className="add-overlay "
            onClick={() => {
              setAddTask(false);
              setCloseTask(false);
            }}
          ></div>
          <AddTask />
        </div>
      )}
      {selectedEditTask && (
        <div>
          <div
            className="add-overlay"
            onClick={() => {
              setSelectedEditTask(false);
              setCloseTask(false);
            }}
          ></div>
          <EditTask />
        </div>
      )}

      <div className="home-container">
        <Header />
        <Searchbar />
        <Filters />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
