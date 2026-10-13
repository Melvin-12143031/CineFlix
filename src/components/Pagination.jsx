
const Pagination = ({ page, totalPages, onPageChange, loading }) => {
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Movie pages">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || loading}
      >
        Previous
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={page === pageNumber ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
          disabled={loading}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || loading}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;