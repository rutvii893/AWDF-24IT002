import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import { Link } from 'react-router-dom';

function Projects() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await createTask({ title, description, priority });
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      alert('Task added successfully!');
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      alert('Task deleted successfully!');
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <span className="section-label">Task Manager</span>
        <h2>My Tasks</h2>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Add New Task</h3>
        <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input 
            type="text" 
            placeholder="Task title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="text" 
            placeholder="Description (optional)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Task
          </button>
        </form>
      </div>

      <input 
        type="text" 
        placeholder="Search tasks by title..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '30px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      {loading && <Spinner />}
      {error === 'Unauthorized' ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: 'red' }}>You must be logged in to view and manage tasks.</p>
          <Link to="/login" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Go to Login</Link>
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchTasks} />
      ) : null}

      {!loading && !error && (
        <div className="project-grid">
          {filteredTasks.map((task) => (
            <article className="project-card" key={task._id}>
              <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
              <p>{task.description || 'No description provided.'}</p>
              <div className="project-tags">
                <span>Priority: {task.priority}</span>
                <span>Status: {task.completed ? 'Completed' : 'Pending'}</span>
              </div>
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleToggleComplete(task)}
                  style={{ padding: '6px 12px', backgroundColor: task.completed ? '#28a745' : '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1 }}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => handleDeleteTask(task._id)}
                  style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {!loading && !error && filteredTasks.length === 0 && (
        <p>No tasks found.</p>
      )}
    </section>
  );
}

export default Projects;