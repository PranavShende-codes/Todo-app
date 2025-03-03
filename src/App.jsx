import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedItems = localStorage.getItem("tasks");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

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
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText (text);
  };

  const saveEdit = (index) => {
    if (editText.trim() === "") return;

    setTasks(tasks.map((t, i) => (i === index ? { ...t, text: editText } : t)));
    setEditIndex(null);
    setEditText("");
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
                className={"bg-gray-200 p-3 rounded-lg mt-2 justify-between bg-white shadow-md border items-center transition-all duration-300 flex overflow-auto hover:bg-gray-300 "}
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-1"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                  />
                ) : (
                  <span className={`flex-1 px-2 ${
                  t.completed ? "line-through text-gray-500 " : "text-gray-800"
                }`}>{t.text}</span>
                )}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTaskCompleted(index)}
                    className="cursor-pointer accent-green-400 w-5 h-5"
                  />
                  {editIndex === index ? (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md transition-all"
                      onClick={() => saveEdit(index)}
                    >
                      ✅
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md transition-all"
                      onClick={() => startEdit(index, t.text)}
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white  py-1 px-2 rounded-md ml-5 transition-all cursor-pointer"
                    onClick={() => removeTask(index)}
                  >
                    Delete 🗑️
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
