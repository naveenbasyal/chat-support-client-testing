
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientChat from './ClientChat';
import AdminChat from './AdminChat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<ClientChat />} />
        <Route path="/admin" element={<AdminChat />} />
      </Routes>
    </Router>
  );
};

export default App;
