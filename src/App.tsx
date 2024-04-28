import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PDFPage from './PDFPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PDFPage />} />
      </Routes>
    </Router>
  );
};

export default App;
