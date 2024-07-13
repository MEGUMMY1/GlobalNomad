import React from 'react';
import { PaginationProps } from './Pagination.types';
import { PaginationArrowButton } from '../Button/Button';

/*
totalItems: 전체 요소 개수, itemsPerPage: 한 페이지에 띄울 요소 개수, currentPage: 현재 페이지, onPageChange: 페이지 변경 핸들러
ex) <Pagination totalItems={reviews.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
*/
export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
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
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
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
