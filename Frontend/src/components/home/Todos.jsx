import React from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// recoil
import { useRecoilState } from "recoil";
import searchTextAtom from "../../recoil/searchTextAtom";
import todoDataAtom from "../../recoil/todoDataAtom";
import activeFilterAtom from "../../recoil/activeFilterAtom";
import editTaskAtom from "../../recoil/editTaskAtom";
import filterDataAtom from "../../recoil/filterDataAtom";


const Todos = () => {
  // global variable
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [activeFilter, setActiveFilter] = useRecoilState(activeFilterAtom);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  // local variable
  const [inputData, setInputData] = useRecoilState(searchTextAtom);

  return (
    <div className="todo-main-container">
      <div>
        {todoApiData
          ?.filter((filtered_data) => {
            if (inputData === "") {
              return filtered_data;
            } else if (
              filtered_data?.title
                ?.toLowerCase()
                ?.includes(inputData?.toLowerCase())
            ) {
              return filtered_data;
            }
          })
          ?.map((data, index) => {
            return (
              <div key={index} className="todo-card">
                <div>
                  <div
                    onClick={() => {
                      const bodyData = {
                        id: data?.id,
                      };

                      fetch("http://127.0.0.1:8000/complete_task", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodyData),
                      })
                        .then((response) => response.json())
                        .then((res) => {
                          console.log(res);
                          setTodoApiData(res?.todo_data);
                          setFilterData(res?.stats);
                        })
                        .catch((error) => {
                          console.log("Error", error);
                        });
                    }}
                    className={` ${
                      data?.status === "completed"
                        ? "checkbox-active"
                        : "checkbox"
                    } `}
                  ></div>
                </div>
                <div className="todo-content-container">
                  <div className="todo-card-header">
                    <h2
                      className={` ${
                        data?.status === "completed"
                          ? "completed-todo-title"
                          : ""
                      } todo-title`}
                    >
                      {data?.title}
                    </h2>
                    {activeFilter === "All" && (
                      <div className="icon-container">
                        <ArchiveOutlinedIcon
                          className="archieve"
                          onClick={() => {
                            const bodyData = {
                              id: data?.id,
                            };
                            fetch("http://127.0.0.1:8000/archieved_task", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(bodyData),
                            })
                              .then((response) => response.json())
                              .then((res) => {
                                console.log(res);
                                // setAddTask(false);
                                setTodoApiData(res?.todo_data);
                                setFilterData(res?.stats);
                              })
                              .catch((error) => {
                                console.log("Error", error);
                              });
                          }}
                        />
                        <BorderColorOutlinedIcon
                          className="edit"
                          onClick={() => {
                            setSelectedEditTask({
                              id: data?.id,
                              title: data?.title,
                              desc: data?.desc,
                            });
                          }}
                        />
                        <DeleteOutlineOutlinedIcon
                          className="delete"
                          onClick={() => {
                            const bodyData = {
                              id: data?.id,
                            };
                            fetch("http://127.0.0.1:8000/delete_task", {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(bodyData),
                            })
                              .then((response) => response.json())
                              .then((res) => {
                                console.log(res);
                                // setAddTask(false);
                                setTodoApiData(res?.todo_data);
                                setFilterData(res?.stats);
                              })
                              .catch((error) => {
                                console.log("Error", error);
                              });
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <p className="todo-desc">{data?.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;