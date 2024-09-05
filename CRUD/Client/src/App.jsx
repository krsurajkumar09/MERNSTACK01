import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Components/Users';
import CreateUser from './Components/CreateUser';
import UpdateUser from './Components/UpdateUser';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/update/:id' element={<UpdateUser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
