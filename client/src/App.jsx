import React from 'react'
import Register from './Components/RegisterForm'
import Login from './Components/LoginForm'
import Students from './Components/StudentList'
import { Route, Routes } from 'react-router-dom'
import UpdateStudent from './Components/updateStudent'

const App = () => {
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Students Information</h1>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/students' element={<Students/>}></Route>
        <Route path='/student/:id' element={<UpdateStudent/>}></Route>
      </Routes>
    </div>
  )
}

export default App