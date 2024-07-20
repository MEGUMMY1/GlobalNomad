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
  endTimeState,
  selectedDateState,
  startTimeState,
  timeSlotCountState,
  timeSlotState,
} from '@/states/registerState';
import useRegisterActivity from '@/hooks/myActivity/useRegisterActivity';
import { formatDate } from '@/utils/formatDate';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import AddressInput from '@/components/MyActivity/Register/AddressInput';
import { useEffect } from 'react';
import { RegisterFormProps } from './RegisterForm.types';
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
  const [timeSlots, setTimeSlots] = useRecoilState(timeSlotState);
  const [timeSlotCount, setTimeSlotCount] = useRecoilState(timeSlotCountState);
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [endTime, setEndTime] = useRecoilState(endTimeState);
  const [address, setAddress] = useRecoilState(addressState);

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
      const tempDate = [...selectedDate];
      const tempStartTime = [...startTime];
      const tempEndTime = [...endTime];
      const tempTimeSlots: { id: number }[] = [];

      activityData.schedules.forEach((schedule, index) => {
        tempDate[index] = schedule.date;
        tempStartTime[index] = schedule.startTime;
        tempEndTime[index] =
          schedule.endTime === '00:00' ? '24:00' : schedule.endTime;
        tempTimeSlots.push({ id: schedule.id });
      });
      tempTimeSlots.pop();

      setSelectedDate(tempDate);
      setStartTime(tempStartTime);
      setEndTime(tempEndTime);
      setTimeSlots(tempTimeSlots);
    }
  }, [activityData]);

  // api 호출 관련 hooks
  const { postActivityMutation } = useRegisterActivity();
  const { patchActivityMutation } = useEditMyActivity();

  const formatSchedules = () =>
    Array.from({ length: timeSlotCount }, (_, i) => ({
      endTime: endTime[i] === '24:00' ? '00:00' : endTime[i],
      startTime: startTime[i],
      date: formatDate(selectedDate[i]),
    }));

  // 수정 버튼 클릭 시
  const onSubmitEdit = async (data: FieldValues) => {
    if (!activityData) {
      return;
    }
    const { title, description, price } = data;
    const schedules = formatSchedules();
    const subImageUrls = detailImage.map((image) => image.imageUrl);
    const subImageIdsToRemove = [];
    const scheduleIdsToRemove = [];
    for (let i = 0; i < activityData.subImages.length; i++) {
      subImageIdsToRemove.push(activityData.subImages[i].id);
    }
    for (let i = 0; i < activityData.schedules.length; i++) {
      scheduleIdsToRemove.push(activityData.schedules[i].id);
    }

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
        scheduleIdsToRemove,
        schedulesToAdd: schedules,
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
        endTime[i] !== '00:00' &&
        startTime[i] <= endTime[i] &&
        selectedDate[i] !== ''
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
        <div className="flex flex-col w-[792px] gap-[24px] t:w-[429px] t:h-full m:w-full m:h-full m:px-[15px]">
          <div className="flex justify-between items-center">
            <div className="flex m:gap-[15px]">
              <Image
                src={hamburgerIcon}
                alt="햄버거 메뉴 아이콘"
                className="p:hidden t:hidden"
                onClick={() => openSideNavigation()}
              />
              <h1 className="text-[32px] font-[700]">내 체험 등록</h1>
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
            <TimeSlot />
            <UploadBannerImage />
            <UploadDetailImage />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
