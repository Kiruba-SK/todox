import React, { useEffect, useState } from "react";
import { filterEndpoints } from "../../helper/filter";
import { useRecoilState } from "recoil";
import todoDataAtom from "../../recoil/todoDataAtom";
import activeFilterAtom from "../../recoil/activeFilterAtom";
import filterDataAtom from "../../recoil/filterDataAtom";

const Filters = () => {
  // global variable
  // eslint-disable-next-line no-unused-vars
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [activeFilter, setActiveFilter] = useRecoilState(activeFilterAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  const [csrfToken, setCsrfToken] = useState("");

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

  // useEffect(() => {
  //   console.log("filterData");
  //   console.log(filterData);
  // }, [filterData]);

  // Debugging log
  // console.log("Current filterData:", filterData);

  return (
    <div>
      <div className="filter-container">
        {Array.isArray(filterData) && filterData.length > 0 ? (
          filterData.map((data, index) => (
            <div
              key={index}
              className="filter-btn-container"
              onClick={() => setActiveFilter(data?.label)}
            >
              <button
                onClick={() => {
                  fetch(
                    "http://127.0.0.1:8000/" + filterEndpoints[index]?.endpoint,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                      },
                      credentials: "include",
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      setTodoApiData(data?.todo_data);
                      setFilterData(data?.stats);
                    })
                    .catch((error) => {
                      alert(error);
                    });
                }}
                className={` ${
                  activeFilter === data?.label ? "active-filter" : ""
                } `}
              >
                <h3>{data?.label}</h3>
                <p
                  className={` ${
                    activeFilter === data?.label ? "active-filter-value" : ""
                  } `}
                >
                  {data?.value}
                </p>
              </button>
            </div>
          ))
        ) : (
          <p>Loading filters...</p>
        )}
      </div>
    </div>
  );
};

export default Filters;
