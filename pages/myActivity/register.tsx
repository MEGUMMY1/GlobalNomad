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

function RegisterActivity() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onChange' });
  const selectedKateogorie = useRecoilValue(KategoriedDropState);
  const bannerImage = useRecoilValue(bannerImageState);
  const detailImage = useRecoilValue(detailImageState);
  const selectedDate = useRecoilValue(selectedDateState);
  const timeSlotCount = useRecoilValue(timeSlotCountState);
  const startTime = useRecoilValue(startTimeState);
  const endTime = useRecoilValue(endTimeState);

  const onSubmit = () => {
    console.log('제출');
  };

  const isTimeFieldVaild = () => {
    for (let i = 0; i < timeSlotCount; i++) {
      if (endTime[i] === '00:00') {
        return false;
      }
      if (startTime[i] > endTime[i]) {
        return false;
      }
      if (selectedDate[i] === '') {
        return false;
      }
    }
    return true;
  };

  const isAllFieldsValid = () => {
    const isNotError =
      !errors.title && !errors.description && !errors.price && !errors.address;
    const { title, description, price, address } = getValues();
    const isInputFilled = !!title && !!description && !!price && !!address;
    const isKategorieSelected = selectedKateogorie.name !== '';
    const isTimeValid = isTimeFieldVaild();

    return (
      isInputFilled &&
      isNotError &&
      isKategorieSelected &&
      bannerImage.length !== 0 &&
      detailImage.length !== 0 &&
      isTimeValid
    );
  };

  return (
    <div className="flex gap-[20px] py-[72px] m:gap-0">
      <div className="w-[384px] t:w-[251px] h-[432px] bg-var-gray7 flex-shrink-0 m:hidden">
        프로필
      </div>
      <form onSubmit={onSubmit}>
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
