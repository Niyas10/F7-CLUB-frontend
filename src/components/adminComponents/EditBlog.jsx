import React, { useEffect, useState } from 'react';
import { editBlog, finalEditBlog } from '../../api/adminApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function EditBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const navigate = useNavigate();
  const [imagesError, setImagesError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await editBlog(blogId);
        if(response.data && response.data.blog){
          setBlog(response.data.blog);
          setExistingImages(response.data.blog.images || []);  
        }
      } catch (error) {
        console.error('Error fetching Blog:', error);
      }
    };
    fetchBlog();
  }, [blogId]);

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
        setImagesError('Please select at least one image for the blog.');
        return;
      }

      const payload = {
        blogId,
        blogName: values.blogName,
        description: values.description,
        newImages: await Promise.all(newImages.map(fileToBase64)),
        existingImages,
      };

      const res = await finalEditBlog(payload);

      if (res?.status === 200) {
        navigate('/admin/blogs');
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      blogName: blog.blogName || '',
      description: blog.description || '',
    },
    onSubmit,
    enableReinitialize: true,
  });

  const handleBlogImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) => file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')
    );
    if (isValid) {
      setNewImages([...newImages, ...files]);
      setImagesError(null);
    } else {
      setImagesError('Invalid file type. Please select valid image files.');
    }
  };

  const handleDeleteImage = (imageURL) => {
    setExistingImages(existingImages.filter((image) => image !== imageURL));
  };

  const handleDeleteNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  return  (
    <div className="container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="blogName" className="form-label">
                Blog Name
              </label>
              <input
                type="text"
                className="form-control"
                id="blogName"
                name="blogName"
                value={values.blogName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.blogName && errors.blogName && (
                <p className="text-danger">{errors.blogName}</p>
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
                    onClick={() => document.getElementById('fileInput').click()}
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
                  onChange={handleBlogImagesChange}
                />
                {imagesError && <p className="text-danger">{imagesError}</p>}
              </div>
  
              {existingImages.map((imageURL, index) => (
                <div key={index} className="position-relative">
                  <img
                    src={imageURL}
                    alt={`Blog Image ${index + 1}`}
                    className="h-auto"
                    style={{ maxWidth: '100%', marginTop: '10px' }}
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
                    alt={`New Blog Image ${index + 1}`}
                    className="h-auto"
                    style={{ maxWidth: '100%', marginTop: '10px' }}
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
}

export default EditBlog;
