import { useState } from 'react';

const usePagination = (initialPage = 1, itemsPerPage = 12) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(itemsPerPage);

  const nextPage = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => Math.max(1, prev - 1));
  const goToPage = (pageNumber) => setPage(Math.max(1, pageNumber));

  return { page, limit, setLimit, nextPage, previousPage, goToPage };
};

export default usePagination;
