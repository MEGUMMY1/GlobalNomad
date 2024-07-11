import { BestActivitiesProps, ActivityDetail } from '@/components/Lander/BestActivities.type';
import { useEffect, useState } from 'react';

interface UsePaginationProps {
  fetchData: (page: number) => Promise<BestActivitiesProps | null>;
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
  fetchData,
  itemsPerPage,
}: UsePaginationProps): UsePaginationResult {
  const [items, setItems] = useState<ActivityDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    async function loadItems() {
      const result = await fetchData(currentPage);
      if (result) {
        const limitedItems = result.activities.slice(0, 9);
        setItems(limitedItems);
        setTotalPage(Math.min(Math.ceil(result.totalCount / itemsPerPage), 3));
        setIsFirstPage(currentPage === 1);
        setIsLastPage(currentPage >= Math.ceil(result.totalCount / itemsPerPage));
      }
    }
    loadItems();
  }, [currentPage, fetchData, itemsPerPage]);

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
