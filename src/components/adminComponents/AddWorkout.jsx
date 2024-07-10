import React, { useState, useEffect, useRef } from "react";
import { addWorkout, category } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const AddWorkout = () => {
  const [categories, setCategories] = useState([]);
  const inputRef = useRef();
  const [Image, setImage] = useState([]);
  const navigate = useNavigate();
  const [ImagesError, setImagesError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await category();
        if (response.data && response.data.categorys) {
          setCategories(response.data.categorys.filter((category) => category.isListed));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const onChooseImg = () => {
    inputRef.current.click();
  };

  const onSubmit = async () => {
    try {
      if (Image.length === 0) {
        setImagesError("Please select at least one image for the workout.");
        return;
      }

      const formData = {
        ...values,
        image: Image,
      };

      const res = await addWorkout(formData);
      if (res?.status === 201) {
        navigate("/admin/workouts");
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
      console.log(error, "response in error");
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      workoutName: "",
      description: "",
      difficulty: "",
      category: "",
      isListed: true,
    },
    onSubmit,
  });

  const handleOnChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (files) => files.type.startsWith("image/jpeg") || files.type.startsWith("image/png")
    );
    if (isValid) {
      setImageToBase(files);
      setImagesError(null);
    } else {
      setImagesError("Invalid files type. Please select valid image files.");
    }
    event.target.value = null;
  };

  const setImageToBase = async (files) => {
    const imagesData = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        imagesData.push(reader.result);
        if (imagesData.length === files.length) {
          setImage(imagesData);
        }
      };
    }
  };

  const handleRemoveImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Workout Name
              </label>
              <input
                className="form-control"
                id="workoutName"
                name="workoutName"
                type="text"
                value={values.workoutName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.workoutName && errors.workoutName && (
                <p className="text-red-600 text-sm mt-1">{errors.workoutName}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label">
                Difficulty
              </label>
              <select
                className="form-select custom-select"
                id="difficulty"
                name="difficulty"
                value={values.difficulty}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
              {touched.difficulty && errors.difficulty && (
                <p className="text-red-600 text-sm mt-1">{errors.difficulty}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select custom-select"
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
                {touched.category && errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
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
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="3"
              ></textarea>
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="view-section border rounded p-3">
              <h4>View Section</h4>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <button type="button" className="btn" onClick={onChooseImg}>
                    Choose File
                  </button>
                </label>
                <span className="ml-2">{Image.length} file(s) selected</span>

                <input
                  className="form-control"
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  multiple
                  ref={inputRef}
                  onChange={handleOnChange}
                  style={{ display: "none" }}
                />
              </div>
              {Image.length > 0 && (
                <div className="image-preview">
                  {Image.map((img, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                      <img
                        src={img}
                        alt={`preview ${index}`}
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      />
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveImage(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {ImagesError && <p className="text-red-500">{ImagesError}</p>}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
