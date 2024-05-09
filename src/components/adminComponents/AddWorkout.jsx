import React,{useState,useEffect} from "react";
import { category } from "../../api/adminApi";

const AddWorkout = () => {


 const [categories, setCategories] = useState([]);





  return (
    <div className="container">
      <h2>Add Workout</h2>
      <form>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
              Workout Name
              </label>
              <input className="form-control" id="name" name="name" />
            </div>

            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label">
                Difficulty
              </label>
              <select
                className="form-select custom-select"
                id="difficulty"
                name="difficulty"
              >
                <option value="">Select difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select className="form-select" id="category">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="col-md-4">
            <div className="view-section border rounded p-3">
              <h4>View Section</h4>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  className="form-control"
                  id="image"
                  name="image"
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>
        <button type="" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
