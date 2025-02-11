import './App.css'
import QuillEditor from './components/QuillEditor';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {v4 as uuidV4} from 'uuid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={`/document/${uuidV4()}`} />} />
        <Route path='/document/:docId' element={<QuillEditor/>} />
      </Routes>
    </Router>
  );
}

export default App;
