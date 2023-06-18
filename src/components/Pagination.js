import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePrevious, handleNext }) => {
  return (
    <div id="pagination">
      <button id="previous" disabled={currentPage === 1} onClick={handlePrevious}>
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button id="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
