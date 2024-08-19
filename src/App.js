import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QuestionCategory ,QuestionTypes } from './components/index';
import { HomePage } from './layout/index';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<QuestionCategory />} />
          <Route path="/category/:categoryId" element={<QuestionTypes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
