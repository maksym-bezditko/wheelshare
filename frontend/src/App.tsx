import "./App.css";
import { publicRoutes } from "./models/routes";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          {publicRoutes.map((item) => (
            <Route key={item.path} path={item.path} element={item.component}/>
          ))}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
