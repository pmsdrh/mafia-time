import './App.css';
import AdminPage from './utils/pages/admin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/:token/:gameId/:creator/*" element={<AdminPage />}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
