import './App.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout'; // Adjust path as needed
import Chatbot from './components/chatbot/Chatbot';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <AppLayout />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/saved" element={<SavedTools />} /> */}
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}


export default App;