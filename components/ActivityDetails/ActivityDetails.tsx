import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ActivityDetailsProps } from './ActivityDetails.types';
import { formatNumberToFixed } from '@/utils/formatNumberToFixed';
import ImageContainer from './ImageContainer/ImageContainer';
import Map from './Map/Map';
import { formatCurrency } from '@/utils/formatCurrency';
import Reservation from './Reservation/Reservation';
import { MeatballButton } from '../Button/Button';
import useClickOutside from '@/hooks/useClickOutside';
import Pagination from '../Pagination/Pagination';
import {
  getActivityInfo,
  getActivityReviews,
} from '@/pages/api/activities/apiactivities';
import {
  getActivityInfoResponse,
  getActivityReviewsResponse,
} from '@/pages/api/activities/apiactivities.types';
import Spinner from '../Spinner/Spinner';
import { userState } from '@/states/userState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ActivityDetailsPageMeta } from '../MetaData/MetaData';
import useDeleteActivity from '@/hooks/myActivity/useDeleteActivity';
import { usePopup } from '@/hooks/usePopup';
import { darkModeState } from '@/states/themeState';
import { ShareButton } from '../ShareButton/ShareButton';
import { ViewedActivitiesState } from '@/states/ViewedState';
import { ViewedActivityProps } from '../ViewedActivities/ViewedActivities.type';

