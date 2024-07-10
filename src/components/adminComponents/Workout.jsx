import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workout, deleteWorkout } from '../../api/adminApi';
import './Workout.css';  

function Workout() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const workoutsPerPage = 6; // Adjust the number of workouts per page if needed

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

  const truncateDescription = (description, maxLength = 50) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.slice(0, maxLength)}...`;
  };

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = workouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openConfirmModal = (workoutId) => {
    setWorkoutToDelete(workoutId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setWorkoutToDelete(null);
  };

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkout(workoutToDelete);
      setWorkouts(workouts.filter((workout) => workout._id !== workoutToDelete));
      closeConfirmModal();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <div style={{ textAlign: 'end', marginTop: '50px', marginBottom: '30px' }}>
          <button onClick={() => navigate('/admin/addworkout')} style={{ width: '15%', backgroundColor: 'black', color: 'white' }}>
            Add Workout
          </button>
        </div>

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
              {currentWorkouts.length > 0 ? (
                currentWorkouts.map((workout, index) => (
                  <tr key={workout._id}>
                    <td>{(indexOfFirstWorkout + index) + 1}</td>
                    <td>{workout.workoutName}</td>
                    <td>{truncateDescription(workout.description)}</td>
                    <td>{workout.difficulty}</td>
                    <td>{workout.category ? workout.category.name : '-'}</td>
                    <td>
                      <img src={workout.images[0]} alt={workout.workoutName} className="img-fluid" style={{ maxWidth: '100px' }} />
                    </td>
                    <td>
                      <button onClick={() => navigate(`/admin/editWorkout/${workout._id}`)} className="btn btn-primary me-2">
                        Edit
                      </button>
                      <button onClick={() => openConfirmModal(workout._id)} className="btn btn-danger">
                        Delete
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

        {/* Pagination */}
        <div className='pagination-admin'>
          <div className="pagination">
            {Array.from({ length: Math.ceil(workouts.length / workoutsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`pagination-button-small ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Action</h5>
                  <button type="button" className="btn-close" onClick={closeConfirmModal}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this workout?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeConfirmModal}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteWorkout}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Workout;
