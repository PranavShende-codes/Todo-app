import { useState } from "react";
import "./App.css";

function App() {
  const [Task, setTask] = useState("");
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-all w-full
          ">Add Task</button>
        </div>
      </div>
    </>
  );
}

export default App;
