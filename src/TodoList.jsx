
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp,faXmark,faHandPointDown } from '@fortawesome/free-solid-svg-icons'


function TodoList() {

    const [tasks, setTasks] = useState([])
    function add(e) {
        if(e.key !== 'Enter') return;

        e.preventDefault();
        const task = document.querySelector('input[name=task]').value;
        document.querySelector('input[name=task]').value = '';
        setTasks(prevTask => [...prevTask, task]);
    }

    function remove(e) {


        
        const TaskElement = e.target.closest("li");
        const taskText = TaskElement.querySelector(".task-text").textContent;
        e.preventDefault();        
        let newTasks = tasks.filter(task => task !== taskText);
        setTasks(newTasks);
    }

    function moveTaskUp(e) {
        const TaskElement = e.target.closest("li");
        const taskText = TaskElement.querySelector(".task-text").textContent;
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex === 0) return;
        const newTasks = [...tasks];
        [newTasks[taskIndex], newTasks[taskIndex - 1]] = [newTasks[taskIndex - 1], newTasks[taskIndex]];
        setTasks(newTasks);
    }

    function moveTaskDown(e) {
        const TaskElement = e.target.closest("li");
        const taskText = TaskElement.querySelector(".task-text").textContent;
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex === tasks.length - 1) return;
        const newTasks = [...tasks];
        [newTasks[taskIndex], newTasks[taskIndex + 1]] = [newTasks[taskIndex + 1], newTasks[taskIndex]];
        setTasks(newTasks);
    }



    return (
        <>
            <h1>Todo List</h1>
            <ul className='tasks'>
                {tasks.map((task, index) => (
                    <li className='task' key={index}>
                
                        <span className='task-text'>
                        {task}
                        </span>
                        <div className='task-buttons'>
                            <button className='remove-task' onClick={remove}>
                            <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <button className='move-task-up' onClick={moveTaskUp}>
                                <FontAwesomeIcon icon={faHandPointUp} />
                            </button>
                            <button className='move-task-down' onClick={moveTaskDown}>
                                <FontAwesomeIcon icon={faHandPointDown} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <input type="text" id='task-input' onKeyDown={add} name="task" />
        </>
    )
}


export default TodoList;