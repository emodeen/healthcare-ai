import React, { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  async function load() {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    const t = await res.json();
    setTitle('');
    setTasks(prev => [t, ...prev]);
  }

  async function toggle(task: Task) {
    const res = await fetch(`/api/tasks/${task.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) });
    const updated = await res.json();
    setTasks(prev => prev.map(p => p.id === updated.id ? updated : p));
  }

  async function remove(id: number) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <main>
      <h1>Tasks</h1>
      <form onSubmit={add}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" type="text" />
        <button type="submit">Add</button>
      </form>
      {tasks.length === 0 ? (
        <div className="empty-state">No tasks yet. Add one to get started!</div>
      ) : (
        <ul>
          {tasks.map(t => (
            <li key={t.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={t.completed} 
                  onChange={() => toggle(t)} 
                />
                <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                  {t.title}
                </span>
              </label>
              <button onClick={() => remove(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
