import React, { useState } from 'react';
import AdminNavbar from '../../components/adminComponents/adminCommon/AdminNavbar';

const AdminAddWorkout = () => {
  const categories = ['Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates'];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleShowCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h2>Add Workout</h2>
        <form>
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input className="form-control" id="name" name="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="difficulty" className="form-label">
                  Difficulty
                </label>
                <input className="form-control" id="difficulty" name="difficulty" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control" id="description" name="description" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    value={selectedCategories.join(', ')}
                    disabled
                    placeholder="Select categories"
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleShowCategoryModal}>
                    <i className="bi bi-chevron-down"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="view-section border rounded p-3">
                <h4>View Section</h4>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input className="form-control" id="image" name="image" type="file" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {showCategoryModal && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select Categories</h5>
                  <button type="button" className="btn-close" onClick={handleCloseCategoryModal}></button>
                </div>
                <div className="modal-body">
                  {categories.map((category) => (
                    <div key={category} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={category}
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                      />
                      <label className="form-check-label" htmlFor={category}>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseCategoryModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleCloseCategoryModal}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAddWorkout;