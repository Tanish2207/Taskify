import { useState } from "react";
import DateCarousel from "./DateCarousel";
import TaskBox from "./TaskBox";

function Home() {
  const [tasks, setTasks] = useState([]);
  let countCompletedTasks = 1
  const addTask = () => {
    setTasks([...tasks, <TaskBox key={tasks.length} />]);
  };

  const calcWidth = () => {
    return tasks.length ? `${(countCompletedTasks * 100) / tasks.length}%` : '0%';
  }
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
            style={{ backgroundColor: "#47E4CA", width: calcWidth() }}
          ></div>
          <div className="relative z-1 font-bold">{countCompletedTasks}/{tasks.length}</div>
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
      <div className="flex flex-col px-6 gap-3 mt-4">{tasks}</div>

      {/* Add new task button */}
      <div
        className={`flex ${
          !tasks.length
            ? "justify-center bg-slate-400 text-white"
            : "justify-end"
        }`}
      >
        <div className={`flex items-center gap-2 mx-6 my-2 p-2 tounded-lg ${tasks.length && 'hover:bg-slate-200'} `}>
          <svg
            width="23"
            viewBox="0 0 14 14"
            fill={!tasks.length ? 'white' : 'black'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.00008 2.33332C4.42275 2.33332 2.33341 4.42266 2.33341 6.99999C2.33341 9.57732 4.42275 11.6667 7.00008 11.6667C9.57741 11.6667 11.6667 9.57732 11.6667 6.99999C11.6667 4.42266 9.57741 2.33332 7.00008 2.33332ZM1.16675 6.99999C1.16675 3.77833 3.77842 1.16666 7.00008 1.16666C10.2217 1.16666 12.8334 3.77833 12.8334 6.99999C12.8334 10.2217 10.2217 12.8333 7.00008 12.8333C3.77842 12.8333 1.16675 10.2217 1.16675 6.99999Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.99992 4.08334C7.32208 4.08334 7.58325 4.34451 7.58325 4.66668V6.41668H9.33325C9.65542 6.41668 9.91659 6.67784 9.91659 7.00001C9.91659 7.32218 9.65542 7.58334 9.33325 7.58334H7.58325V9.33334C7.58325 9.65551 7.32208 9.91668 6.99992 9.91668C6.67775 9.91668 6.41659 9.65551 6.41659 9.33334V7.58334H4.66659C4.34442 7.58334 4.08325 7.32218 4.08325 7.00001C4.08325 6.67784 4.34442 6.41668 4.66659 6.41668H6.41659V4.66668C6.41659 4.34451 6.67775 4.08334 6.99992 4.08334Z"
            />
          </svg>

          <p onClick={addTask}>Add task</p>
        </div>
      </div>
    </div>
  );
}
export default Home;
