import { FieldValues, useForm } from 'react-hook-form';
import { PrimaryButton } from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import { validation } from './validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiMyInfo } from '@/pages/api/users/apiUsers';
import useEditMyInfo from '@/hooks/useEditMyInfo';

export default function MyPage() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onChange' });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myInfo'],
    queryFn: apiMyInfo,
  });
  const { postMyInfoMutation } = useEditMyInfo();

  const onSubmit = (data: FieldValues) => {
    const { nickname, password, passwordCheck } = data;
    if (password === passwordCheck) {
      const newPassword = password;
      postMyInfoMutation.mutate({ nickname, newPassword });
    }
  };

  useEffect(() => {
    if (data) {
      setValue('nickname', data.nickname);
      setValue('email', data.email);
    }
  }, [data, setValue]);

  const isAllFieldsValid = () => {
    const isNotError =
      !errors.email &&
      !errors.nickname &&
      !errors.password &&
      !errors.passwordCheck;
    const { email, nickname, password, passwordCheck } = getValues();
    const isFormFilled = !!email && !!nickname && !!password && !!passwordCheck;

    return isFormFilled && isNotError;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>데이터를 불러오는데 실패 했습니다.</div>;

  return (
    <div className="flex flex-col">
      <form>
        <div className="flex justify-between">
          <p className="font-bold text-[32px]">내 정보</p>
          <PrimaryButton
            style={isAllFieldsValid() ? 'dark' : 'disabled'}
            size="small"
            onClick={handleSubmit(onSubmit)}
            disabled={!isAllFieldsValid()}
          >
            저장하기
          </PrimaryButton>
        </div>
        <div>
          <InputBox
            label="닉네임"
            placeholder=""
            name="nickname"
            validation={validation.nickName}
            register={register}
            errors={errors}
          />
          <InputBox
            label="이메일"
            placeholder=""
            name="email"
            register={register}
            errors={errors}
            readOnly
          />
          <InputBox
            label="비밀번호"
            placeholder="8자 이상 입력해 주세요"
            name="password"
            validation={validation.password}
            register={register}
            errors={errors}
          />
          <InputBox
            label="비밀번호 재입력"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            name="passwordCheck"
            validation={{
              ...validation.passwordCheck,
              validate: (value: string) =>
                value === getValues().password ||
                '비밀번호가 일치하지 않습니다.',
            }}
            register={register}
            errors={errors}
          />
        </div>
      </form>
    </div>
  );
}
