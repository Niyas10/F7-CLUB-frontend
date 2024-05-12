import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workout } from '../../api/adminApi';

function Workout() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await workout();
        if (response.data) {
          setWorkouts(response.data.workouts);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <>
      <button onClick={() => navigate('/admin/addworkout')}>Add Workout</button>
      <div className="userlist">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>ID</th>
              <th className="rounded-top-left">Workout Name</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Category</th>
              <th>Image</th>
              <th className="rounded-top-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length > 0 ? (
              workouts.map((workout, index) => (
                <tr key={workout._id}>
                  <td>{index + 1}</td>
                  <td>{workout.workoutName}</td>
                  <td>{workout.description}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.category ? workout.category.name : '-'}</td>
                  <td>
                    <img src={workout.images[0]} alt={workout.workoutName} className="img-fluid" />
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
              ))
            ) : (
              <tr>
                <td colSpan="7">No workouts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Workout;
