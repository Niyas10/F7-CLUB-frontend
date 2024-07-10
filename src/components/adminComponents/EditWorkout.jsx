import React, { useState, useEffect } from "react";
import { category, editWorkout, finalEditWorkout } from "../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./EditWorkout.css";

const EditWorkout = () => {
  const { workoutId } = useParams();
  const [categories, setCategories] = useState([]);
  const [workout, setWorkout] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const navigate = useNavigate();
  const [imagesError, setImagesError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await category();
        if (response.data && response.data.categorys) {
          setCategories(response.data.categorys);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await editWorkout(workoutId);
        if (response.data && response.data.workout) {
          setWorkout(response.data.workout);
          setExistingImages(response.data.workout.images || []);
        }
      } catch (error) {
        console.error("Error fetching workout:", error);
      }
    };
    fetchWorkout();
  }, [workoutId]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values) => {
    try {
      if (newImages.length === 0 && existingImages.length === 0) {
        setImagesError("Please select at least one image for the workout.");
        return;
      }

      const payload = {
        workoutId,
        workoutName: values.workoutName,
        description: values.description,
        difficulty: values.difficulty,
        category: values.category,
        newImages: await Promise.all(newImages.map(fileToBase64)),
        existingImages,
      };

      const res = await finalEditWorkout(payload);

      if (res?.status === 200) {
        navigate("/admin/workouts");
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        workoutName: workout.workoutName || "",
        description: workout.description || "",
        difficulty: workout.difficulty || "",
        category: workout.category || "",
      },
      onSubmit,
      enableReinitialize: true,
    });

  const handleWorkoutImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    if (isValid) {
      setNewImages([...newImages, ...files]);
      setImagesError(null);
    } else {
      setImagesError("Invalid file type. Please select valid image files.");
    }
  };

  const handleDeleteImage = (imageURL) => {
    setExistingImages(existingImages.filter((image) => image !== imageURL));
  };

  const handleDeleteNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2>Edit Workout</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="workoutName" className="form-label">
                Workout Name
              </label>
              <input
                type="text"
                className="form-control"
                id="workoutName"
                name="workoutName"
                value={values.workoutName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.workoutName && errors.workoutName && (
                <p className="text-danger">{errors.workoutName}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label">
                Difficulty
              </label>
              <select
                className="form-select"
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
                <p className="text-danger">{errors.difficulty}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
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
              </select>
              {touched.category && errors.category && (
                <p className="text-danger">{errors.category}</p>
              )}
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
              />
              {touched.description && errors.description && (
                <p className="text-danger">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="view-section border rounded p-3">
              <h4>View Section</h4>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Choose File
                  </button>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control visually-hidden"
                  accept="image/*"
                  multiple
                  onChange={handleWorkoutImagesChange}
                />
                {imagesError && <p className="text-danger">{imagesError}</p>}
              </div>

              {existingImages.map((imageURL, index) => (
                <div key={index} className="position-relative">
                  <img
                    src={imageURL}
                    alt={`Workout Image ${index + 1}`}
                    className="h-auto"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(imageURL)}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

              {newImages.map((file, index) => (
                <div key={index} className="position-relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New Workout Image ${index + 1}`}
                    className="h-auto"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteNewImage(index)}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
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

export default EditWorkout;