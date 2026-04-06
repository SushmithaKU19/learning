import { useEffect, useState } from 'react';

const initialForm = {
  title: '',
  author: '',
  isbn: '',
  publishedYear: '',
};

function BookForm({ editingBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || '',
        author: editingBook.author || '',
        isbn: editingBook.isbn || '',
        publishedYear: editingBook.publishedYear?.toString() || '',
      });
    } else {
      setForm(initialForm);
    }
  }, [editingBook]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.author.trim()) {
      alert('Title and Author are required.');
      return;
    }

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      publishedYear: form.publishedYear ? Number(form.publishedYear) : null,
    });
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editingBook ? 'Edit Book' : 'Add Book'}</h2>
      <div className="form-grid">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
        />
        <input
          name="publishedYear"
          type="number"
          placeholder="Published Year"
          value={form.publishedYear}
          onChange={handleChange}
          min="0"
        />
      </div>

      <div className="actions">
        <button type="submit">{editingBook ? 'Update' : 'Create'}</button>
        {editingBook && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
