import React, { useState, useEffect } from "react";
import { addCategory, category, categoryBlock } from "../../api/adminApi";
import Pagination from "../common/Pagination";

function Category() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await category();
        if (response.data && response.data.categorys) {
          setCategories(response.data.categorys);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [categories]);

  const handleAddCategory = async () => {
    try {
      if (!categoryName.trim()) {
        setError("Please enter a category name");
        return;
      }

      const categoryExists = categories.some(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (categoryExists) {
        setError("Category already exists");
        return;
      }

      const newCategoryData = { name: categoryName, isListed: true };
      const addedCategory = await addCategory(newCategoryData);

      setCategories((prevCategories) => [...prevCategories, addedCategory]);

      setShowAddModal(false);
      setCategoryName("");
      setError("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };
  const blockUnblockCategory = async (categoryId, isListed) => {
    try {
      console.log("hey")
      const updatedCategories = categories.map((category) =>
        category._id === categoryId ? { ...category, isListed: !isListed } : category
      );
      console.log(updatedCategories)
      setCategories(updatedCategories);
       const data={
        catId:categoryId,
        status:!isListed
       }
      await categoryBlock(data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setCategoryName("");
    setError("");
  };

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const categoriesToShow = categories.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(categories.length / dataPerPage);
  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      {/* Add Category Button */}
      <div className="row">
        <div className="d-flex justify-content-end mb-3 col-lg-2 ms-auto">
          <button className="btn btn-primary" onClick={openAddModal}>
            Add Category
          </button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          {/* Modal Content for Adding Category */}
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button type="button" className="btn-close" onClick={closeAddModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Table */}
      <div className="categoryTable">
        <h3>Categories</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {categoriesToShow.length > 0 ? (
              categoriesToShow.map((category, index) => (
                <tr key={category._id}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className={`btn ${category.isListed ? 'btn-success' : 'btn-danger'}`}
                      onClick={() => blockUnblockCategory(category._id, category.isListed)}
                    >
                      {category.isListed ? 'Listed' : 'Unlisted'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Component */}
        <Pagination
          numbers={numbers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default Category;
