import React, { useEffect, useState } from 'react';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
import { blog, deleteBlog } from '../../api/adminApi';

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const blogsPerPage = 1;

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await blog();
      if (response.data) {
        setBlogs(response.data.blogs);
        setFilteredBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openConfirmModal = (blogId) => {
    setBlogToDelete(blogId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setBlogToDelete(null);
    setIsDeleting(false);
  };

  const handleDeleteBlog = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await deleteBlog(blogToDelete);
      if (response.status === 200) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogToDelete));
        setFilteredBlogs(prevFilteredBlogs => prevFilteredBlogs.filter(blog => blog._id !== blogToDelete));
        closeConfirmModal();
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <div style={{ textAlign: 'end', marginTop: '50px', marginBottom: '30px' }}>
          <button onClick={() => navigate('/admin/addBlog')} style={{ width: '15%', backgroundColor: 'black', color: 'white' }}>
            Add Blog
          </button>
        </div>

        <div className="blog-list">
          <table className="table align-middle mb-0 bg-white text-center">
            <thead className="bg-light">
              <tr>
                <th>No</th>
                <th>Blog Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.length === 0 ? (
                <tr>
                  <td colSpan="5">No blogs found</td>
                </tr>
              ) : (
                currentBlogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1 + (currentPage - 1) * blogsPerPage}</td>
                    <td>{blog.blogName}</td>
                    <td>{blog.description}</td>
                    <td>
                      {blog.images.length > 0 && (
                        <img src={blog.images[0]} alt={blog.blogName} className="img-fluid" style={{ maxWidth: '100px' }} />
                      )}
                    </td>
                    <td>
                      <button onClick={() => navigate(`/admin/editBlog/${blog._id}`)} className="btn btn-primary me-2">Edit</button>
                      <button className="btn btn-danger" onClick={() => openConfirmModal(blog._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='blog-pagination'>
          {[...Array(Math.ceil(filteredBlogs.length / blogsPerPage))].map((_, index) => (
            <button
              key={index}
              className={`blog-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {showConfirmModal && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Action</h5>
                  <button type="button" className="btn-close" onClick={closeConfirmModal}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this blog?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeConfirmModal} disabled={isDeleting}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleDeleteBlog} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Confirm'}
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

export default Blog;