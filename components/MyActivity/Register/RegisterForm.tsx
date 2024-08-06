import { FieldValues, useForm } from 'react-hook-form';
import { PrimaryButton } from '@/components/Button/Button';
import InputBox from '@/components/InputBox/InputBox';
import KategorieDropdown from '@/components/KategorieDropdown/KategorieDropdown';
import TextArea from '@/components/InputBox/TextArea';
import TimeSlot from '@/components/MyActivity/Register/TimeSlot';
import {
  UploadBannerImage,
  UploadDetailImage,
} from '@/components/MyActivity/Register/UploadImage';
import { validation } from '@/components/MyActivity/Register/validation';
import { useRecoilState } from 'recoil';
import { KategoriedDropState } from '@/states/KategorieDropState';
import {
  addressState,
  bannerImageState,
  detailImageState,
  selectedDateState,
  timeSlotCountState,
  scheduleState,
} from '@/states/registerState';
import useRegisterActivity from '@/hooks/myActivity/useRegisterActivity';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import AddressInput from '@/components/MyActivity/Register/AddressInput';
import { useEffect } from 'react';
import { RegisterFormProps, SelectedDateProps } from './RegisterForm.types';
import useEditMyActivity from '@/hooks/myActivity/useEditMyActivity';
import useResetRegisterState from '@/hooks/myActivity/useResetRegisterState';
import { sideNavigationState } from '@/states/sideNavigationState';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import hamburgerIcon from '@/public/icon/hamburger_icon.svg';
import Image from 'next/image';

