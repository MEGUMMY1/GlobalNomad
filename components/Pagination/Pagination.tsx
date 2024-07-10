import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PaginationProps } from './Pagination.types';
import { PaginationArrowButton } from '../Button/Button';

/*
totalItems: 전체 요소 개수, itemsPerPage: 한 페이지에 띄울 요소 개수, baseUrl: 페이지네이션 적용되는 페이지 url
ex) <Pagination totalItems={reviews.length} itemsPerPage={itemsPerPage} baseUrl="activity-details" />
*/
export default function Pagination({
  totalItems,
  itemsPerPage,
  baseUrl,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const router = useRouter();

  useEffect(() => {
    const page = router.query.page
      ? parseInt(router.query.page as string, 10)
      : 1;
    setCurrentPage(page);
  }, [router.query.page]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    router.push(`${baseUrl}?page=${page}`);
  };

  const renderPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-[55px] h-[55px] text-lg flex items-center justify-center mx-1 border border-solid border-var-green2 rounded-2xl m:w-[40px] m:h-[40px] ${i === currentPage ? 'bg-var-green2 text-white' : 'bg-white text-var-green2'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToPrevPage = () => {
    if (!isFirstPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 my-6">
      <PaginationArrowButton
        onClick={goToPrevPage}
        disabled={isFirstPage}
        direction="prev"
      />
      <div className="flex">{renderPageNumbers()}</div>
      <PaginationArrowButton
        onClick={goToNextPage}
        disabled={isLastPage}
        direction="next"
      />
    </div>
  );
}
