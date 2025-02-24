import { useState } from "react";
import "./App.css";

function App() {
  const [Task, setTask] = useState("");
  const [Tasks, setTasks] = useState([]);

  function addTask() {
    if (Task.trim() === "") return;
    setTasks([...Tasks, Task]);
    setTask("");
  }
  const removeTask = (index) => {
    setTasks(Tasks.filter((t, i) => i !== index));
  };
  return (
    <>
      <div className="flex min-h-screen justify-center bg-gray-100  ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
          <h1 className="text-2xl font-bold text-center mb-4">To-do list</h1>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 "
            type="text"
            placeholder="Type your task"
            value={Task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-all w-full cursor-pointer"
            onClick={addTask}
          >
            Add Task
          </button>

          <ul className="mt-4 ">
            {Tasks.map((t, index) => (
              <li
                key={index}
                className="bg-gray-200 p-2 rounded-lg mt-2 flex overflow-auto text-gray-800"
              >
                <div className="flex-1 ">{t}</div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white  py-1 px-2 rounded-lg ml-5 transition-all cursor-pointer "
                  onClick={() => removeTask(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
