import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { getTasks, createTask, updateTask, deleteTask, generateTaskDescription } from '../api';
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

  // AI Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMessage, setAiMessage] = useState(null);
  const [aiError, setAiError] = useState(null);

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

  const handleGenerateDescription = async () => {
    if (!title.trim()) {
      setAiError('Please enter a task title first.');
      setAiMessage(null);
      return;
    }

    setIsGenerating(true);
    setAiError(null);
    setAiMessage(null);

    try {
      const generated = await generateTaskDescription(title.trim());
      setDescription(generated);
      setAiMessage('AI task description generated successfully! You can review and edit it below.');
    } catch (err) {
      setAiError(err.message || 'AI generation failed. Please enter description manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await createTask({ title, description, priority });
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setAiMessage(null);
      setAiError(null);
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

      <div style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        background: 'var(--bg-glass)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: 'var(--radius-md)' 
      }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: '#f1f5f9' }}>Add New Task</h3>
        <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Task title (e.g. Complete database integration)..." 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (aiError) setAiError(null);
              }}
              required
              style={{ flex: 1, minWidth: '240px' }}
            />
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.7 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                padding: '10px 16px',
                borderRadius: 'var(--radius-sm, 6px)'
              }}
            >
              {isGenerating ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></span>
                  Generating...
                </>
              ) : (
                '✨ Generate Description'
              )}
            </button>
          </div>

          {aiMessage && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm, 6px)',
              color: '#34d399',
              fontSize: '0.9rem'
            }}>
              ✓ {aiMessage}
            </div>
          )}

          {aiError && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm, 6px)',
              color: '#f87171',
              fontSize: '0.9rem'
            }}>
              ⚠️ {aiError}
            </div>
          )}

          <div>
            <textarea 
              placeholder="Description (optional or generate using AI)..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm, 6px)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                color: '#f1f5f9',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <p style={{
              fontSize: '0.8rem',
              color: '#94a3b8',
              marginTop: '4px',
              fontStyle: 'italic'
            }}>
              💡 Disclaimer: AI-generated suggestion: Please review and edit this content before creating your task.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ flex: 1, minWidth: '160px' }}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ minWidth: '140px' }}
            >
              + Add Task
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginBottom: '28px', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="🔍 Search tasks by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <Spinner />}
      {error === 'Unauthorized' ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          background: 'rgba(239, 68, 68, 0.05)', 
          border: '1px solid rgba(239, 68, 68, 0.2)', 
          borderRadius: 'var(--radius-md)' 
        }}>
          <p style={{ color: '#f87171', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 500 }}>
            You must be logged in to view and manage tasks.
          </p>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchTasks} />
      ) : null}

      {!loading && !error && (
        <div className="project-grid">
          {filteredTasks.map((task) => (
            <article className="project-card" key={task._id}>
              <h3 style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <span>{task.title}</span>
                {task.completed && <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>✓</span>}
              </h3>
              <p style={{ opacity: task.completed ? 0.65 : 0.9 }}>
                {task.description || 'No description provided.'}
              </p>
              <div className="project-tags">
                <span style={{
                  color: task.priority === 'high' ? '#f87171' : task.priority === 'low' ? '#34d399' : '#fbbf24',
                  borderColor: task.priority === 'high' ? 'rgba(239, 68, 68, 0.3)' : task.priority === 'low' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                  background: task.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : task.priority === 'low' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                }}>
                  Priority: {task.priority.toUpperCase()}
                </span>
                <span style={{
                  color: task.completed ? '#34d399' : '#94a3b8',
                  borderColor: task.completed ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)',
                  background: task.completed ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
                }}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleToggleComplete(task)}
                  className="btn"
                  style={{ 
                    flex: 1,
                    padding: '8px 12px', 
                    fontSize: '0.85rem',
                    background: task.completed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: task.completed ? '#34d399' : '#fbbf24',
                    border: `1px solid ${task.completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn"
                  style={{ 
                    padding: '8px 14px', 
                    fontSize: '0.85rem',
                    background: 'rgba(239, 68, 68, 0.15)', 
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {!loading && !error && filteredTasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <p>No tasks found.</p>
        </div>
      )}
    </section>
  );
}

export default Projects;