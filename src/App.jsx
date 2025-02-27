import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedItems = localStorage.getItem("tasks");
    return storedItems ? JSON.parse(storedItems) : [];
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };
  const toggleTaskCompleted = (index) => {
    console.log("Toggling task:", index); // Debugging line
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };
  const removeTask = (index) => {
    setTasks(tasks.filter((t, i) => i !== index));
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
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-all w-full cursor-pointer"
            onClick={addTask}
          >
            Add Task
          </button>

          <ul className="mt-4 ">
            {tasks.map((t, index) => (
              <li
                key={index}
                className={`bg-gray-200 p-3 rounded-lg mt-2 justify-between items-center transition-all duration-300 flex overflow-auto ${
                  t.completed ? "line-through text-gray-500 " : "text-gray-800"
                } hover:bg-gray-300`}
              >
                <span
                  className={`flex-1 ${
                    t.completed ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {t.text}
                </span>
                <div flex items-center>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTaskCompleted(index)}
                    className="cursor-pointer accent-green-500 w-5 h-5 mr-3"
                  />

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white  py-1 px-2 rounded-lg ml-5 transition-all cursor-pointer "
                    onClick={() => removeTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
