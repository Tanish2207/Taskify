import { useState } from "react";
import DateCarousel from "./DateCarousel";
import TaskBox from "./TaskBox";

function Home() {
  const primaryColor = "#47E4CA";
  const [completedFilter, setCompletedFilter] = useState(false);
  return (
    <div>
      {/* <p className="text-green-600">Hello</p> */}
      <nav className="flex justify-between items-center mx-8 mt-4 mb-3">
        <h2 className="font-semibold text-xl">Taskify</h2>
        <img src="user_profile.png" alt="" />
      </nav>
      <div className="px-6">
        <div
          className="w-full px-4 h-10 py-2 align-middle rounded-lg flex gap-10"
          style={{ backgroundColor: "#F1F1F1" }}
        >
          <img src="search.svg" className="" alt="" />
          <p>Search task</p>
        </div>
      </div>

      <DateCarousel />

      {/* progress bar */}
      <div className="px-6 relative">
        <div
          className="relative w-full h-8 flex justify-center items-center"
          style={{ backgroundColor: "#EEEEEE" }}
        >
          <div
            className="absolute left-0 h-full rounded-sm"
            style={{ backgroundColor: "#47E4CA", width: "30%" }}
          ></div>
          <div className="relative z-1 font-bold">3/8</div>
        </div>
      </div>

      {/* filter */}

      <div className="w-full flex justify-end px-6 py-5 gap-8 right-0">
        <div
          className="rounded-md px-3 py-1"
          style={{
            backgroundColor: !completedFilter ? primaryColor : "transparent",
          }}
        >
          <button onClick={() => setCompletedFilter(false)}>All</button>
        </div>
        <div
          className="rounded-md px-3 py-1"
          style={{
            backgroundColor: completedFilter ? primaryColor : "transparent",
          }}
        >
          <button onClick={() => setCompletedFilter(true)}>Completed</button>
        </div>
      </div>

      {/* task boxes */}
      <div className="flex flex-col px-6 gap-3 mt-4">
        <TaskBox />
        <TaskBox />
        <TaskBox />
      </div>

      {/* Add new task button */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2 mx-6 my-2 p-2 tounded-lg hover:bg-slate-200 ">
          <img src="plus_icon.svg" alt="" width="23rem" />
          <p>Add task</p>
        </div>
      </div>
    </div>
  );
}
export default Home;
