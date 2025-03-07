import React from "react";
import { filterEndpoints } from "../../helper/filter";
import { useRecoilState } from "recoil";
import todoDataAtom from "../../recoil/todoDataAtom";
import activeFilterAtom from "../../recoil/activeFilterAtom";
import filterDataAtom from "../../recoil/filterDataAtom";

const Filters = () => {
  // global variable
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [activeFilter, setActiveFilter] = useRecoilState(activeFilterAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  
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
                      },
                      
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log( data); 
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