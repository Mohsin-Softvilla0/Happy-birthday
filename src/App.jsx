import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/main.css';
import BirthdayWebsite from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayWebsite />} />
      </Routes>
    </Router>
  );
}

export default App;