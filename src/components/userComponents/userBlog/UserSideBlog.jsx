import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSideBlog.css';
import { userBlog } from '../../../api/userApi';
import { FaSearch } from 'react-icons/fa';

function UserSideBlog() {
  const [blogData, setBlogData] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const response = await userBlog();
        if (response && response.data && response.data.message) {
          setBlogData(response.data.message);
          setFilteredBlogs(response.data.message);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  useEffect(() => {
    if (blogData.length > 0) {
      const filtered = blogData.filter(blog =>
        blog.blogName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [blogData, searchQuery]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBlogClick = (id) => {
    navigate(`/viewBlog/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="header-section">
        <div className="classic-section">
          <h6 className="workout-font">BLOGS</h6>
        </div>
      </div>

      <div className="user-blog-container">
        <div className="user-blog-search-section">
          <div className="user-blog-search-input-container">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="user-blog-search-icon" />
          </div>
        </div>

        <div className="user-blog-section">
          <div className="row">
            {filteredBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <div key={blog._id} className="col-lg-4 col-md-6 mb-4" onClick={() => handleBlogClick(blog._id)}>
                  <div className="user-blog-card">
                    <div className="user-blog-image-container">
                      {blog.images && blog.images.length > 0 && (
                        <img src={blog.images[0]} alt={blog.blogName} className="img-fluid" />
                      )}
                    </div>
                    <div className="user-blog-card-body">
                      <div className="user-blog-info">
                        <h4>{blog.blogName}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="user-blog-no-results">No blogs found</div>
            )}
          </div>
        </div>

        {filteredBlogs.length > blogsPerPage && (
          <div className="user-blog-pagination">
            {[...Array(Math.ceil(filteredBlogs.length / blogsPerPage))].map((_, index) => (
              <button 
                key={index}
                className={`user-blog-pagination-button ${currentPage === index + 1 ? 'user-blog-pagination-button-active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserSideBlog;