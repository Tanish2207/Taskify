import { useState } from "react";

function TaskBox() {
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => {
    setChecked(!checked);
  };
  return (
    <div>
      <div
        className={`rounded-md p-3 flex items-center justify-between gap-4 `}
        style={{
          backgroundColor: checked
            ? "rgb(187 247 208 / var(--tw-bg-opacity, 1))"
            : "#F1F1F1",
        }}
      >
        <div className="flex gap-4">
          <div
            className={`w-5 h-5 border-2 border-slate-400 rounded-sm cursor-pointer ${
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
          <p>Complete this task</p>
        </div>

        <div data-swapy-handle>
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
        </div>
      </div>
    </div>
  );
}

export default TaskBox;
