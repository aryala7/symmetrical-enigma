import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp, faXmark, faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { getTodos } from "./api";


function TodoList() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTodos();
      setTasks(data);
    }
    fetchTasks();
  },[])
  
  const toggleCheckList = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const addTask = (e) => {
    if (e.key !== "Enter") return;

    const taskInput = e.target.value.trim();
    if (!taskInput) return;

    e.preventDefault();
    setTasks((prevTasks) => [...prevTasks, { task: taskInput, checked: false }]);
    e.target.value = ""; // Clear the input field
  };

  const removeTask = (indexToRemove) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToRemove));
  };

  const moveTaskUp = (index) => {
    if (index === 0) return; // Already at the top

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      return updatedTasks;
    });
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return; // Already at the bottom

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      return updatedTasks;
    });
  };

  const renderTasks = () =>
    tasks.map((task, index) => (
      <li
        className={`task ${task.checked ? "checked" : ""}`}
        key={index}
        onClick={() => toggleCheckList(index)}
      >
        <div className="task-info">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.checked}
            readOnly
          />
          <span className="task-text">{task.task}</span>
        </div>
        <div className="task-buttons">
          <button
            className="remove-task"
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling the task on button click
              removeTask(index);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button
            className="move-task-up"
            onClick={(e) => {
              e.stopPropagation();
              moveTaskUp(index);
            }}
          >
            <FontAwesomeIcon icon={faHandPointUp} />
          </button>
          <button
            className="move-task-down"
            onClick={(e) => {
              e.stopPropagation();
              moveTaskDown(index);
            }}
          >
            <FontAwesomeIcon icon={faHandPointDown} />
          </button>
        </div>
      </li>
    ));

  return (
    <div>
      <h1>Todo List</h1>
      <ul className="tasks">{renderTasks()}</ul>
      <input
        type="text"
        id="task-input"
        placeholder="What's on your mind..."
        onKeyDown={addTask}
        name="task"
      />
    </div>
  );
}

export default TodoList;
