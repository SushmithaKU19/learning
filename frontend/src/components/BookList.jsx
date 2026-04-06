function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>Books</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="6" className="center">No books found</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn || '-'}</td>
                  <td>{book.publishedYear ?? '-'}</td>
                  <td>
                    <button className="small" onClick={() => onEdit(book)}>Edit</button>
                    <button className="small danger" onClick={() => onDelete(book.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
