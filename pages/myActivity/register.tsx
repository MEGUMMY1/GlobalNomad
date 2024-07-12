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

function RegisterActivity() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onChange' });

  const handleClickRegister = () => {};

  return (
    <div className="flex gap-[20px] py-[72px] m:gap-0">
      <div className="w-[384px] t:w-[251px] h-[432px] bg-var-gray7 flex-shrink-0 m:hidden">
        프로필
      </div>
      <form
        onSubmit={() => {
          console.log('제출');
        }}
      >
        <div className="flex flex-col w-full gap-[20px]">
          <div className="flex justify-between items-center">
            <h1 className="text-[32px] font-[700]">내 체험 등록</h1>
            <PrimaryButton
              type="submit"
              size="small"
              style="dark"
              onClick={handleClickRegister}
            >
              등록하기
            </PrimaryButton>
          </div>
          <div className="space-y-[24px]">
            <InputBox
              placeholder="제목"
              name="title"
              register={register}
              errors={errors}
            />
            <KategorieDropdown />
            <TextArea
              placeholder="설명"
              name="description"
              register={register}
              errors={errors}
            />
            <InputBox
              label="가격"
              placeholder="가격"
              name="price"
              register={register}
              errors={errors}
            />
            <InputBox
              label="주소"
              placeholder="주소"
              name="address"
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
