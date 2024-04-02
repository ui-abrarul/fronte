import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import EditPost from "./components/EditPost/EditPost";
import ViewPost from "./components/ViewPost/ViewPost";

function App() {

  

  return (

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/posts/:id" element={<ViewPost/>} />
      <Route path="/posts/:id/edit" element={<EditPost/>} />
    </Routes>
     
  );
}

export default App;