export default function ActivityDetails({ id }: ActivityDetailsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isDarkMode = useRecoilValue(darkModeState);
  const [currentPage, setCurrentPage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string, 10) : 1
  );
  const [ViewedInfo, setViewedInfo] = useRecoilState(ViewedActivitiesState);
  const itemsPerPage = 3;
  const { openPopup } = usePopup();
  const { deleteMyActivityMutation } = useDeleteActivity();
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const userData = useRecoilValue(userState);

  const {
    data: activityData,
    error: activityError,
    isLoading: isLoadingActivity,
  } = useQuery<getActivityInfoResponse>({
    queryKey: ['activityDetails', id],
    queryFn: () => getActivityInfo({ id }),
  });

  const addViewedActivity = useCallback(
    (newActivity: ViewedActivityProps) => {
      setViewedInfo((prevViewedInfo) => {
        // 중복되는 항목 찾기
        const isDuplicate = prevViewedInfo.some(
          (activity) => activity.id === newActivity.id
        );
        let updatedViewedInfo = prevViewedInfo.filter(
          (activity) => activity.id !== newActivity.id
        );

        // 새로운 항목 추가
        updatedViewedInfo = [newActivity, ...updatedViewedInfo];

        // 10개를 초과할 경우 가장 오래된 항목 삭제
        if (updatedViewedInfo.length > 10) {
          updatedViewedInfo.pop();
        }

        return updatedViewedInfo;
      });
    },
    [setViewedInfo]
  );

  const {
    data: reviewData,
    error: reviewError,
    isLoading: isLoadingReviews,
  } = useQuery<getActivityReviewsResponse>({
    queryKey: ['reviewList', id, currentPage],
    queryFn: () =>
      getActivityReviews({ id, page: currentPage, size: itemsPerPage }),
  });

  useEffect(() => {
    if (activityData?.id !== undefined) {
      addViewedActivity({
        id: activityData.id,
        bannerImage: activityData.bannerImageUrl || '',
        title: activityData.title || '',
      });
    }
  }, [activityData, addViewedActivity]);

  if (isLoadingActivity || isLoadingReviews) {
    return <Spinner />;
  }

  if (activityError || reviewError) {
    console.error(
      'Error fetching activity details:',
      activityError || reviewError
    );
    return <div>Error fetching activity details</div>;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getRatingText = (rating: number): string => {
    if (rating >= 4 && rating <= 5) {
      return '매우만족';
    } else if (rating >= 3 && rating < 4) {
      return '만족';
    } else if (rating >= 2 && rating < 3) {
      return '보통';
    } else if (rating >= 1 && rating < 2) {
      return '약간만족';
    } else {
      return '평가 없음';
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/activity-details/${id}?page=${page}`);
  };

  const handleDelete = () => {
    openPopup({
      popupType: 'select',
      content: '체험을 삭제하시겠어요?',
      btnName: ['아니오', '삭제하기'],
      callBackFnc: () => {
        router.push(`/myactivity`);
        deleteMyActivityMutation.mutate(id);
      },
    });
  };

  const handleEdit = () => {
    router.push(`/myactivity/edit?activityId=${id}`);
  };

  const paginatedReviews = reviewData?.reviews || [];
  const isAuthor = activityData?.userId === userData?.id;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <ActivityDetailsPageMeta
        title={activityData?.title}
        description={activityData?.description}
        bannerImageUrl={activityData?.bannerImageUrl}
        currentUrl={currentUrl}
      />
      <div className="mt-16 t:mt-4 m:mt-4">
        <div className="relative flex justify-between m:px-[24px]">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-nomad-black dark:text-var-gray2">
              {activityData?.category}
            </p>
            <h1 className="text-[32px] text-nomad-black dark:text-var-gray2 font-bold m:text-[24px] m:max-w-[350px] tracking-tight m:leading-7">
              {activityData?.title}
            </h1>
            <div className="flex gap-3 m:items-start">
              <div className="flex gap-1 items-center justify-center">
                <Image
                  src="/icon/icon_star_on.svg"
                  alt="별점 아이콘"
                  width={16}
                  height={16}
                />
                <p className="m:text-sm">
                  {activityData && formatNumberToFixed(activityData?.rating)}
                </p>
                <p className="m:text-sm">
                  ({formatCurrency(activityData?.reviewCount)})
                </p>
              </div>
              <div className="flex gap-1 items-center justify-center m:items-start">
                <Image
                  src={
                    isDarkMode
                      ? '/icon/location_gray.svg'
                      : '/icon/location.svg'
                  }
                  alt="위치 아이콘"
                  width={18}
                  height={18}
                />
                <p className="text-nomad-black dark:text-var-gray2 m:text-sm m:max-w-[200px] tracking-tight">
                  {activityData?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="flex t:items-center m:items-end">
            <ShareButton
              type="none-bg"
              title={activityData?.title}
              bannerImageUrl={activityData?.bannerImageUrl}
              description={activityData?.description}
              activityId={id}
            />
            {isAuthor && (
              <div className="flex items-center">
                <MeatballButton onClick={toggleMenu} />
                {isOpen && (
                  <div
                    ref={menuRef}
                    className="absolute top-16 right-0 m:top-14 m:right-6 mt-2 w-40 h-[114px] m:w-24 m:h-20 bg-white dark:bg-var-dark3 border border-var-gray3 dark:border-var-gray7 border-solid rounded-lg flex flex-col items-center justify-center text-lg z-10 m:text-sm"
                  >
                    <button
                      className="block w-full h-[57px] px-4 py-2 text-var-gray8 dark:text-var-gray2 hover:bg-gray-100 dark:hover:bg-var-dark4 rounded-t-lg border-b dark:border-var-gray7 border-var-gray3 border-solid"
                      onClick={handleEdit}
                    >
                      수정하기
                    </button>
                    <button
                      className="block w-full h-[57px] px-4 py-2 text-var-gray8 dark:text-var-gray2 hover:bg-gray-100 dark:hover:bg-var-dark4 rounded-b-lg"
                      onClick={handleDelete}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {activityData && (
          <ImageContainer
            bannerImageUrl={activityData.bannerImageUrl}
            subImages={activityData.subImages}
          />
        )}
        <div className="flex gap-4 m:block m:relative">
          <div className="mb-20 ipad-pro:w-[725px] t:w-full m:w-full m:px-[24px]">
            <div className="border-t-2 border-var-gray3 dark:border-var-dark4 border-solid pt-10 m:pt-6" />
            <div className="flex flex-col gap-4">
              <p className="text-nomad-black dark:text-var-gray2 font-bold text-xl">
                체험 설명
              </p>
              <textarea
                className="h-[200px] resize-none custom-scrollbar dark:bg-var-dark1 dark:text-var-gray2"
                disabled
                value={activityData?.description || ''}
              />
            </div>
            <div className="border-t-2 border-var-gray3 dark:border-var-dark4 border-solid my-10 m:my-6" />
            {activityData && <Map address={activityData.address} />}
            <div className="border-t-2 border-var-gray3 dark:border-var-dark4 border-solid my-10 m:my-6" />
            <div className="flex flex-col gap-4">
              <p className="text-nomad-black dark:text-var-gray2 font-bold text-xl">
                후기
              </p>
              <div className="flex gap-4 items-center">
                <p className="text-[50px] font-bold">
                  {activityData && formatNumberToFixed(activityData?.rating)}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-lg text-nomad-black dark:text-var-gray2">
                    {activityData && getRatingText(activityData?.rating)}
                  </p>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icon/icon_star_on.svg"
                      alt="별점 아이콘"
                      width={16}
                      height={16}
                    />
                    <p className="text-var-black dark:text-var-gray2 text-sm">
                      {formatCurrency(activityData?.reviewCount)}개 후기
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {reviewData && reviewData.totalCount > 0 && (
              <>
                {paginatedReviews?.map((review, i) => (
                  <div
                    key={review.id}
                    className={`flex gap-4 m:gap-3 py-6 items-start ${i === paginatedReviews.length - 1 ? '' : 'border-b-2 border-var-gray3 dark:border-var-dark4 border-solid'}`}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={review.user.profileImageUrl}
                        alt={`${review.user.nickname}의 프로필 이미지`}
                        width={45}
                        height={45}
                        className="rounded-full object-cover border border-var-gray3 border-solid w-12 h-12"
                      />
                    </div>
                    <div>
                      <div className="flex mb-2 items-center">
                        <p className="font-bold max-w-[300px] m:max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis">
                          {review.user.nickname}
                        </p>
                        <p className="mx-2">|</p>
                        <p className="text-sm text-var-gray6">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-nomad-black tracking-tight dark:text-var-gray2 whitespace-pre-wrap">
                        {review.content}
                      </p>
                    </div>
                  </div>
                ))}
                <Pagination
                  totalItems={reviewData.totalCount}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
          <div>{activityData && <Reservation activity={activityData} />}</div>
        </div>
      </div>
    </>
  );
}
