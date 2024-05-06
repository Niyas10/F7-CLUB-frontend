import React from "react";

function Pagination({ currentPage, setCurrentPage, totalPages, numbers }) {
  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(num) {
    setCurrentPage(num);
  }
  
  return (
    <div>
  <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center my-5">
      {currentPage !== 1 && (
        <li className="page-item">
          <a
            onClick={prevPage}
            className="page-link"
            style={{ cursor: "pointer" }}
          >
            Prev
          </a>
        </li>
      )}
      {numbers.map((item, i) => (
        <li key={i} className="page-item">
          <a
            onClick={() => changePage(item)}
            className={`page-link ${
              currentPage === item ? "bg-primary text-red font-weight-bold" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            {item}
          </a>
        </li>
      ))}
      {currentPage !== totalPages && (
        <li className="page-item">
          <a
            onClick={nextPage}
            className="page-link"
            style={{ cursor: "pointer" }}
          >
            Next
          </a>
        </li>
      )}
    </ul>
  </nav>
</div>
  );
}

export default Pagination;