function RegisterForm({ activityData, isEdit = false }: RegisterFormProps) {
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);

  const [selectedKateogorie, setSelectedKategorie] =
    useRecoilState(KategoriedDropState);
  const [bannerImage, setBannerImage] = useRecoilState(bannerImageState);
  const [detailImage, setDetailImage] = useRecoilState(detailImageState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [timeSlotCount, setTimeSlotCount] = useRecoilState(timeSlotCountState);
  const [address, setAddress] = useRecoilState(addressState);
  const [editSchedules, setEditSchedules] = useRecoilState(scheduleState);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onChange',
  });

  // 수정 시 기존 데이터 불러오기
  useEffect(() => {
    if (activityData) {
      setValue('title', activityData.title);
      setValue('description', activityData.description);
      setValue('price', activityData.price);
      setSelectedKategorie({ name: activityData.category });
      setBannerImage([activityData.bannerImageUrl]);
      setDetailImage(activityData.subImages);
      setAddress(activityData.address);
      setTimeSlotCount(activityData.schedules.length);
      const updatedDates: SelectedDateProps[] = activityData.schedules.map(
        (schedule) => {
          // endTime이 '00:00'인 경우 '24:00'으로 변환
          const normalizedEndTime =
            schedule.endTime === '00:00' ? '24:00' : schedule.endTime;

          return {
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: normalizedEndTime,
            id: schedule.id,
          };
        }
      );
      setSelectedDate(updatedDates);
    }
  }, [activityData]);

  // api 호출 관련 hooks
  const { postActivityMutation } = useRegisterActivity();
  const { patchActivityMutation } = useEditMyActivity();

  const formatSchedules = () => {
    return selectedDate.map((schedule, i) => ({
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime === '24:00' ? '00:00' : schedule.endTime,
    }));
  };

  // 수정 버튼 클릭 시
  const onSubmitEdit = async (data: FieldValues) => {
    if (!activityData) {
      return;
    }
    const { title, description, price } = data;
    const subImageUrls = detailImage.map((image) => image.imageUrl);
    const subImageIdsToRemove = [];
    for (let i = 0; i < activityData.subImages.length; i++) {
      subImageIdsToRemove.push(activityData.subImages[i].id);
    }
    const filteredIds = editSchedules.idsToRemove.filter((id) =>
      activityData.schedules.some((schedule) => schedule.id === id)
    );

    patchActivityMutation.mutate({
      activityId: activityData.id,
      params: {
        title,
        category: selectedKateogorie.name,
        description,
        address,
        price: Number(price),
        bannerImageUrl: bannerImage[0],
        subImageIdsToRemove,
        subImageUrlsToAdd: subImageUrls,
        scheduleIdsToRemove: filteredIds,
        schedulesToAdd: editSchedules.toAdd,
      },
    });
  };

  // 등록 버튼 클릭 시
  const onSubmitRegister = async (data: FieldValues) => {
    const { title, description, price } = data;
    const schedules = formatSchedules();
    const subImageUrls = detailImage.map((image) => image.imageUrl);

    postActivityMutation.mutate({
      title,
      category: selectedKateogorie.name,
      description,
      address,
      price: Number(price),
      schedules,
      bannerImageUrl: bannerImage[0],
      subImageUrls,
    });
  };

  // form 제출이 가능한지 체크 - 시간, 날짜 관련
  const isTimeFieldValid = () =>
    Array.from({ length: timeSlotCount }).every(
      (_, i) =>
        selectedDate[i].endTime !== '00:00' &&
        selectedDate[i].startTime <= selectedDate[i].endTime &&
        selectedDate[i].date !== ''
    );

  // form 제출이 가능한지 체크
  const isAllFieldsValid = () => {
    const { title, description, price } = watch();
    return (
      !!title &&
      !!description &&
      !!price &&
      !errors.title &&
      !errors.description &&
      !errors.price &&
      selectedKateogorie.name !== '' &&
      address !== '' &&
      bannerImage.length !== 0 &&
      isTimeFieldValid()
    );
  };

  // 사이드 네비게이션
  const openSideNavigation = () => {
    setIsOpen(!isOpen);
  };

  // 페이지 나갈 때 state reset
  const resetRegisterState = useResetRegisterState();
  useEffect(() => {
    return () => {
      resetRegisterState();
    };
  }, []);

  return (
    <div className="flex justify-center w-full mt-[72px] mb-12 gap-[24px] t:mt-[24px] t:gap-[16px] m:mt-[26px] m:gap-0">
      <div className="m:hidden">
        <SidenNavigation />
      </div>
      <div className="p:hidden t:hidden">
        {isOpen && <SidenNavigationMobile />}
      </div>
      <form
        onSubmit={isEdit ? onSubmitEdit : onSubmitRegister}
        className="m:w-full m:p-[16px]"
      >
        <div className="flex flex-col w-[792px] gap-[24px] t:w-[429px] t:h-full m:w-full m:h-full m:px-0">
          <div className="flex justify-between items-center">
            <div className="flex m:gap-[15px]">
              <Image
                src={hamburgerIcon}
                alt="햄버거 메뉴 아이콘"
                className="p:hidden t:hidden"
                onClick={() => openSideNavigation()}
              />
              <h1 className="text-[32px] font-[700]">
                {isEdit ? '내 체험 수정' : '내 체험 등록'}
              </h1>
            </div>
            <PrimaryButton
              type="submit"
              size="small"
              style={isAllFieldsValid() ? 'dark' : 'disabled'}
              onClick={handleSubmit(isEdit ? onSubmitEdit : onSubmitRegister)}
              disabled={!isAllFieldsValid()}
            >
              {isEdit ? '수정하기' : '등록하기'}
            </PrimaryButton>
          </div>
          <div className="space-y-[24px]">
            <InputBox
              placeholder="제목"
              name="title"
              validation={validation.title}
              register={register}
              errors={errors}
            />
            <KategorieDropdown />
            <TextArea
              placeholder="설명"
              name="description"
              validation={validation.description}
              register={register}
              errors={errors}
            />
            <InputBox
              label="가격"
              placeholder="가격"
              name="price"
              validation={validation.price}
              register={register}
              errors={errors}
            />
            <AddressInput />
            <TimeSlot isEdit={isEdit} />
            <UploadBannerImage />
            <UploadDetailImage />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
