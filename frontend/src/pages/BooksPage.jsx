import { useEffect, useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { createBook, deleteBook, getBooks, updateBook } from '../api/booksApi';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (bookPayload) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, bookPayload);
      } else {
        await createBook(bookPayload);
      }
      setEditingBook(null);
      loadBooks();
    } catch (err) {
      alert('Save failed. Check backend logs/API validation.');
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Delete this book?');
    if (!ok) {
      return;
    }
    try {
      await deleteBook(id);
      if (editingBook && editingBook.id === id) {
        setEditingBook(null);
      }
      loadBooks();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  return (
    <main className="container">
      <h1>Book Management System</h1>
      <p className="subtitle">React + Spring Boot + MySQL</p>

      <BookForm
        editingBook={editingBook}
        onSubmit={handleSubmit}
        onCancel={() => setEditingBook(null)}
      />

      {loading ? <p>Loading books...</p> : <BookList books={books} onEdit={setEditingBook} onDelete={handleDelete} />}

      {error && <p className="error">{error}</p>}
    </main>
  );
}

export default BooksPage;
