import AuthInputBox from '@/components/AuthInputBox/AuthInputBox';
import Image from 'next/image';
import Link from 'next/link';
import useSignup from '@/hooks/useSignup';
import { useForm } from 'react-hook-form';
import { signUpFormValues } from '@/components/AuthInputBox/AuthInputBox.types';
import { signupValidation } from '@/components/AuthInputBox/validation';
import { PrimaryButton } from '@/components/Button/Button';
import { SignupBody } from './api/users/apiUser.types';
import { useEffect, useMemo, useState } from 'react';
import useLoginState from '@/hooks/useLoginState';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
  return {
    props: {
      layoutType: 'removeLayout',
    },
  };
};

export default function SingupPage() {
  const [isChecked, setIsChecked] = useState(false);
  const { isLoggedIn } = useLoginState();
  const router = useRouter();
  const { postSignupMutation } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<signUpFormValues>({ mode: 'onBlur' });

  const onSubmit = (data: signUpFormValues) => {
    const { email, nickname, password } = data;
    const signUpData: SignupBody = { email, nickname, password };
    postSignupMutation.mutate(signUpData);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const watchFields = watch(['email', 'password', 'passwordCheck', 'nickname']);

  const isAllFieldsValid = useMemo(() => {
    const isNotError =
      !errors.email &&
      !errors.nickname &&
      !errors.password &&
      !errors.passwordCheck;
    const { email, nickname, password, passwordCheck } = getValues();
    const isFormFilled = !!email && !!nickname && !!password && !!passwordCheck;

    return isFormFilled && isChecked && isNotError;
  }, [
    errors.email,
    errors.password,
    errors.passwordCheck,
    errors.nickname,
    watchFields,
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/mypage');
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col items-center max-w-[640px] m-auto pt-[160px] gap-[40px] px-[20px] ">
      {/* 로고 */}
      <Link href="/">
        <Image width={340} height={192} src="/icon/logo_big.svg" alt="로고" />
      </Link>

      {/* 로그인 폼 */}
      <form className="flex flex-col gap-[28px] w-full">
        <AuthInputBox
          label="이메일 *"
          placeholder="이메일을 입력해주세요"
          name="email"
          validation={signupValidation.email}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          label="닉네임 *"
          placeholder="닉네임을 입력해주세요"
          name="nickname"
          validation={signupValidation.nickname}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          label="비밀번호 *"
          placeholder="8자 이상 입력해주세요"
          name="password"
          type="password"
          validation={signupValidation.password}
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
            ...signupValidation.passwordCheck,
            validate: (value: string) =>
              value === getValues().password || '비밀번호가 일치하지 않습니다.',
          }}
          eyeIconActive={true}
          register={register}
          errors={errors}
        />
        <AuthInputBox
          type="checkbox"
          placeholder="약관에 동의해주세요"
          name="agreement"
          handleChange={handleCheckboxChange}
        />
        <PrimaryButton
          size="large"
          style={isAllFieldsValid ? 'enabled' : 'disabled'}
          onClick={handleSubmit(onSubmit)}
          disabled={!isAllFieldsValid}
        >
          회원가입 하기
        </PrimaryButton>
      </form>

      {/* 로그인페이지 리다이렉트 */}
      <div className="text-var-gray8 text-[16px]">
        회원이신가요?
        <Link href="/login" className="underline ml-[5px]">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
