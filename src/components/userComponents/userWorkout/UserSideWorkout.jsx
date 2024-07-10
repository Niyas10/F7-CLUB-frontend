import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./UserSideWorkout.css";
import { userWorkout } from '../../../api/userApi';
import { FaSearch } from 'react-icons/fa';

function UserSideWorkout() {
  const [workoutData, setWorkoutData] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const workoutsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await userWorkout();
        setWorkoutData(response.data.workout);
        setFilteredWorkouts(response.data.workout);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchWorkoutData();
  }, []);

  useEffect(() => {
    let filtered = workoutData;

    if (difficultyFilter) {
      filtered = filtered.filter(workout => workout.difficulty === difficultyFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(workout =>
        workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredWorkouts(filtered);
  }, [workoutData, searchQuery, difficultyFilter]);

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleWorkoutClick = (id) => {
    navigate(`/viewWorkout/${id}`);
  };

  const clearFilter = () => {
    setDifficultyFilter('');
  };

  return (
    <>
      <div>
        <div className="header-section">
          <div className="classic-section">
            <h6 className="workout-font">CLASSIC</h6>
            <h6 className="workout-font">PREMIUM</h6>
          </div>
        </div>

        <div className="filter-section d-flex">
          <div className="dropdown-container">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="difficulty-dropdown"
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
             
            </select>
            {difficultyFilter && <button className="clear-filter-button" onClick={clearFilter}>X</button>}
          </div>
         
          <div className="search-input-container" style={{ marginRight: '0px' }}>
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="category-section container-fluid">
          <div className="row">
            {currentWorkouts.length > 0 ? (
              currentWorkouts.map((workout) => (
                <div key={workout._id} className="col-lg-3 col-md-6 mb-4" onClick={() => handleWorkoutClick(workout._id)}>
                  <div className="workout-cards">
                    <div className="image-container">
                      <img src={workout.images[0]} alt={workout.workoutName} className="img-fluid" />
                    </div>
                    <div className="card-body">
                      <div className="workout-info">
                        <h4 style={{ color: 'white' }}>{workout.workoutName}</h4>
                        <img src="/logo/green arrow.svg" alt="" className="arrow-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <img src="https://cdn.dribbble.com/users/308895/screenshots/2598725/media/55fa13b812db892fa5c26ee67024441d.gif" alt="No workouts found" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="pagination">
          {[...Array(Math.ceil(filteredWorkouts.length / workoutsPerPage))].map((_, index) => (
            <button
              key={index}
              className={`small-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserSideWorkout;
