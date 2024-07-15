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
import { useRecoilValue } from 'recoil';
import { KategoriedDropState } from '@/states/KategorieDropState';
import {
  bannerImageState,
  detailImageState,
  endTimeState,
  selectedDateState,
  startTimeState,
  timeSlotCountState,
} from '@/states/registerState';
import useRegisterActivity from '@/hooks/myActivity/useRegisterActivity';
import { formatDate } from '@/utils/formatDate';
import useActivityImage from '@/hooks/myActivity/useActivityImage';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';

function RegisterActivity() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onChange' });
  const selectedKateogorie = useRecoilValue(KategoriedDropState);
  const bannerImage = useRecoilValue(bannerImageState);
  const detailImage = useRecoilValue(detailImageState);
  const selectedDate = useRecoilValue(selectedDateState);
  const timeSlotCount = useRecoilValue(timeSlotCountState);
  const startTime = useRecoilValue(startTimeState);
  const endTime = useRecoilValue(endTimeState);

  const { postActivityMutation } = useRegisterActivity();
  const { postActivityImageMutation } = useActivityImage();

  const formatSchedules = () =>
    Array.from({ length: timeSlotCount }, (_, i) => ({
      endTime: endTime[i],
      startTime: startTime[i],
      date: formatDate(selectedDate[i]),
    }));

  const uploadImage = async (image: File) => {
    try {
      const response = await postActivityImageMutation.mutateAsync(image);
      return response.activityImageUrl;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return '';
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const { title, description, price, address } = data;
    const schedules = formatSchedules();
    const bannerUrl = bannerImage[0] ? await uploadImage(bannerImage[0]) : '';
    const detailUrls = await Promise.all(detailImage.map(uploadImage));

    postActivityMutation.mutate({
      title,
      category: selectedKateogorie.name,
      description,
      address,
      price: Number(price),
      schedules,
      bannerImageUrl: bannerUrl,
      subImageUrls: detailUrls,
    });
  };

  const isTimeFieldValid = () =>
    Array.from({ length: timeSlotCount }).every(
      (_, i) =>
        endTime[i] !== '00:00' &&
        startTime[i] <= endTime[i] &&
        selectedDate[i] !== ''
    );

  const isAllFieldsValid = () => {
    const { title, description, price, address } = getValues();
    return (
      !!title &&
      !!description &&
      !!price &&
      !!address &&
      !errors.title &&
      !errors.description &&
      !errors.price &&
      !errors.address &&
      selectedKateogorie.name !== '' &&
      bannerImage.length !== 0 &&
      detailImage.length !== 0 &&
      isTimeFieldValid()
    );
  };

  return (
    <div className="flex gap-[20px] py-[72px] m:gap-0 w-full">
      <div className="m:hidden">
        <SidenNavigation />
      </div>
      <form onSubmit={onSubmit} className="w-full m:p-[16px]">
        <div className="flex flex-col w-full gap-[20px]">
          <div className="flex justify-between items-center">
            <h1 className="text-[32px] font-[700]">내 체험 등록</h1>
            <PrimaryButton
              type="submit"
              size="small"
              style={isAllFieldsValid() ? 'dark' : 'disabled'}
              onClick={handleSubmit(onSubmit)}
              disabled={!isAllFieldsValid()}
            >
              등록하기
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
            <InputBox
              label="주소"
              placeholder="주소"
              name="address"
              validation={validation.address}
              register={register}
              errors={errors}
            />
            <TimeSlot />
            <UploadBannerImage />
            <UploadDetailImage />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterActivity;
