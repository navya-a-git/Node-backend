import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  const fetchNotes = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filter) params.append('filter', filter);
      const url = `/api/notes?${params}`;
      console.log('Fetching notes from:', url);
      const response = await fetch(url);
      console.log('Fetch response status:', response.status);
      const data = await response.json();
      console.log('Fetched notes:', data);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }, [search, filter]);

  useEffect(() => {
    fetchNotes();
  }, [search, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Submitting note:', { title, description, editingId });
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/notes/${editingId}` : '/api/notes';
      console.log('Making request to:', url, 'method:', method);
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setTitle('');
      setDescription('');
      setEditingId(null);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
      setError('Failed to save note. Check console for details.');
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setEditingId(null);
    setError('');
  };

  return (
    <div className="App">
      <h1>Task Notes</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{editingId ? 'Update' : 'Create'} Note</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;