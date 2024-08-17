import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, QuestionCategory, Loader } from './components/index';
import { HomePage } from './layout/index';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<QuestionCategory />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
