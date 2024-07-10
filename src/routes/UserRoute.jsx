import React from 'react'
import {Route,Routes} from "react-router-dom"
import UserSignup from '../pages/userPages/UserSignup'
import UserHome from '../pages/userPages/UserHome'
import UserLogin from '../pages/userPages/UserLogin'
import Otp from '../pages/userPages/Otp'
import UserWorkout from '../pages/userPages/UserWorkout'
import Plans from '../pages/userPages/Plans'
import ForgetPassword from '../pages/userPages/ForgetPassword'
import EmailVerifyOtp from '../pages/userPages/EmailVerifyOtp'
import PasswordReset from '../pages/userPages/PasswordReset'
import ViewWorkoutDeatiles from '../pages/userPages/ViewWorkoutDeatiles'
import UserBlog from '../pages/userPages/UserBlog'
import UserBlogDeatiles from '../pages/userPages/UserBlogDeatiles'


const UserRoute = () => {
  return (
  <Routes>
    <Route path='/signup' element={<UserSignup/>} />
    <Route path='/' element={<UserHome/>} />
    <Route path='/otp' element={<Otp/>} />
    <Route path='/login' element={< UserLogin />}/>
    <Route path='/forgetPassword' element={<ForgetPassword/>} />
    <Route path='/otpVerify/:id' element={<EmailVerifyOtp/>} />
    <Route path='/resetPassword/:id' element={<PasswordReset/>} />
    <Route path='/workout' element={<UserWorkout/>} />
    <Route path='viewWorkout/:id' element={<ViewWorkoutDeatiles/>}/>
    <Route path='/workoutPlans' element={<Plans/>} />
    <Route path='/blog' element={<UserBlog/>} />
    <Route path='/viewBlog/:id' element={<UserBlogDeatiles/>} />
  </Routes>
  )
}

export default UserRoute
