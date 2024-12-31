import { useState, useRef } from "react";

const TaskBox = ({ task, handleNewTaskCreation, handleTaskDeletion, handleTaskCompletion, handleEditedTitle }) => {
  const [checked, setChecked] = useState(task.completed);
  const [swipeStart, setSwipeStart] = useState(null);
  const [swipeEnd, setSwipeEnd] = useState(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [showTick, setShowTick] = useState(false);
  const swipeRef = useRef(null);
  const maxSwipeDistance = 100; // Maximum swipe distance
  const inputRef = useRef(null);
  const [inpTitle, setInpTitle] = useState(task.title);
  const [tickAnimate, setTickAnimate] = useState(false);
  const [tickFromEdit, setTickFromEdit] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const toggleCheckbox = () => {
    setChecked(!checked);
    handleTaskCompletion(task.objectId, task.title, !checked)
  };

  const titleChange = () => {
    setTickAnimate(true);
    handleEditedTitle(task.objectId, inpTitle, checked)
    setTimeout(() => setShowTick(false), 1000);
    handleRemoveFocus();
  };
  // --------------------------- For swiping actions ------------------------
  const handleTouchStart = (e) => {
    setSwipeStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    setSwipeEnd(currentX);
    if (swipeStart !== null) {
      let distance = currentX - swipeStart;
      if (distance > maxSwipeDistance) distance = maxSwipeDistance;
      if (distance < -maxSwipeDistance) distance = -maxSwipeDistance;
      setSwipeDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    if (swipeStart !== null && swipeEnd !== null) {
      const finalSwipeDistance = swipeEnd - swipeStart;
      if (finalSwipeDistance > 50) {
        console.log("Swiped right: Edit");
        setIsDisabled(false);
        handleInputButtonClick();
        setTickFromEdit(true);
      } else if (finalSwipeDistance < -100) {
        console.log("Swiped left: Delete");
        setIsExiting(true);
        setTimeout(() => {
          handleTaskDeletion(task.objectId, task.id);
        }, 1000);
      }
    }
    setSwipeStart(null);
    setSwipeEnd(null);
    setSwipeDistance(0);
  };

  const handleInputButtonClick = () => {
    setTimeout(() => {
      inputRef.current?.focus(); // Focus the input field to open the keyboard
    }, 0);
  };
  const handleRemoveFocus = () => {
    setTimeout(() => {
      inputRef.current?.blur(); // Remove focus from the input field
    }, 0);
  };

  if (!task.title) {
    handleInputButtonClick();
  }

  const typingStart = (e) => {
    setInpTitle(e.target.value);
    setShowTick(true);
  };

  const sendTitle = () => {
    setTickAnimate(true);
    handleNewTaskCreation(inpTitle);
    setTimeout(() => setShowTick(false), 1000);
    handleRemoveFocus();
  };

  return (
    <div
      className={`relative  ${isExiting ? "exit-taskbox" : ""}`}
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
    >
      <div className="absolute rounded-md top-0 bg-green-300 w-1/2 p-3 -z-10 border-2 border-slate-400 ">
        <img src="edit.svg" alt="" />
      </div>
      <div
        className={`z-10 relative rounded-md p-3 flex items-center justify-between gap-4 border-2 border-slate-400 `}
        style={{
          backgroundColor: checked
            ? "rgb(187 247 208 / var(--tw-bg-opacity, 1))"
            : "#F1F1F1",
          transform: `translateX(${swipeDistance}px)`,
          transition: swipeDistance === 0 ? "transform 0.3s ease" : "none",
        }}
        ref={swipeRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between w-full items-center ">
          <div className="flex gap-3 w-full items-center">
            <div
              className={`w-5 h-5 border-2 border-slate-400 flex justify-center items-center rounded-sm cursor-pointer ${
                checked ? "bg-green-600" : "bg-white"
              }`}
              onClick={toggleCheckbox}
            >
              {checked && (
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            {/* <p>{props.task.title}</p> */}
            <input
              disabled={false}
              ref={inputRef}
              type="text"
              className="bg-transparent w-4/5 mr-2 px-0.5 focus:outline-2 focus:outline-green-900 focus:outline-none"
              value={`${inpTitle}`}
              // style={{maxWidth: "200px"}}
              onChange={typingStart}
            ></input>
          </div>

          <div data-swapy-handle>
            {!checked && !showTick && (
              <svg
                width="12"
                height="19"
                viewBox="0 0 12 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="#B7B7B7" />
                <circle cx="2.5" cy="9.5" r="2.5" fill="#B7B7B7" />
                <circle cx="2.5" cy="16.5" r="2.5" fill="#B7B7B7" />
                <circle cx="9.5" cy="2.5" r="2.5" fill="#B7B7B7" />
                <circle cx="9.5" cy="9.5" r="2.5" fill="#B7B7B7" />
                <circle cx="9.5" cy="16.5" r="2.5" fill="#B7B7B7" />
              </svg>
            )}
            {showTick && (
              <svg
                className={`tick-svg ${tickAnimate ? "tick-anim-class" : ""}`}
                onClick={tickFromEdit ? titleChange : sendTitle}
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
                stroke="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5018 4.00085L7.50026 12.0026L4.4996 9.00194"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.50243 12.0052L1.49957 9.00232"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5026 4.00085L7.25107 8.87761"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="absolute rounded-md top-0 right-0 flex justify-end bg-red-300 w-1/2 p-3 -z-10 border-2 border-slate-400 ">
        <img src="delete.svg" alt="" />
      </div>
    </div>
  );
};

export default TaskBox;
