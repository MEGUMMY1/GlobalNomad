import { useEffect, useState } from 'react';
import { ActivityDetail } from '@/components/Lander/BestActivities.type';
import { getActivityListResponse } from '@/pages/api/activities/apiactivities.types';

interface UsePaginationProps {
  data: getActivityListResponse | undefined; // useQuery에서 가져온 데이터 타입으로 수정
  itemsPerPage: number;
}

interface UsePaginationResult {
  currentItems: ActivityDetail[];
  items: ActivityDetail[];
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

function usePagination({
  data,
  itemsPerPage,
}: UsePaginationProps): UsePaginationResult {
  const [items, setItems] = useState<ActivityDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (data) {
      const totalItems = data.activities;
      setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
      setItems(totalItems.slice(0, itemsPerPage));
      setIsFirstPage(currentPage === 1);
      setIsLastPage(currentPage >= 3);
    }
  }, [data, itemsPerPage, currentPage]);

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length); // 현재 페이지에 표시할 항목의 끝 인덱스
  const currentItems = items.slice(startIndex, endIndex); // 현재 페이지에 표시할 항목들

  return {
    currentItems,
    items,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    handlePrevClick,
    handleNextClick,
  };
}

export default usePagination;
