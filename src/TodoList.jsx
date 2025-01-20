
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp,faXmark,faHandPointDown } from '@fortawesome/free-solid-svg-icons'


function TodoList() {

    const [tasks, setTasks] = useState([])


    function toggleCheckList(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, checked: !task.checked } : task
          );
          setTasks(updatedTasks);
    }
    function add(e) {
        if(e.key !== 'Enter') return;

        e.preventDefault();
        const task = document.querySelector('input[name=task]').value;
        document.querySelector('input[name=task]').value = '';
        const newTask = {task: task, checked:false}
        setTasks(prevTask => [...prevTask, newTask]);
        
    }

    function remove(removedIndex) {
        // const TaskElement = e.target.closest("li");
        // const taskText = TaskElement.querySelector(".task-text").textContent;
        let newTasks = tasks.filter((_,index) => index !== removedIndex);
        setTasks(newTasks);
    }

    function moveTaskUp(taskIndex) {
        if (taskIndex === 0) return;
        const newTasks = [...tasks];
        [newTasks[taskIndex], newTasks[taskIndex - 1]] = [newTasks[taskIndex - 1], newTasks[taskIndex]];
        setTasks(newTasks);
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
        setTasks(newTasks);
    }


    function renderTasks() {

        return tasks.map((task,index) => {
            return (
                <li className={`task ${task.checked ? "checked" : ""}`} key={index} onClick={() => toggleCheckList(index)}>
                        <div className='task-info'>
                            <input type='checkbox' className='task-checkbox' checked={task.checked} readOnly />
                            <span className='task-text'>{task.task}</span>
                        </div>
                        <div className='task-buttons'>
                            <button className='remove-task' onClick={() => remove(index)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <button className='move-task-up' onClick={() =>moveTaskUp(index)}>
                                <FontAwesomeIcon icon={faHandPointUp} />
                            </button>
                            <button className='move-task-down' onClick={() => moveTaskDown(index)}>
                                <FontAwesomeIcon icon={faHandPointDown} />
                            </button>
                        </div>
                </li>
            )
        })
    }



    return (
        <>
            <h1>Todo List</h1>
            <ul className='tasks'>
                {renderTasks()}
            </ul>

            <input type="text" id='task-input' onKeyDown={add} name="task" />
        </>
    )
}


export default TodoList;