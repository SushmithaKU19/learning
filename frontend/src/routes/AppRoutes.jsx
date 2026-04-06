import { Navigate, Route, Routes } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
      <Route path="*" element={<Navigate to="/books" replace />} />
    </Routes>
  );
}

export default AppRoutes;
