import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { addBlog } from "../../api/adminApi"; 

const AddBlog = () => {
  const inputRef = useRef();
  const [Image, setImage] = useState([]);
  const navigate = useNavigate();
  const [ImagesError, setImagesError] = useState(null);

  const onChooseImg = () => {
    inputRef.current.click();
  };

  const formik = useFormik({
    initialValues: {
      blogName: "",
      description: "",
    },
    validationSchema: Yup.object({
      blogName: Yup.string()
        .required("Blog Name is required"),
      description: Yup.string()
        .required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (Image.length === 0) {
          setImagesError("Please select at least one image for the blog.");
          return;
        }

        const formData = {
          ...values,
          images: Image, // Change to 'images' to match the backend
        };

        const res = await addBlog(formData);
        if (res?.status === 201) {
          navigate("/admin/blogs");
          console.log(res?.data?.message);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
        console.log(error, "response in error");
      }
    },
  });

  const handleOnChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) => file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
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
      <h2>Add Blog</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="blogName" className="form-label">
                Blog Name
              </label>
              <input
                className="form-control"
                id="blogName"
                name="blogName"
                type="text"
                value={formik.values.blogName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.blogName && formik.errors.blogName && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.blogName}</p>
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
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows="3"
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
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

export default AddBlog;
