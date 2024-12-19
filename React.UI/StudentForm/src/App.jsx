import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Router } from 'react-router-dom'
import StudentList from './Components/StudentList'
import SaveStudent from './Components/SaveStudent'
import Details from './Components/Details'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<StudentList />} />
        <Route path='/SaveStudent' element={<SaveStudent />} />
        <Route path='/Details' element={<Details />} />
      </Routes>      
    </>
  );
};

export default App;
