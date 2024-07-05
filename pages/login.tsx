import AuthInputBox from '@/components/AuthInputBox/AuthInputBox';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { loginFormValues } from '@/components/AuthInputBox/AuthInputBox.types';
import { loginValidation } from '@/components/AuthInputBox/validation';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<loginFormValues>({ mode: 'onBlur' });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = (data: loginFormValues) => {
    console.log(data);
  };

  /* 에러확인 로직 */
  useEffect(() => {
    if (email && password) {
      if (errors.email || errors.password) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    } else {
      setIsError(true);
    }
  }, [email, password, errors.email, errors.password]);

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
          label="이메일"
          placeholder="이메일을 입력해주세요"
          name="email"
          validation={loginValidation.email}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          type="password"
          validation={loginValidation.password}
          register={register}
          errors={errors}
          eyeIconActive={true}
        />
        <PrimaryButton
          size="large"
          style={isError ? 'disabled' : 'enabled'}
          onClick={handleSubmit(onSubmit)}
        >
          로그인하기
        </PrimaryButton>
      </form>

      {/* 회원가입 리다이렉트 */}
      <div className="text-var-gray8 text-[16px]">
        회원이 아니신가요?
        <Link href="/signup" className="underline ml-[5px]">
          회원가입하기
        </Link>
      </div>
    </div>
  );
}
