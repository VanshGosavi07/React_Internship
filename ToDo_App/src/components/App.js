import React, { useState } from 'react';
import TaskList from './TaskList';



function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App container mt-4">
      <div className="card mx-auto margin1" style={{ width: '24rem', border: '4px solid black' }}>
        <img src="https://th.bing.com/th/id/OIG4.RdxDOgVpwkACcHXpx8lo?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" className="card-img-top" alt="ToDo List" />
        <div className="card-body">
          <h5 className="card-title">Manage Your Tasks</h5>
          <div className="input-group mb-3">
            <input
              className='form-control custom-input '
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              style={{ backgroundColor: 'rgb(105, 236, 105)', height: '50px', borderColor: 'black' }}
            />
            <div className="input-group-append margin">
              <button className='btn btn-outline-success' style={{ color: "black", background: 'rgb(105, 236, 105)' }} onClick={addTask}>Add</button>
            </div>
          </div>
          <TaskList tasks={tasks} onTaskComplete={completeTask} onTaskRemove={removeTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
