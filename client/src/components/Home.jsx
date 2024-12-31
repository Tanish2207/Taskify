import { useEffect, useState } from "react";
import { get_tasks, editTask, createTask, deleteTask } from "../api/all_api";
import DateCarousel from "./DateCarousel";
import TaskBox from "./TaskBox";
import moment from "moment";
import SearchBar from "./SearchBar";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [completedFilter, setCompletedFilter] = useState(false);
  const [searchResults, setSearchResults] = useState(tasks);

  // ------------------------------- Callbacks (Child -> parent) -----------------------------
  const handleNewTaskCreation = (tl) => {
    console.log("tl = ", tl);
    createTask(tl);
  };

  const handleTaskDeletion = (tid, tix) => {
    const taskIndex = tasks.findIndex((task) => task.objectId === tid);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      setTasks([...tasks]); // Trigger re-render by updating state
    }
    deleteTask(tid);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("This is Date: ", date);
    console.log("This is selectedDate: ", selectedDate);
  };

  const handleTaskCompletion = (tid, tl, st) => {
    const updatedTasks = tasks.map((task) => {
      if (task.objectId === tid) {
        return { ...task, completed: st };
      }
      return task;
    });
    editTask(tid, tl, st)
    setTasks(updatedTasks);
    setSearchResults(updatedTasks);
  };

  const handleEditedTitle = (tid, tl, st) => {
    const updatedTasks = tasks.map((task) => {
      if (task.objectId === tid) {
        return { ...task, title: tl };
      }
      return task;
    });
    setTasks(updatedTasks);
    setSearchResults(updatedTasks);
    editTask(tid, tl, st);
  };
  // ------------------------------------ GET API --------------------------------
  useEffect(() => {
    // moment().format("YYYY-MM-DD")
    get_tasks(selectedDate).then((res) => {
      if (res.error) {
        setError(res.error);
        setTasks([]);
      } else {
        let fetchedTasks = res.map((task, index) => ({
          id: index,
          title: task.taskContent,
          completed: task.status == 1,
          objectId: task._id,
        }));
        setTasks(fetchedTasks);
        setSearchResults(fetchedTasks);
        setError(null);
      }
    });
  }, [selectedDate]);

  let countCompletedTasks = tasks.filter((t) => t.completed).length;
  const addTask = () => {
    const newTask = {
      id: tasks.length,
      title: "",
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setSearchResults([...tasks, newTask])
    setError(null);
  };

  const calcWidth = () => {
    return tasks.length
      ? `${(countCompletedTasks * 100) / tasks.length}%`
      : "0%";
  };
  const primaryColor = "#47E4CA";

  return (
    <div>
      <nav className="flex justify-between items-center mx-8 mt-4 mb-3">
        <h2 className="font-semibold text-xl">Taskify</h2>
        <img src="user_profile.png" alt="" />
      </nav>

      {/* search bar */}
      <div className="px-6">
        <SearchBar tasks={tasks} setSearchResults={setSearchResults} />
      </div>

      <DateCarousel onDateChange={handleDateChange} />

      {/* progress bar */}
      <div className="px-6 relative">
        <div
          className="relative w-full h-8 flex justify-center items-center border border-slate-300"
          style={{
            backgroundColor: "#EEEEEE",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          }}
        >
          <div
            className="absolute left-0 h-full rounded-sm transition-all ease-in-out duration-1000"
            style={{
              background: "linear-gradient(90deg, #4AF2E4 0%, #3EEC86 100%)",
              width: calcWidth(),
            }}
          ></div>
          <div className="relative z-1 font-bold">
            {tasks.length ? `${countCompletedTasks} / ${tasks.length}` : `:-)`}
          </div>
        </div>
      </div>

      {/* filter */}

      <div className="w-full flex justify-end px-6 py-5 gap-8 right-0">
        <div
          className="rounded-md px-3 py-1 fadeAnim"
          style={{
            backgroundColor: !completedFilter ? primaryColor : "transparent",
          }}
        >
          <button onClick={() => setCompletedFilter(false)}>All</button>
        </div>
        <div
          className="rounded-md px-3 py-1 fadeAnim"
          style={{
            backgroundColor: completedFilter ? primaryColor : "transparent",
          }}
        >
          <button onClick={() => setCompletedFilter(true)}>Completed</button>
        </div>
      </div>

      {/* task boxes */}
      <div className="flex flex-col px-6 gap-3 mt-4">
        <div className="text-red-500 text-center ">{error}</div>
        {searchResults
          .sort((task) => task.completed - 1)
          .filter((task) => !completedFilter || task.completed)
          .map((task) => (
            <TaskBox
              key={task.id}
              task={task}
              handleNewTaskCreation={handleNewTaskCreation}
              handleTaskDeletion={handleTaskDeletion}
              handleTaskCompletion={handleTaskCompletion}
              handleEditedTitle={handleEditedTitle}
            />
          ))}
      </div>

      {/* Add new task button */}
      <div
        className={`flex ${
          !tasks.length
            ? "justify-center bg-slate-400 text-white"
            : "justify-end"
        }`}
      >
        <div
          onClick={addTask}
          className={`flex items-center gap-2 mx-6 my-2 p-2 rounded-lg cursor-pointer ${
            tasks.length && "hover:bg-slate-200"
          } `}
        >
          <svg
            width="23"
            viewBox="0 0 14 14"
            fill={!tasks.length ? "white" : "black"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.00008 2.33332C4.42275 2.33332 2.33341 4.42266 2.33341 6.99999C2.33341 9.57732 4.42275 11.6667 7.00008 11.6667C9.57741 11.6667 11.6667 9.57732 11.6667 6.99999C11.6667 4.42266 9.57741 2.33332 7.00008 2.33332ZM1.16675 6.99999C1.16675 3.77833 3.77842 1.16666 7.00008 1.16666C10.2217 1.16666 12.8334 3.77833 12.8334 6.99999C12.8334 10.2217 10.2217 12.8333 7.00008 12.8333C3.77842 12.8333 1.16675 10.2217 1.16675 6.99999Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.99992 4.08334C7.32208 4.08334 7.58325 4.34451 7.58325 4.66668V6.41668H9.33325C9.65542 6.41668 9.91659 6.67784 9.91659 7.00001C9.91659 7.32218 9.65542 7.58334 9.33325 7.58334H7.58325V9.33334C7.58325 9.65551 7.32208 9.91668 6.99992 9.91668C6.67775 9.91668 6.41659 9.65551 6.41659 9.33334V7.58334H4.66659C4.34442 7.58334 4.08325 7.32218 4.08325 7.00001C4.08325 6.67784 4.34442 6.41668 4.66659 6.41668H6.41659V4.66668C6.41659 4.34451 6.67775 4.08334 6.99992 4.08334Z"
            />
          </svg>

          <p>Add task</p>
        </div>
      </div>
    </div>
  );
}
export default Home;
