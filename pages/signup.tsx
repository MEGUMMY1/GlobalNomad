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
import { GetServerSideProps } from 'next';
import useEnterSubmit from '@/hooks/useEnterSubmit';
import { InitialPageMeta } from '@/components/MetaData/MetaData';

export const getServerSideProps: GetServerSideProps = async () => {
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
  const { postSignupMutation, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<signUpFormValues>({ mode: 'onBlur' });

  const onSubmit = (data: signUpFormValues) => {
    const { email, nickname, password } = data;
    const signUpData: SignupBody = { email, nickname, password };
    postSignupMutation.mutate(signUpData);
  };

  const handleKeyDown = useEnterSubmit(handleSubmit(onSubmit));

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const isNotError =
    !errors.email &&
    !errors.nickname &&
    !errors.password &&
    !errors.passwordCheck;
  const { email, nickname, password, passwordCheck } = watch();
  const isFormFilled = !!email && !!nickname && !!password && !!passwordCheck;
  const IsAllFieldsValid = isFormFilled && isChecked && isNotError;

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/mypage');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <InitialPageMeta title="회원가입 | GlobalNomad" />
      <div className="flex flex-col items-center max-w-[640px] m-auto pt-[160px] gap-[40px] px-[20px] ">
        {/* 로고 */}
        <Link href="/">
          <Image width={340} height={192} src="/icon/logo_big.svg" alt="로고" />
        </Link>

        {/* 로그인 폼 */}
        <form
          className="flex flex-col gap-[28px] w-full"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
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
                value === watch().password || '비밀번호가 일치하지 않습니다.',
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
            style={IsAllFieldsValid ? 'enabled' : 'disabled'}
            onClick={handleSubmit(onSubmit)}
            disabled={!IsAllFieldsValid}
          >
            {isLoading ? '회원가입중...' : '회원가입 하기'}
          </PrimaryButton>
        </form>

        {/* 로그인페이지 리다이렉트 */}
        <div className="text-var-gray8 text-[16px] dark:text-var-gray2">
          회원이신가요?
          <Link href="/login" className="underline ml-[5px]">
            로그인하기
          </Link>
        </div>
      </div>
    </>
  );
}
