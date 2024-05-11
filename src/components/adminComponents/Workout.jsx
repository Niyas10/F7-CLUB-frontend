import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addWorkout } from '../../api/adminApi'

function Workout() {
  const navigate = useNavigate()
  const [workout,setWorkout] =useState([])


  useEffect (()=>{
   const fetchWorkout = async()=>{
    try{
      const response = await addWorkout()
      console.log(response)
      if(response.data){
          setWorkout(response.data)
      }
    }catch(error){
      console.error('Error fetching categoies ;',error)
    }
   }
   fetchWorkout();
  },[])



  return (
    <>
    
     <button onClick={()=>navigate('/admin/addworkout')}>add workout</button>
       <div className="userlist">
  <table className="table align-middle mb-0 bg-white">
    <thead className="bg-light">
      <tr>
        <th>ID</th>
        <th className="rounded-top-left">Workout Name</th>
        <th>Difficulty</th>
        <th>Image</th>
        <th className="rounded-top-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Squats</td>
        <td>Intermediate</td>
        <td>
          <img src="https://via.placeholder.com/50" alt="Squats" className="img-fluid" />
        </td>
        <td>
          <button type="button" className="btn btn-primary me-2">
            Edit
          </button>
          <button type="button" className="btn btn-secondary">
            List
          </button>
        </td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  </table>
</div></>
  
  )
}

export default Workout