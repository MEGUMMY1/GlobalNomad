import AuthInputBox from '@/components/AuthInputBox/AuthInputBox';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { loginFormValues } from '@/components/AuthInputBox/AuthInputBox.types';
import { signinValidation } from '@/components/AuthInputBox/validation';
import Link from 'next/link';
import { PrimaryButton } from '@/components/Button/Button';
import { useEffect, useState } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      layoutType: 'removeLayout',
    },
  };
};

export default function Login() {
  const [isError, setIsError] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<loginFormValues>({ mode: 'onBlur' });

  const email = watch('email');
  const password = watch('password');
  const passwordCheck = watch('passwordCheck');
  const nickName = watch('nickName');

  const onSubmit = (data: loginFormValues) => {
    console.log(data);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  /* 버튼 활성화 로직 */
  useEffect(() => {
    if (email && password && passwordCheck && nickName && isChecked) {
      if (Object.keys(errors).length === 0) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  }, [
    email,
    password,
    passwordCheck,
    nickName,
    Object.keys(errors).length,
    isChecked,
  ]);

  return (
    <div className="flex flex-col items-center max-w-[640px] m-auto pt-[160px] gap-[40px] px-[20px] ">
      {/* 로고 */}
      <Link href="/main">
        <Image width={340} height={192} src="/icon/logo_big.svg" alt="로고" />
      </Link>

      {/* 로그인 폼 */}
      <form
        className="flex flex-col gap-[28px] w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthInputBox
          label="이메일 *"
          placeholder="이메일을 입력해주세요"
          name="email"
          validation={signinValidation.email}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          label="닉네임 *"
          placeholder="닉네임을 입력해주세요"
          name="nickName"
          validation={signinValidation.nickName}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          label="비밀번호 *"
          placeholder="8자 이상 입력해주세요"
          name="password"
          type="password"
          validation={signinValidation.password}
          eyeIconActive={true}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          label="비밀번호 확인 *"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          name="passwordCheck"
          type="password"
          validation={{
            ...signinValidation.passwordCheck,
            validate: (value: string) =>
              value === getValues().password || '비밀번호가 일치하지 않습니다.',
          }}
          eyeIconActive={true}
          register={register}
          errors={errors}
        />
        <div className="flex gap-[10px]">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agreement">이용약관에 동의</label>
        </div>
        <PrimaryButton
          size="large"
          style={isError ? 'disabled' : 'enabled'}
          onClick={handleSubmit(onSubmit)}
        >
          회원가입 하기
        </PrimaryButton>
      </form>

      {/* 로그인 리다이렉트 */}
      <div className="text-var-gray8 text-[16px]">
        회원이신가요?
        <Link href="/login" className="underline ml-[5px]">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
