import React from 'react'
import {Route,Routes} from "react-router-dom"
import UserSignup from '../pages/userPages/UserSignup'
import UserHome from '../pages/userPages/UserHome'
import UserLogin from '../pages/userPages/UserLogin'
import Otp from '../pages/userPages/Otp'
import UserWorkout from '../pages/userPages/UserWorkout'




const UserRoute = () => {
  return (
  <Routes>
    <Route path='/signup' element={<UserSignup/>} />
    <Route path='/' element={<UserHome/>} />
    <Route path='/otp' element={<Otp/>} />
    <Route path='/login' element={< UserLogin />}/>
    <Route path='/workous' element={<UserWorkout/>} />
  </Routes>
  )
}

export default UserRoute
