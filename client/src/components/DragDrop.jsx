import { createSwapy } from "swapy";
import { useEffect, useRef } from "react";
import TaskBox from "./TaskBox";

function DragDrop() {
  const swapy = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current);

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log("swap", event);
      });
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy();
    };
  }, []);
  const tanish = () => {
    console.log("Tanish");
    
  }

  return (
    <div ref={container}>
      <div data-swapy-slot="T1">
        <div data-swapy-item="T1">
          <TaskBox key={1} task={[]} handleInpTitle={tanish}/>
        </div>
      </div>
      <div data-swapy-slot="T2">
        <div data-swapy-item="T2">
          <TaskBox key={2} task={[]} handleInpTitle={tanish}/>
        </div>
      </div>
      <div data-swapy-slot="T3">
        <div data-swapy-item="T3">
          <TaskBox key={3} task={[]} handleInpTitle={tanish}/>
        </div>
      </div>
    </div>
  );
}

export default DragDrop;
