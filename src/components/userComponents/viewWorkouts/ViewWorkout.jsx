import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewWorkout } from "../../../api/userApi";
import "./ViewWorkout.css";

const ViewWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await viewWorkout(id);
        setWorkout(response.data.workout);
      } catch (error) {
        console.error("Error fetching workout details:", error);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  if (!workout) return <div>Loading...</div>;

  return (
    <>
      <div class="header-section">
        <div class="classic-section">
          <h6 class="workout-font">WORKOUT DETAILS</h6>
        </div>
      </div>
    
      <div className="workout-details-container">
        <div className="workout-image">
          <img src={workout.images[0]} alt={workout.workoutName} />
        </div>
        <div className="workout-details">
          <h1 style={{textAlign:'justify',color:'white'}}>{workout.workoutName}</h1>
          <p style={{textAlign:'justify',color:'white'}}><strong>Difficulty:</strong> {workout.difficulty}</p>
          <p  style={{textAlign:'justify',color:'white'}}><strong>Description:</strong> {workout.description}</p>
        </div>
      </div>
    </>
  );
};

export default ViewWorkout;
