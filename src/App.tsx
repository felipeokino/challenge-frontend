import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout  />}>
        <Route index element={<h1>Home</h1>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
