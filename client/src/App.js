import './App.css';
import LogExpense from './pages/LogExpense';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { routePath } from './routes/route';
import AllExpense from './pages/AllExpense';
function App() {
  return (
    <Router>
      <Routes>
        <Route path={routePath.home} element={<Home/>}/>
        <Route path={routePath.log} element={<LogExpense/>}/>
        <Route path={routePath.expenses} element={<AllExpense/>}/>
      </Routes>
    </Router>
  );
}

export default App;
