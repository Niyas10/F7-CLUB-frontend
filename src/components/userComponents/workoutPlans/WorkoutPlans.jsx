import React from 'react'
import './WorkoutPlans.css';
import {Link} from "react-router-dom";


function WorkoutPlans() {
  return (
    <div className="workout-plans-container" style={{marginTop:'100px'}}>
    {/* Classic Workouts Box */}
    <div className="box classic-workouts">
      <h2 className="heading">Classic Workouts</h2>
      <p className="features">Free workout | Free blog | Free details</p>
      <button className=""> <Link to={'/workout'}>Visit Workout   </Link>   </button>
    </div>

    {/* Subscription Box */}
    <div className="box subscription">
      <h2 className="heading">Subscription</h2>
      <p className="features">Free blog | Free workout | Chat with admin | 24/7 support</p>
      <button className="/workout">   Purchase Subscription</button>
    </div>
  </div>
  )
}

export default WorkoutPlans