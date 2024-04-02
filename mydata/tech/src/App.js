import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import ViewPost from './components/ViewPost/ViewPost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/posts/:id" element={<ViewPost/>} />
      </Routes>
    </div>
  );
}

export default App;
